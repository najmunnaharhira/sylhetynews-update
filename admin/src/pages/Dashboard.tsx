import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  NewsItem, CategoryItem, TeamMember, PhotoCardTemplate
} from "../types/entities";
import {
  fetchNews, fetchCategories, fetchTeam, fetchPhotoCardTemplates,
  createNewsItem, updateNewsItem, deleteNewsItem, toggleNewsPublish,
  createTeamMember, updateTeamMember, deleteTeamMember,
  createPhotoCardTemplate, updatePhotoCardTemplate, deletePhotoCardTemplate
} from "../services/entities";
import {
  apiFetch,
  extractGoogleDriveFileId,
  normalizeMediaInput,
  resolveApiAssetUrl,
  uploadImage,
} from "../lib/api";
import { Spinner } from "../components/Spinner";
import { Toast } from "../components/Toast";
import { useAuth } from "../contexts/AuthContext";

const DEFAULT_CATEGORIES: { name: string; slug: string }[] = [
  { slug: "sylhet", name: "সিলেট" },
  { slug: "national", name: "জাতীয়" },
  { slug: "politics", name: "রাজনীতি" },
  { slug: "mofoshol", name: "মফস্বল সংবাদ" },
  { slug: "international", name: "আন্তর্জাতিক" },
  { slug: "economy", name: "অর্থনীতি ও বাণিজ্য" },
  { slug: "entertainment", name: "বিনোদন" },
  { slug: "expat", name: "প্রবাস" },
  { slug: "sports", name: "খেলাধুলা" },
  { slug: "lifestyle", name: "লাইফ-স্টাইল" },
  { slug: "technology", name: "তথ্য ও প্রযুক্তি" },
  { slug: "law", name: "আইন ও আদালত" },
  { slug: "opinion", name: "মতামত" },
  { slug: "others", name: "অন্যান্য" },
];

const FALLBACK_NEWS_IMAGE = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80";
const DEFAULT_AUTHOR = "admin@gmail.com";
const NEWS_DRAFT_STORAGE_KEY = "sylhety-admin-news-draft";

type NewsDraft = {
  editingNewsId: string | null;
  title: string;
  summary: string;
  content: string;
  category: string;
  district: string;
  authorName: string;
  tagsInput: string;
  imageUrl: string;
  published: boolean;
  featured: boolean;
  savedAt: string;
};

const normalizeCategorySlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const parseTagsInput = (value: string): string[] =>
  Array.from(
    new Set(
      value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    )
  );

const formatTagsInput = (tags?: string[]) => (tags ?? []).join(", ");

const formatDraftSavedAt = (value?: string) => {
  if (!value) {
    return "";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsed);
};

const readStoredNewsDraft = (): NewsDraft | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(NEWS_DRAFT_STORAGE_KEY);
    if (!rawValue) {
      return null;
    }

    const parsed = JSON.parse(rawValue) as Partial<NewsDraft>;
    return {
      editingNewsId: typeof parsed.editingNewsId === "string" ? parsed.editingNewsId : null,
      title: typeof parsed.title === "string" ? parsed.title : "",
      summary: typeof parsed.summary === "string" ? parsed.summary : "",
      content: typeof parsed.content === "string" ? parsed.content : "",
      category: typeof parsed.category === "string" ? parsed.category : "",
      district: typeof parsed.district === "string" ? parsed.district : "",
      authorName: typeof parsed.authorName === "string" ? parsed.authorName : DEFAULT_AUTHOR,
      tagsInput: typeof parsed.tagsInput === "string" ? parsed.tagsInput : "",
      imageUrl: typeof parsed.imageUrl === "string" ? parsed.imageUrl : "",
      published: parsed.published !== false,
      featured: Boolean(parsed.featured),
      savedAt: typeof parsed.savedAt === "string" ? parsed.savedAt : "",
    };
  } catch {
    window.localStorage.removeItem(NEWS_DRAFT_STORAGE_KEY);
    return null;
  }
};

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [photocardTemplates, setPhotocardTemplates] = useState<PhotoCardTemplate[]>([]);
  const [loadingNews, setLoadingNews] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{ message: string; type?: "success" | "error" | "info" } | null>(null);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [district, setDistrict] = useState("");
  const [authorName, setAuthorName] = useState(user?.email || DEFAULT_AUTHOR);
  const [tagsInput, setTagsInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [published, setPublished] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [lastDraftSavedAt, setLastDraftSavedAt] = useState("");
  const [restoredDraft, setRestoredDraft] = useState(false);
  const [isOffline, setIsOffline] = useState(
    () => typeof navigator !== "undefined" && !navigator.onLine
  );

  const [categoryName, setCategoryName] = useState("");
  const [categorySlugInput, setCategorySlugInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loadingCategoriesAction, setLoadingCategoriesAction] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);

  const [memberName, setMemberName] = useState("");
  const [memberRole, setMemberRole] = useState("");
  const [memberOrder, setMemberOrder] = useState<number>(0);
  const [memberIntroduction, setMemberIntroduction] = useState("");
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);

  const [templateName, setTemplateName] = useState("");
  const [templateDescription, setTemplateDescription] = useState("");
  const [templateImageUrl, setTemplateImageUrl] = useState("");
  const [templatePreviewUrl, setTemplatePreviewUrl] = useState("");
  const [templateCategory, setTemplateCategory] = useState("");
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [templatePreviewFile, setTemplatePreviewFile] = useState<File | null>(null);
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null);

  const categoryOptions = useMemo(() => {
    const merged = new Map<string, { value: string; label: string }>();

    for (const preset of DEFAULT_CATEGORIES) {
      merged.set(preset.slug, { value: preset.slug, label: preset.name });
    }

    for (const item of categories) {
      merged.set(item.slug, { value: item.slug, label: item.name });
    }

    return Array.from(merged.values());
  }, [categories]);

  const missingDefaultCategories = useMemo(() => {
    const existingSlugs = new Set(categories.map((item) => item.slug.toLowerCase()));
    return DEFAULT_CATEGORIES.filter(
      (preset) => !existingSlugs.has(preset.slug.toLowerCase())
    );
  }, [categories]);

  const newsImagePreviewUrl = useMemo(
    () => resolveApiAssetUrl(imageUrl) || FALLBACK_NEWS_IMAGE,
    [imageUrl]
  );
  const formattedDraftSavedAt = useMemo(
    () => formatDraftSavedAt(lastDraftSavedAt),
    [lastDraftSavedAt]
  );
  const shouldPersistNewsDraft = useMemo(
    () =>
      Boolean(
        editingNewsId ||
          title.trim() ||
          summary.trim() ||
          content.trim() ||
          category.trim() ||
          district.trim() ||
          tagsInput.trim() ||
          imageUrl.trim() ||
          featured ||
          !published
      ),
    [
      category,
      content,
      district,
      editingNewsId,
      featured,
      imageUrl,
      published,
      summary,
      tagsInput,
      title,
    ]
  );

  const clearStoredNewsDraft = (showToast = false) => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(NEWS_DRAFT_STORAGE_KEY);
    }
    setLastDraftSavedAt("");
    setRestoredDraft(false);

    if (showToast) {
      setToast({ message: "Saved draft removed from this device.", type: "info" });
    }
  };

  const resetNewsForm = () => {
    setEditingNewsId(null);
    setTitle("");
    setSummary("");
    setContent("");
    setCategory("");
    setDistrict("");
    setAuthorName(user?.email || DEFAULT_AUTHOR);
    setTagsInput("");
    setImageUrl("");
    setImageFile(null);
    setPublished(true);
    setFeatured(false);
    clearStoredNewsDraft();
  };

  const resetCategoryForm = () => {
    setEditingCategoryId(null);
    setCategoryName("");
    setCategorySlugInput("");
  };

  const resetTemplateForm = () => {
    setEditingTemplateId(null);
    setTemplateName("");
    setTemplateDescription("");
    setTemplateImageUrl("");
    setTemplatePreviewUrl("");
    setTemplateCategory("");
    setTemplateFile(null);
    setTemplatePreviewFile(null);
  };

  // Backend-driven: Load news and categories from API
  const loadNews = async () => {
    setLoadingNews(true);
    try {
      const data = await fetchNews();
      setNews(data);
    } catch (e) {
      setError("Failed to load news from backend.");
      setToast({ message: "Failed to load news from backend.", type: "error" });
    } finally {
      setLoadingNews(false);
    }
  };

  const loadCategories = async () => {
    setLoadingCategories(true);
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (e) {
      setError("Failed to load categories from backend.");
      setToast({ message: "Failed to load categories from backend.", type: "error" });
    } finally {
      setLoadingCategories(false);
    }
  };

  // Backend-driven: Load team and templates from API
  const loadTeamMembers = async () => {
    try {
      const data = await fetchTeam();
      setTeamMembers(data);
    } catch (e) {
      setError("Failed to load team from backend.");
      setToast({ message: "Failed to load team from backend.", type: "error" });
    }
  };

  const loadPhotocardTemplates = async () => {
    try {
      const data = await fetchPhotoCardTemplates();
      setPhotocardTemplates(data);
    } catch (e) {
      setError("Failed to load photocard templates from backend.");
      setToast({ message: "Failed to load photocard templates from backend.", type: "error" });
    }
  };

  useEffect(() => {
    const savedDraft = readStoredNewsDraft();
    if (!savedDraft) {
      return;
    }

    setEditingNewsId(savedDraft.editingNewsId);
    setTitle(savedDraft.title);
    setSummary(savedDraft.summary);
    setContent(savedDraft.content);
    setCategory(savedDraft.category);
    setDistrict(savedDraft.district);
    setAuthorName(savedDraft.authorName || DEFAULT_AUTHOR);
    setTagsInput(savedDraft.tagsInput);
    setImageUrl(savedDraft.imageUrl);
    setPublished(savedDraft.published);
    setFeatured(savedDraft.featured);
    setLastDraftSavedAt(savedDraft.savedAt);
    setRestoredDraft(true);
    setToast({ message: "Recovered your saved news draft.", type: "info" });
  }, []);

  useEffect(() => {
    // Check for token, redirect if not present
    // Use admin_jwt_token (consistent with AuthContext) for authentication check
    const token = localStorage.getItem("admin_jwt_token");
    if (!token) {
      navigate("/login");
      return;
    }
    setError("");
    loadNews();
    // Load categories, team members and photocard templates on mount
    loadCategories();
    loadTeamMembers();
    loadPhotocardTemplates();
  }, [navigate]);

  useEffect(() => {
    if (!authorName.trim() && user?.email) {
      setAuthorName(user.email);
    }
  }, [authorName, user?.email]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleOnline = () => {
      setIsOffline(false);
      setToast({ message: "Connection restored. You can publish news again.", type: "success" });
    };

    const handleOffline = () => {
      setIsOffline(true);
      setToast({
        message: "You are offline. Keep writing and the draft will stay on this device.",
        type: "info",
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (!shouldPersistNewsDraft) {
      window.localStorage.removeItem(NEWS_DRAFT_STORAGE_KEY);
      setLastDraftSavedAt("");
      return;
    }

    const nextSavedAt = new Date().toISOString();
    const nextDraft: NewsDraft = {
      editingNewsId,
      title,
      summary,
      content,
      category,
      district,
      authorName: authorName.trim() || user?.email || DEFAULT_AUTHOR,
      tagsInput,
      imageUrl,
      published,
      featured,
      savedAt: nextSavedAt,
    };

    window.localStorage.setItem(NEWS_DRAFT_STORAGE_KEY, JSON.stringify(nextDraft));
    setLastDraftSavedAt(nextSavedAt);
  }, [
    authorName,
    category,
    content,
    district,
    editingNewsId,
    featured,
    imageUrl,
    published,
    shouldPersistNewsDraft,
    summary,
    tagsInput,
    title,
    user?.email,
  ]);

  const handleLogout = async () => {
    logout();
    navigate("/login");
  };

  const ensureCategoryExistsForNews = async (slug: string) => {
    if (!slug || categories.some((item) => item.slug === slug)) {
      return;
    }

    const preset = DEFAULT_CATEGORIES.find((item) => item.slug === slug);
    if (!preset) {
      return;
    }

    try {
      await apiFetch("/categories", {
        method: "POST",
        body: JSON.stringify(preset),
      });
      await loadCategories();
    } catch {
      // News can still be saved even if the category already exists or seeding fails.
    }
  };

  const handleCreateNews = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!title.trim() || !summary.trim() || !content.trim() || !category.trim()) {
      setError("Title, summary, content, and category are required.");
      return;
    }

    const payload = {
      title: title.trim(),
      summary: summary.trim(),
      content: content.trim(),
      category: category.trim(),
      district: district.trim(),
      imageUrl: normalizeMediaInput(imageUrl) || FALLBACK_NEWS_IMAGE,
      author: authorName.trim() || user?.email || DEFAULT_AUTHOR,
      published,
      featured,
      tags: parseTagsInput(tagsInput),
    };

    setUploading(true);
    try {
      await ensureCategoryExistsForNews(payload.category);

      if (editingNewsId) {
        await updateNewsItem(editingNewsId, payload);
        setToast({ message: "News updated successfully.", type: "success" });
      } else {
        await createNewsItem(payload);
        setToast({ message: "News published successfully.", type: "success" });
      }

      resetNewsForm();
      await loadNews();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save news.");
    } finally {
      setUploading(false);
    }
  };

  const handleEditNews = (item: NewsItem) => {
    setEditingNewsId(item.id);
    setTitle(item.title);
    setSummary(item.summary || "");
    setContent(item.content);
    setCategory(item.category);
    setDistrict(item.district || "");
    setAuthorName(item.author || user?.email || DEFAULT_AUTHOR);
    setTagsInput(formatTagsInput(item.tags));
    setImageUrl(item.imageUrl || "");
    setImageFile(null);
    setPublished(Boolean(item.published));
    setFeatured(Boolean(item.featured));
    setRestoredDraft(false);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteNews = async (id: string) => {
    if (!confirm("Are you sure you want to delete this news item?")) return;
    try {
      await deleteNewsItem(id);
      if (editingNewsId === id) {
        resetNewsForm();
      }
      setToast({ message: "News deleted.", type: "success" });
      await loadNews();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to delete news.");
    }
  };

  const handleTogglePublish = async (item: NewsItem) => {
    try {
      await toggleNewsPublish(item.id, !Boolean(item.published));
      setToast({
        message: Boolean(item.published) ? "News moved to draft." : "News published.",
        type: "success",
      });
      await loadNews();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update publish status.");
    }
  };

  const handleToggleFeatured = async (item: NewsItem) => {
    try {
      await updateNewsItem(item.id, { featured: !Boolean(item.featured) });
      setToast({
        message: Boolean(item.featured)
          ? "News removed from featured list."
          : "News marked as featured.",
        type: "success",
      });
      await loadNews();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update featured status.");
    }
  };

  const handleCreateCategory = async () => {
    setError("");
    const normalizedName = categoryName.trim();
    const normalizedSlug = categorySlugInput.trim() || normalizeCategorySlug(categoryName);

    if (!normalizedName) {
      setError("Category name is required.");
      return;
    }

    if (!normalizedSlug) {
      setError("Category slug is required. Use English letters, numbers, or hyphens.");
      return;
    }

    setLoadingCategoriesAction(true);
    try {
      if (editingCategoryId) {
        await apiFetch(`/categories/${editingCategoryId}`, {
          method: "PUT",
          body: JSON.stringify({ name: normalizedName, slug: normalizedSlug }),
        });
        setToast({ message: "Category updated.", type: "success" });
      } else {
        await apiFetch("/categories", {
          method: "POST",
          body: JSON.stringify({ name: normalizedName, slug: normalizedSlug }),
        });
        setToast({ message: "Category created.", type: "success" });
      }

      resetCategoryForm();
      await loadCategories();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save category.");
    } finally {
      setLoadingCategoriesAction(false);
    }
  };

  const handleEditCategory = (item: CategoryItem) => {
    setEditingCategoryId(item.id);
    setCategoryName(item.name);
    setCategorySlugInput(item.slug);
    setError("");
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    setLoadingCategoriesAction(true);
    try {
      await apiFetch(`/categories/${id}`, { method: "DELETE" });
      if (editingCategoryId === id) {
        resetCategoryForm();
      }
      setToast({ message: "Category deleted.", type: "success" });
      await loadCategories();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to delete category.");
    } finally {
      setLoadingCategoriesAction(false);
    }
  };

  const handleSeedDefaultCategories = async () => {
    if (missingDefaultCategories.length === 0) {
      setToast({ message: "All recommended categories are already available.", type: "info" });
      return;
    }

    setLoadingCategoriesAction(true);
    try {
      await Promise.all(
        missingDefaultCategories.map((item) =>
          apiFetch("/categories", {
            method: "POST",
            body: JSON.stringify(item),
          })
        )
      );
      setToast({
        message: `${missingDefaultCategories.length} recommended categories added.`,
        type: "success",
      });
      await loadCategories();
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to add recommended categories."
      );
    } finally {
      setLoadingCategoriesAction(false);
    }
  };

  const handleConvertDrive = () => {
    if (!imageUrl.trim()) {
      setError("Paste a Google Drive link first.");
      return;
    }

    const driveFileId = extractGoogleDriveFileId(imageUrl);
    if (!driveFileId) {
      setError("That does not look like a Google Drive file link.");
      return;
    }

    setError("");
    setImageUrl(normalizeMediaInput(imageUrl));
    setToast({ message: "Google Drive image link converted.", type: "success" });
  };

  const handleUploadImage = async () => {
    if (!imageFile) {
      setError("Please choose an image to upload.");
      return;
    }
    setError("");
    setUploading(true);
    try {
      const uploadedUrl = await uploadImage(imageFile);
      setImageUrl(uploadedUrl);
      setToast({ message: "Image uploaded successfully.", type: "success" });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const handleCreateTeamMember = async () => {
    setError("");
    if (!memberName.trim() || !memberRole.trim()) {
      setError("Name and role are required.");
      return;
    }
    setUploading(true);
    try {
      await createTeamMember({
        name: memberName.trim(),
        role: memberRole.trim(),
        order: memberOrder || teamMembers.length + 1,
        introduction: memberIntroduction.trim() || undefined,
      });
      setMemberName("");
      setMemberRole("");
      setMemberOrder(0);
      setMemberIntroduction("");
      await loadTeamMembers();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create team member.");
    } finally {
      setUploading(false);
    }
  };

  const handleEditTeamMember = (member: TeamMember) => {
    setEditingMemberId(member.id);
    setMemberName(member.name);
    setMemberRole(member.role);
    setMemberOrder(member.order);
    setMemberIntroduction(member.introduction || "");
  };

  const handleUpdateTeamMember = async () => {
    if (!editingMemberId) return;
    setError("");
    if (!memberName.trim() || !memberRole.trim()) {
      setError("Name and role are required.");
      return;
    }
    setUploading(true);
    try {
      await updateTeamMember(editingMemberId, {
        name: memberName.trim(),
        role: memberRole.trim(),
        order: memberOrder || 0,
        introduction: memberIntroduction.trim() || undefined,
      });
      setEditingMemberId(null);
      setMemberName("");
      setMemberRole("");
      setMemberOrder(0);
      setMemberIntroduction("");
      await loadTeamMembers();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update team member.");
    } finally {
      setUploading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingMemberId(null);
    setMemberName("");
    setMemberRole("");
    setMemberOrder(0);
    setMemberIntroduction("");
  };

  const handleDeleteTeamMember = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    try {
      await deleteTeamMember(id);
      await loadTeamMembers();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to delete team member.");
    }
  };

  const handleUploadTemplateImage = async () => {
    if (!templateFile) return;
    setError("");
    setUploading(true);
    try {
      const uploadedUrl = await uploadImage(templateFile);
      setTemplateImageUrl(uploadedUrl);
      setToast({ message: "Template image uploaded.", type: "success" });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to upload template image.");
    } finally {
      setUploading(false);
    }
  };

  const handleUploadTemplatePreview = async () => {
    if (!templatePreviewFile) return;
    setError("");
    setUploading(true);
    try {
      const uploadedUrl = await uploadImage(templatePreviewFile);
      setTemplatePreviewUrl(uploadedUrl);
      setToast({ message: "Preview image uploaded.", type: "success" });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to upload preview.");
    } finally {
      setUploading(false);
    }
  };

  const handleCreatePhotocardTemplate = async () => {
    setError("");
    const normalizedTemplateImage = normalizeMediaInput(templateImageUrl);
    const normalizedTemplatePreview =
      normalizeMediaInput(templatePreviewUrl) || normalizedTemplateImage;

    if (!templateName.trim() || !normalizedTemplateImage) {
      setError("Name and image URL are required.");
      return;
    }
    setUploading(true);
    try {
      await createPhotoCardTemplate({
        name: templateName.trim(),
        description: templateDescription.trim() || undefined,
        imageUrl: normalizedTemplateImage,
        previewUrl: normalizedTemplatePreview,
        category: templateCategory.trim() || undefined,
        isActive: true,
      });
      resetTemplateForm();
      setToast({ message: "Photocard template created.", type: "success" });
      await loadPhotocardTemplates();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create template.");
    } finally {
      setUploading(false);
    }
  };

  const handleEditPhotocardTemplate = (t: PhotoCardTemplate) => {
    setEditingTemplateId(t.id);
    setTemplateName(t.name);
    setTemplateDescription(t.description || "");
    setTemplateImageUrl(t.imageUrl);
    setTemplatePreviewUrl(t.previewUrl || "");
    setTemplateCategory(t.category || "");
  };

  const handleUpdatePhotocardTemplate = async () => {
    if (!editingTemplateId) return;
    setError("");
    const normalizedTemplateImage = normalizeMediaInput(templateImageUrl);
    const normalizedTemplatePreview =
      normalizeMediaInput(templatePreviewUrl) || normalizedTemplateImage;

    if (!templateName.trim() || !normalizedTemplateImage) {
      setError("Name and image URL are required.");
      return;
    }
    setUploading(true);
    try {
      await updatePhotoCardTemplate(editingTemplateId, {
        name: templateName.trim(),
        description: templateDescription.trim() || undefined,
        imageUrl: normalizedTemplateImage,
        previewUrl: normalizedTemplatePreview,
        category: templateCategory.trim() || undefined,
      });
      resetTemplateForm();
      setToast({ message: "Photocard template updated.", type: "success" });
      await loadPhotocardTemplates();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update template.");
    } finally {
      setUploading(false);
    }
  };

  const handleCancelTemplateEdit = () => {
    resetTemplateForm();
  };

  const handleDeletePhotocardTemplate = async (id: string) => {
    if (!confirm("Are you sure you want to delete this template?")) return;
    try {
      await deletePhotoCardTemplate(id);
      setToast({ message: "Photocard template deleted.", type: "success" });
      await loadPhotocardTemplates();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to delete template.");
    }
  };

  const handleToggleTemplateActive = async (id: string, current: boolean) => {
    setError("");
    try {
      await updatePhotoCardTemplate(id, { isActive: !current });
      setToast({
        message: current ? "Template deactivated." : "Template activated.",
        type: "success",
      });
      await loadPhotocardTemplates();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update template status.");
    }
  };



  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="dashboard-shell">
          <div className="dashboard-brand">
            <img src="/sylhety-logo.jpeg" alt="Sylhety News" className="dashboard-logo" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            <div>
              <h1 className="dashboard-title">Admin Dashboard</h1>
              <p className="dashboard-subtitle">Manage news, media, and categories</p>
              <div className="dashboard-status-row">
                <span className={`dashboard-chip ${isOffline ? "warning" : "success"}`}>
                  {isOffline ? "Offline draft mode" : "Online"}
                </span>
                {formattedDraftSavedAt && (
                  <span className="dashboard-chip muted">Autosaved</span>
                )}
              </div>
            </div>
          </div>
          <button onClick={handleLogout} className="dashboard-logout">Logout</button>
        </div>
      </header>

      <main className="dashboard-main">
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        {error && <div className="dashboard-alert">{error}</div>}

        <section className="dashboard-card">
          <div className="dashboard-card-title">
            <div>
              <h2>{editingNewsId ? "Edit News" : "CMS News Editor"}</h2>
              <p>Create, update, feature, and publish stories from one place.</p>
            </div>
            <span className="dashboard-chip">
              {editingNewsId ? "Editing" : published ? "Ready to publish" : "Draft mode"}
            </span>
          </div>
          <form onSubmit={handleCreateNews} className="dashboard-form">
            <div className="dashboard-sync-card">
              <div>
                <p className="dashboard-sync-title">
                  {isOffline ? "Offline writing mode" : "Draft protection is on"}
                </p>
                <p className="dashboard-helper">
                  {isOffline
                    ? "You can keep writing while offline. Publish the story when the connection comes back."
                    : formattedDraftSavedAt
                      ? `This story auto-saves on this device. Last saved ${formattedDraftSavedAt}.`
                      : "This story auto-saves on this device while you write."}
                </p>
                {imageFile && (
                  <p className="dashboard-helper">
                    Selected local image files are not saved in the draft. Upload media before closing the app.
                  </p>
                )}
              </div>
              <div className="dashboard-actions">
                {restoredDraft && (
                  <span className="dashboard-chip muted">Recovered local draft</span>
                )}
                <span className={`dashboard-chip ${isOffline ? "warning" : "success"}`}>
                  {isOffline ? "Offline" : "Auto-save active"}
                </span>
                {formattedDraftSavedAt && (
                  <span className="dashboard-chip muted">{formattedDraftSavedAt}</span>
                )}
                {(formattedDraftSavedAt || restoredDraft) && (
                  <button
                    type="button"
                    onClick={() => clearStoredNewsDraft(true)}
                    className="dashboard-button secondary dashboard-button-small"
                  >
                    Clear Saved Draft
                  </button>
                )}
              </div>
            </div>
            <div className="dashboard-grid">
              <input
                className="dashboard-input"
                placeholder="News title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                className="dashboard-input"
                placeholder="Summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
              <input
                className="dashboard-input"
                placeholder="Author"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
              <input
                className="dashboard-input"
                placeholder="District (optional)"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
            </div>
            <textarea
              className="dashboard-textarea"
              placeholder="Full news content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="dashboard-grid">
              <select
                className="dashboard-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                aria-label="News category"
              >
                <option value="">Select category</option>
                {categoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <input
                className="dashboard-input"
                placeholder="Tags (comma separated)"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
              />
            </div>
            <div className="dashboard-quick-grid">
              {categoryOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setCategory(opt.value)}
                  className={`dashboard-quick-chip ${category === opt.value ? "active" : ""}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="dashboard-checkbox-group">
              <label className="dashboard-checkbox">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                />
                Publish immediately
              </label>
              <label className="dashboard-checkbox">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                />
                Show as featured news
              </label>
            </div>
            <div className="dashboard-media">
              <div className="dashboard-media-field">
                <input
                  className="dashboard-input"
                  placeholder="Image URL or Google Drive link"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <p className="dashboard-helper">
                  Paste a normal image URL, upload an image, or convert a shared Google Drive link.
                </p>
                <div className="dashboard-links">
                  <button type="button" onClick={handleConvertDrive} className="dashboard-link drive">
                    Convert Google Drive link
                  </button>
                  <a
                    href="https://postimages.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dashboard-link postimages"
                  >
                    Get URL from Postimages
                  </a>
                </div>
                {newsImagePreviewUrl && (
                  <div className="dashboard-preview">
                    <img src={newsImagePreviewUrl} alt="News preview" />
                  </div>
                )}
              </div>
              <div className="dashboard-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="dashboard-file"
                  aria-label="Choose image"
                />
                <button
                  type="button"
                  onClick={handleUploadImage}
                  disabled={uploading}
                  className="dashboard-button secondary"
                >
                  {uploading ? "Uploading..." : "Upload Media"}
                </button>
              </div>
            </div>
            <div className="dashboard-actions">
              <button type="submit" disabled={uploading} className="dashboard-button primary">
                {uploading
                  ? "Saving..."
                  : editingNewsId
                    ? "Update News"
                    : published
                      ? "Publish News"
                      : "Save Draft"}
              </button>
              {editingNewsId && (
                <button
                  type="button"
                  onClick={resetNewsForm}
                  className="dashboard-button secondary"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="dashboard-card">
          <div className="dashboard-card-title">
            <div>
              <h2>News Library</h2>
              <p>Review, edit, feature, publish, or delete your latest stories.</p>
            </div>
            <span className="dashboard-chip muted">{news.length} items</span>
          </div>
          <div className="dashboard-list">
            {loadingNews ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Spinner /> <span>Loading news...</span>
              </div>
            ) : news.length === 0 ? (
              <p className="dashboard-empty">No news yet.</p>
            ) : (
              news.map((item) => (
                <div key={item.id} className="dashboard-list-item dashboard-list-item-stacked">
                  <div className="dashboard-list-content">
                    {item.imageUrl && (
                      <img
                        src={resolveApiAssetUrl(item.imageUrl)}
                        alt={item.title}
                        className="dashboard-list-thumbnail"
                      />
                    )}
                    <div>
                      <p className="dashboard-list-title">{item.title}</p>
                      <p className="dashboard-list-subtitle">
                        {item.category}
                        {item.district ? ` | ${item.district}` : ""}
                        {item.author ? ` | ${item.author}` : ""}
                      </p>
                      <div className="dashboard-meta">
                        <span className={`dashboard-meta-item ${item.published ? "success" : "muted"}`}>
                          {item.published ? "Published" : "Draft"}
                        </span>
                        <span className={`dashboard-meta-item ${item.featured ? "warning" : "muted"}`}>
                          {item.featured ? "Featured" : "Standard"}
                        </span>
                        {item.tags && item.tags.length > 0 && (
                          <span className="dashboard-meta-item">
                            Tags: {item.tags.join(", ")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="dashboard-actions">
                    <button
                      onClick={() => handleEditNews(item)}
                      className="dashboard-button secondary dashboard-button-small"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleTogglePublish(item)}
                      className="dashboard-button secondary dashboard-button-small"
                    >
                      {item.published ? "Move to Draft" : "Publish"}
                    </button>
                    <button
                      onClick={() => handleToggleFeatured(item)}
                      className="dashboard-button secondary dashboard-button-small"
                    >
                      {item.featured ? "Unfeature" : "Feature"}
                    </button>
                    <button onClick={() => handleDeleteNews(item.id)} className="dashboard-delete">
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="dashboard-card">
          <div className="dashboard-card-title">
            <div>
              <h2>Categories</h2>
              <p>Keep all major news sections ready for editors.</p>
            </div>
            <span className="dashboard-chip muted">
              {categories.length} saved | {missingDefaultCategories.length} recommended missing
            </span>
          </div>
          <div className="dashboard-form">
            <div className="dashboard-grid">
              <input
                className="dashboard-input"
                placeholder="Category name"
                value={categoryName}
                onChange={(e) => {
                  const nextName = e.target.value;
                  const currentAutoSlug = normalizeCategorySlug(categoryName);
                  setCategoryName(nextName);
                  if (!categorySlugInput || categorySlugInput === currentAutoSlug) {
                    setCategorySlugInput(normalizeCategorySlug(nextName));
                  }
                }}
              />
              <input
                className="dashboard-input"
                placeholder="Category slug (e.g. politics)"
                value={categorySlugInput}
                onChange={(e) => setCategorySlugInput(normalizeCategorySlug(e.target.value))}
              />
            </div>
            <div className="dashboard-actions">
              <button
                type="button"
                onClick={handleCreateCategory}
                disabled={loadingCategoriesAction}
                className="dashboard-button secondary"
              >
                {loadingCategoriesAction
                  ? "Saving..."
                  : editingCategoryId
                    ? "Update Category"
                    : "Add Category"}
              </button>
              <button
                type="button"
                onClick={handleSeedDefaultCategories}
                disabled={loadingCategoriesAction}
                className="dashboard-button primary"
              >
                Add Recommended Categories
              </button>
              {editingCategoryId && (
                <button
                  type="button"
                  onClick={resetCategoryForm}
                  className="dashboard-button secondary"
                >
                  Cancel Edit
                </button>
              )}
            </div>
            <div className="dashboard-quick-grid">
              {DEFAULT_CATEGORIES.map((preset) => (
                <button
                  key={preset.slug}
                  type="button"
                  onClick={() => {
                    setCategoryName(preset.name);
                    setCategorySlugInput(preset.slug);
                  }}
                  className={`dashboard-quick-chip ${
                    missingDefaultCategories.some((item) => item.slug === preset.slug)
                      ? ""
                      : "active"
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
          <div className="dashboard-list compact">
            {loadingCategories ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Spinner /> <span>Loading categories...</span>
              </div>
            ) : categories.length === 0 ? (
              <p className="dashboard-empty">
                No categories saved yet. Use "Add Recommended Categories" to load the core news sections.
              </p>
            ) : (
              categories.map((item) => (
                <div key={item.id} className="dashboard-list-item">
                  <div>
                    <p className="dashboard-list-title">{item.name}</p>
                    <p className="dashboard-list-subtitle">{item.slug}</p>
                  </div>
                  <div className="dashboard-actions">
                    <button
                      onClick={() => handleEditCategory(item)}
                      className="dashboard-button secondary dashboard-button-small"
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDeleteCategory(item.id)} className="dashboard-delete">
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="dashboard-card">
          <div className="dashboard-card-title">
            <div>
              <h2>Team Members</h2>
              <p>Manage team members and their introductions.</p>
            </div>
            <span className="dashboard-chip muted">{teamMembers.length} members</span>
          </div>
          <div className="dashboard-form">
            <div className="dashboard-grid">
              <input className="dashboard-input" placeholder="Member Name" value={memberName} onChange={(e) => setMemberName(e.target.value)} />
              <input className="dashboard-input" placeholder="Role (e.g., সম্পাদক)" value={memberRole} onChange={(e) => setMemberRole(e.target.value)} />
              <input className="dashboard-input" type="number" placeholder="Order" value={memberOrder || ""} onChange={(e) => setMemberOrder(parseInt(e.target.value) || 0)} />
            </div>
            <textarea className="dashboard-textarea" placeholder="Introduction (optional)" value={memberIntroduction} onChange={(e) => setMemberIntroduction(e.target.value)} rows={3} />
            <div className="dashboard-row">
              {editingMemberId ? (
                <>
                  <button type="button" onClick={handleUpdateTeamMember} disabled={uploading} className="dashboard-button primary">{uploading ? "Updating..." : "Update Member"}</button>
                  <button type="button" onClick={handleCancelEdit} className="dashboard-button secondary">Cancel</button>
                </>
              ) : (
                <button type="button" onClick={handleCreateTeamMember} disabled={uploading} className="dashboard-button primary">{uploading ? "Adding..." : "Add Member"}</button>
              )}
            </div>
          </div>
          <div className="dashboard-list">
            {teamMembers.length === 0 ? (
              <p className="dashboard-empty">No team members yet.</p>
            ) : (
              teamMembers.map((m) => (
                <div key={m.id} className="dashboard-list-item">
                  <div>
                    <p className="dashboard-list-title">{m.name}</p>
                    <p className="dashboard-list-subtitle">{m.role}</p>
                    {m.introduction && <p className="dashboard-list-description" style={{ marginTop: "8px", fontSize: "14px", color: "#666" }}>{m.introduction}</p>}
                    <p className="dashboard-list-subtitle" style={{ fontSize: "12px", marginTop: "4px" }}>Order: {m.order}</p>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => handleEditTeamMember(m)} className="dashboard-button secondary" style={{ padding: "6px 12px", fontSize: "14px" }}>Edit</button>
                    <button onClick={() => handleDeleteTeamMember(m.id)} className="dashboard-delete">Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="dashboard-card">
          <div className="dashboard-card-title">
            <div>
              <h2>PhotoCard Templates</h2>
              <p>Manage photocard templates for users.</p>
            </div>
            <span className="dashboard-chip muted">{photocardTemplates.length} templates</span>
          </div>
          <div className="dashboard-form">
            <div className="dashboard-grid">
              <input className="dashboard-input" placeholder="Template Name" value={templateName} onChange={(e) => setTemplateName(e.target.value)} />
              <input className="dashboard-input" placeholder="Category (optional)" value={templateCategory} onChange={(e) => setTemplateCategory(e.target.value)} />
            </div>
            <textarea className="dashboard-textarea" placeholder="Description (optional)" value={templateDescription} onChange={(e) => setTemplateDescription(e.target.value)} rows={2} />
            <div className="dashboard-media">
              <div className="dashboard-media-field">
                <input className="dashboard-input" placeholder="Template Image URL" value={templateImageUrl} onChange={(e) => setTemplateImageUrl(e.target.value)} />
                <div className="dashboard-upload">
                  <input type="file" accept="image/*" onChange={(e) => setTemplateFile(e.target.files?.[0] || null)} className="dashboard-file" aria-label="Choose template image" />
                  <button type="button" onClick={handleUploadTemplateImage} disabled={uploading || !templateFile} className="dashboard-button secondary">{uploading ? "Uploading..." : "Upload Template"}</button>
                </div>
              </div>
              <div className="dashboard-media-field">
                <input className="dashboard-input" placeholder="Preview Image URL (optional)" value={templatePreviewUrl} onChange={(e) => setTemplatePreviewUrl(e.target.value)} />
                <div className="dashboard-upload">
                  <input type="file" accept="image/*" onChange={(e) => setTemplatePreviewFile(e.target.files?.[0] || null)} className="dashboard-file" aria-label="Choose preview image" />
                  <button type="button" onClick={handleUploadTemplatePreview} disabled={uploading || !templatePreviewFile} className="dashboard-button secondary">{uploading ? "Uploading..." : "Upload Preview"}</button>
                </div>
              </div>
            </div>
            <div className="dashboard-row">
              {editingTemplateId ? (
                <>
                  <button type="button" onClick={handleUpdatePhotocardTemplate} disabled={uploading} className="dashboard-button primary">{uploading ? "Updating..." : "Update Template"}</button>
                  <button type="button" onClick={handleCancelTemplateEdit} className="dashboard-button secondary">Cancel</button>
                </>
              ) : (
                <button type="button" onClick={handleCreatePhotocardTemplate} disabled={uploading} className="dashboard-button primary">{uploading ? "Adding..." : "Add Template"}</button>
              )}
            </div>
          </div>
          <div className="dashboard-list">
            {uploading ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Spinner /> <span>Loading templates...</span></div>
            ) : photocardTemplates.length === 0 ? (
              <p className="dashboard-empty">No templates yet.</p>
            ) : (
              photocardTemplates.map((t) => (
                <div key={t.id} className="dashboard-list-item">
                  <div style={{ display: "flex", gap: "12px", alignItems: "center", flex: 1 }}>
                    {t.previewUrl && <img src={t.previewUrl} alt={t.name} style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8 }} />}
                    <div>
                      <p className="dashboard-list-title">{t.name}</p>
                      {t.description && <p className="dashboard-list-subtitle">{t.description}</p>}
                      <p className="dashboard-list-subtitle" style={{ fontSize: "12px", marginTop: "4px" }}>{t.category && `Category: ${t.category} | `}Status: {t.isActive ? "Active" : "Inactive"}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => handleToggleTemplateActive(t.id, t.isActive)} className="dashboard-button secondary" style={{ padding: "6px 12px", fontSize: "14px" }}>{t.isActive ? "Deactivate" : "Activate"}</button>
                    <button onClick={() => handleEditPhotocardTemplate(t)} className="dashboard-button secondary" style={{ padding: "6px 12px", fontSize: "14px" }}>Edit</button>
                    <button onClick={() => handleDeletePhotocardTemplate(t.id)} className="dashboard-delete">Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
