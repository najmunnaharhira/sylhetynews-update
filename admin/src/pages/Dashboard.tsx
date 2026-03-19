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
import { apiFetch, uploadImage } from "../lib/api";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
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

const getDriveDirectLink = (url: string) => {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([^&]+)/);
  if (!match) return "";
  return `https://drive.google.com/uc?export=view&id=${match[1]}`;
};

const FALLBACK_NEWS_IMAGE = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80";

export default function Dashboard() {
  const { user, logout, token } = useAuth();
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
  const [tagsInput, setTagsInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [isPublished, setIsPublished] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [newsImagePreview, setNewsImagePreview] = useState("");
  const [savingNews, setSavingNews] = useState(false);
  const [uploadingNewsImage, setUploadingNewsImage] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loadingCategoriesAction, setLoadingCategoriesAction] = useState(false);

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

  const categoryOptions = useMemo(
    () => categories.map((item) => ({ value: item.slug, label: item.name })),
    [categories]
  );
  const activeTemplateCount = useMemo(
    () => photocardTemplates.filter((template) => template.isActive).length,
    [photocardTemplates]
  );
  const publishedNewsCount = useMemo(
    () => news.filter((item) => item.published).length,
    [news]
  );
  const featuredNewsCount = useMemo(
    () => news.filter((item) => item.featured).length,
    [news]
  );
  const draftNewsCount = Math.max(0, news.length - publishedNewsCount);
  const missingDefaultCategories = useMemo(
    () =>
      DEFAULT_CATEGORIES.filter(
        (item) => !categories.some((categoryItem) => categoryItem.slug === item.slug)
      ),
    [categories]
  );
  const dashboardStats = useMemo(
    () => [
      { label: "News Items", value: news.length, tone: "primary" },
      { label: "Categories", value: categories.length, tone: "neutral" },
      { label: "Team Members", value: teamMembers.length, tone: "neutral" },
      { label: "Active Templates", value: activeTemplateCount, tone: "accent" },
    ],
    [activeTemplateCount, categories.length, news.length, teamMembers.length]
  );
  const workspaceShortcuts = [
    { href: "#news-composer", label: "News Composer" },
    { href: "#news-library", label: "News Library" },
    { href: "#category-desk", label: "Categories" },
    { href: "#team-desk", label: "Team Desk" },
    { href: "#template-library", label: "Photocard Templates" },
  ];

  useEffect(() => {
    if (imageFile) {
      const objectUrl = URL.createObjectURL(imageFile);
      setNewsImagePreview(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }

    setNewsImagePreview(imageUrl.trim());
    return undefined;
  }, [imageFile, imageUrl]);

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
  }, [navigate, token]);

  const handleLogout = async () => {
    logout();
    navigate("/login");
  };

  const resetNewsForm = () => {
    setEditingNewsId(null);
    setTitle("");
    setSummary("");
    setContent("");
    setCategory("");
    setDistrict("");
    setTagsInput("");
    setImageUrl("");
    setImageFile(null);
    setIsPublished(true);
    setIsFeatured(false);
    setNewsImagePreview("");
  };

  const parseTags = (value: string) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  const resolveNewsImageUrl = async () => {
    if (imageFile) {
      const uploadedUrl = await uploadImage(imageFile);
      setImageUrl(uploadedUrl);
      setImageFile(null);
      return uploadedUrl;
    }

    return imageUrl.trim() || FALLBACK_NEWS_IMAGE;
  };

  const handleCreateNews = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!title.trim() || !summary.trim() || !content.trim() || !category.trim()) {
      setError("Title, summary, content, and category are required.");
      return;
    }
    setSavingNews(true);
    try {
      const resolvedImageUrl = await resolveNewsImageUrl();
      await createNewsItem({
        title: title.trim(),
        summary: summary.trim(),
        content: content.trim(),
        category: category.trim(),
        district: district.trim(),
        imageUrl: resolvedImageUrl,
        author: user?.email || "admin@gmail.com",
        published: isPublished,
        featured: isFeatured,
        tags: parseTags(tagsInput),
      });
      resetNewsForm();
      setToast({ message: "News published successfully.", type: "success" });
      await loadNews();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create news.");
    } finally {
      setSavingNews(false);
    }
  };

  const handleEditNews = (item: NewsItem) => {
    setEditingNewsId(item.id);
    setTitle(item.title);
    setSummary(item.summary || "");
    setContent(item.content || "");
    setCategory(item.category || "");
    setDistrict(item.district || "");
    setTagsInput((item.tags || []).join(", "));
    setImageUrl(item.imageUrl || "");
    setImageFile(null);
    setIsPublished(Boolean(item.published));
    setIsFeatured(Boolean(item.featured));
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdateNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNewsId) {
      return;
    }

    setError("");
    if (!title.trim() || !summary.trim() || !content.trim() || !category.trim()) {
      setError("Title, summary, content, and category are required.");
      return;
    }

    setSavingNews(true);
    try {
      const resolvedImageUrl = await resolveNewsImageUrl();
      await updateNewsItem(editingNewsId, {
        title: title.trim(),
        summary: summary.trim(),
        content: content.trim(),
        category: category.trim(),
        district: district.trim(),
        imageUrl: resolvedImageUrl,
        published: isPublished,
        featured: isFeatured,
        tags: parseTags(tagsInput),
      });
      resetNewsForm();
      setToast({ message: "News updated successfully.", type: "success" });
      await loadNews();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update news.");
    } finally {
      setSavingNews(false);
    }
  };

  const handleCancelNewsEdit = () => {
    resetNewsForm();
    setError("");
  };

  const handleDeleteNews = async (id: string) => {
    if (!confirm("Are you sure you want to delete this news item?")) return;
    try {
      await deleteNewsItem(id);
      setToast({ message: "News deleted.", type: "success" });
      await loadNews();
    } catch {
      setError("Failed to delete news.");
    }
  };

  const handleTogglePublish = async (id: string, current: boolean) => {
    try {
      await toggleNewsPublish(id, !current);
      setToast({
        message: current ? "News moved to draft." : "News published.",
        type: "success",
      });
      await loadNews();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update publish status.");
    }
  };

  const handleCreateCategory = async () => {
    setError("");
    if (!categoryName.trim()) {
      setError("Category name is required.");
      return;
    }
    setLoadingCategoriesAction(true);
    try {
      const slug = categoryName.trim().toLowerCase().replace(/\s+/g, "-");
      await apiFetch("/categories", {
        method: "POST",
        body: JSON.stringify({ name: categoryName.trim(), slug }),
      });
      setCategoryName("");
      await loadCategories();
    } catch (err: any) {
      setError(err.message || "Failed to create category.");
    } finally {
      setLoadingCategoriesAction(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    setLoadingCategoriesAction(true);
    try {
      await apiFetch(`/categories/${id}`, { method: "DELETE" });
      await loadCategories();
    } catch (err: any) {
      setError(err.message || "Failed to delete category.");
    } finally {
      setLoadingCategoriesAction(false);
    }
  };

  const handleConvertDrive = () => {
    if (!imageUrl.trim()) {
      setError("Paste a Google Drive link first.");
      return;
    }
    const converted = getDriveDirectLink(imageUrl.trim());
    if (!converted) {
      setError("That does not look like a Google Drive link.");
      return;
    }
    setError("");
    setImageUrl(converted);
  };

  const handleUploadImage = async () => {
    if (!imageFile) {
      setError("Please choose an image to upload.");
      return;
    }
    setError("");
    setUploadingNewsImage(true);
    try {
      const uploadedUrl = await uploadImage(imageFile);
      setImageUrl(uploadedUrl);
      setImageFile(null);
      setToast({ message: "News image uploaded successfully.", type: "success" });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to upload image.");
    } finally {
      setUploadingNewsImage(false);
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
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to upload preview.");
    } finally {
      setUploading(false);
    }
  };

  const handleCreatePhotocardTemplate = async () => {
    setError("");
    if (!templateName.trim() || !templateImageUrl.trim()) {
      setError("Name and image URL are required.");
      return;
    }
    setUploading(true);
    try {
      await createPhotoCardTemplate({
        name: templateName.trim(),
        description: templateDescription.trim() || undefined,
        imageUrl: templateImageUrl.trim(),
        previewUrl: templatePreviewUrl.trim() || templateImageUrl.trim(),
        category: templateCategory.trim() || undefined,
        isActive: true,
      });
      setTemplateName("");
      setTemplateDescription("");
      setTemplateImageUrl("");
      setTemplatePreviewUrl("");
      setTemplateCategory("");
      setTemplateFile(null);
      setTemplatePreviewFile(null);
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
    if (!templateName.trim() || !templateImageUrl.trim()) {
      setError("Name and image URL are required.");
      return;
    }
    setUploading(true);
    try {
      await updatePhotoCardTemplate(editingTemplateId, {
        name: templateName.trim(),
        description: templateDescription.trim() || undefined,
        imageUrl: templateImageUrl.trim(),
        previewUrl: templatePreviewUrl.trim() || templateImageUrl.trim(),
        category: templateCategory.trim() || undefined,
      });
      setEditingTemplateId(null);
      setTemplateName("");
      setTemplateDescription("");
      setTemplateImageUrl("");
      setTemplatePreviewUrl("");
      setTemplateCategory("");
      setTemplateFile(null);
      setTemplatePreviewFile(null);
      await loadPhotocardTemplates();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update template.");
    } finally {
      setUploading(false);
    }
  };

  const handleCancelTemplateEdit = () => {
    setEditingTemplateId(null);
    setTemplateName("");
    setTemplateDescription("");
    setTemplateImageUrl("");
    setTemplatePreviewUrl("");
    setTemplateCategory("");
    setTemplateFile(null);
    setTemplatePreviewFile(null);
  };

  const handleDeletePhotocardTemplate = async (id: string) => {
    if (!confirm("Are you sure you want to delete this template?")) return;
    try {
      await deletePhotoCardTemplate(id);
      await loadPhotocardTemplates();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to delete template.");
    }
  };

  const handleToggleTemplateActive = async (id: string, current: boolean) => {
    setError("");
    try {
      await updatePhotoCardTemplate(id, { isActive: !current });
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
            </div>
          </div>
          <button onClick={handleLogout} className="dashboard-logout">Logout</button>
        </div>
      </header>

      <main className="dashboard-main">
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        {error && <div className="dashboard-alert">{error}</div>}

        <section className="dashboard-hero">
          <div>
            <p className="dashboard-kicker">Workspace Overview</p>
            <h2 className="dashboard-hero-title">Welcome back{user?.email ? `, ${user.email}` : ""}</h2>
            <p className="dashboard-hero-copy">
              Publish news, refresh categories, manage team profiles, and control the public photocard defaults from one dashboard.
            </p>
          </div>
          <div className="dashboard-stat-grid">
            {dashboardStats.map((stat) => (
              <div key={stat.label} className={`dashboard-stat-card ${stat.tone}`}>
                <span className="dashboard-stat-label">{stat.label}</span>
                <strong className="dashboard-stat-value">{stat.value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-workspace-bar">
          <div className="dashboard-workspace-card">
            <p className="dashboard-panel-kicker">Quick Navigation</p>
            <div className="dashboard-shortcuts">
              {workspaceShortcuts.map((shortcut) => (
                <a key={shortcut.href} href={shortcut.href} className="dashboard-shortcut">
                  {shortcut.label}
                </a>
              ))}
            </div>
          </div>

          <div className="dashboard-workspace-card">
            <p className="dashboard-panel-kicker">Editorial Snapshot</p>
            <div className="dashboard-inline-stats">
              <div className="dashboard-inline-stat">
                <span>Published</span>
                <strong>{publishedNewsCount}</strong>
              </div>
              <div className="dashboard-inline-stat">
                <span>Drafts</span>
                <strong>{draftNewsCount}</strong>
              </div>
              <div className="dashboard-inline-stat">
                <span>Featured</span>
                <strong>{featuredNewsCount}</strong>
              </div>
            </div>
          </div>

          <div className="dashboard-workspace-card">
            <p className="dashboard-panel-kicker">Admin Session</p>
            <div className="dashboard-meta-stack">
              <div className="dashboard-meta-row">
                <span>Signed in as</span>
                <strong>{user?.email || "admin"}</strong>
              </div>
              <div className="dashboard-meta-row">
                <span>Active templates</span>
                <strong>{activeTemplateCount}</strong>
              </div>
              <div className="dashboard-meta-row">
                <span>Missing default categories</span>
                <strong>{missingDefaultCategories.length}</strong>
              </div>
            </div>
          </div>
        </section>

        <div className="dashboard-layout-grid">
          <div className="dashboard-main-column">
        <section id="news-composer" className="dashboard-card">
          <div className="dashboard-card-title">
            <div>
              <p className="dashboard-section-kicker">Content Desk</p>
              <h2>{editingNewsId ? "Edit News" : "Create News"}</h2>
              <p>
                {editingNewsId
                  ? "Update the story, image, publish state, and feature flags."
                  : "Publish breaking updates and daily headlines with proper media support."}
              </p>
            </div>
            <span className={`dashboard-chip ${editingNewsId ? "muted" : ""}`}>
              {editingNewsId ? "Editing" : isPublished ? "Ready to Publish" : "Draft Mode"}
            </span>
          </div>
          <form onSubmit={editingNewsId ? handleUpdateNews : handleCreateNews} className="dashboard-form">
            <div className="dashboard-grid">
              <input className="dashboard-input" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
              <input className="dashboard-input" placeholder="Summary" value={summary} onChange={(e) => setSummary(e.target.value)} />
            </div>
            <div className="dashboard-grid">
              <select className="dashboard-input" value={category} onChange={(e) => setCategory(e.target.value)} aria-label="News category">
                <option value="">Select category</option>
                {categoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <input
                className="dashboard-input"
                placeholder="District or location (optional)"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
              <input
                className="dashboard-input"
                placeholder="Tags separated by commas"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
              />
            </div>
            <textarea
              className="dashboard-textarea"
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="dashboard-toggle-row">
              <label className="dashboard-toggle">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                />
                <span>Publish now</span>
              </label>
              <label className="dashboard-toggle">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                />
                <span>Mark as featured</span>
              </label>
            </div>
            <div className="dashboard-media">
              <div className="dashboard-media-field">
                <input
                  className="dashboard-input"
                  placeholder="Image URL (optional)"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <div className="dashboard-links">
                  <button type="button" onClick={handleConvertDrive} className="dashboard-link drive">Convert Google Drive link</button>
                  <a href="https://postimages.org/" target="_blank" rel="noopener noreferrer" className="dashboard-link postimages">Get URL from Postimages</a>
                </div>
                <p className="dashboard-help-text">
                  If you select an image file below, it will upload automatically when you publish or update the story.
                </p>
              </div>
              <div className="dashboard-upload">
                <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="dashboard-file" aria-label="Choose image" />
                <button type="button" onClick={handleUploadImage} disabled={!imageFile || uploadingNewsImage} className="dashboard-button secondary">
                  {uploadingNewsImage ? "Uploading..." : "Upload Media"}
                </button>
              </div>
              {newsImagePreview ? (
                <div className="dashboard-news-preview">
                  <img src={newsImagePreview} alt="News preview" className="dashboard-news-preview-image" />
                  <div>
                    <p className="dashboard-list-title">{imageFile ? imageFile.name : "Current article image"}</p>
                    <p className="dashboard-list-subtitle">
                      {imageFile ? "Selected file is ready for upload." : "Using the saved image URL."}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="dashboard-row">
              <button type="submit" disabled={savingNews || uploadingNewsImage} className="dashboard-button primary">
                {savingNews
                  ? editingNewsId
                    ? "Updating..."
                    : isPublished
                      ? "Publishing..."
                      : "Saving Draft..."
                  : editingNewsId
                    ? "Update News"
                    : isPublished
                      ? "Publish News"
                      : "Save Draft"}
              </button>
              {editingNewsId ? (
                <button type="button" onClick={handleCancelNewsEdit} className="dashboard-button secondary">
                  Cancel
                </button>
              ) : null}
            </div>
          </form>
        </section>

        <section id="news-library" className="dashboard-card">
          <div className="dashboard-card-title">
            <div>
              <p className="dashboard-section-kicker">Publishing Queue</p>
              <h2>Latest News</h2>
              <p>Review recently published items.</p>
            </div>
            <span className="dashboard-chip muted">{news.length} items</span>
          </div>
          <div className="dashboard-list">
            {loadingNews ? (
              <div className="dashboard-loading"><Spinner /> <span>Loading news...</span></div>
            ) : news.length === 0 ? (
              <p className="dashboard-empty">No news yet.</p>
            ) : (
              news.map((item) => (
                <div key={item.id} className="dashboard-list-item dashboard-news-item">
                  <div className="dashboard-news-main">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.title} className="dashboard-news-thumb" />
                    ) : (
                      <div className="dashboard-news-thumb dashboard-news-thumb-placeholder">No image</div>
                    )}
                    <div className="dashboard-news-copy">
                      <div className="dashboard-news-badges">
                        <span className={`dashboard-chip ${item.published ? "" : "muted"}`}>
                          {item.published ? "Published" : "Draft"}
                        </span>
                        {item.featured ? <span className="dashboard-chip">Featured</span> : null}
                      </div>
                      <p className="dashboard-list-title">{item.title}</p>
                      <p className="dashboard-list-subtitle">
                        {item.category}
                        {item.district ? ` • ${item.district}` : ""}
                      </p>
                      {item.summary ? (
                        <p className="dashboard-list-description">{item.summary}</p>
                      ) : null}
                      <p className="dashboard-list-meta">
                        {item.author || "Admin"} • {item.views ?? 0} views
                      </p>
                    </div>
                  </div>
                  <div className="dashboard-actions">
                    <button onClick={() => handleEditNews(item)} className="dashboard-button secondary small">Edit</button>
                    <button
                      onClick={() => handleTogglePublish(item.id, Boolean(item.published))}
                      className="dashboard-button secondary small"
                    >
                      {item.published ? "Unpublish" : "Publish"}
                    </button>
                    <button onClick={() => handleDeleteNews(item.id)} className="dashboard-delete">Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
          </div>

          <div className="dashboard-side-column">
        <section id="category-desk" className="dashboard-card">
          <div className="dashboard-card-title">
            <div>
              <p className="dashboard-section-kicker">Homepage Taxonomy</p>
              <h2>Categories</h2>
              <p>Manage homepage sections.</p>
            </div>
            <span className="dashboard-chip muted">{categories.length} total</span>
          </div>
          {missingDefaultCategories.length > 0 ? (
            <div className="dashboard-note-card">
              <strong>Recommended defaults missing:</strong> {missingDefaultCategories.map((item) => item.name).join(", ")}
            </div>
          ) : (
            <div className="dashboard-note-card success">
              <strong>Category structure looks complete.</strong> All standard homepage sections are present.
            </div>
          )}
          <div className="dashboard-row">
            <input className="dashboard-input" placeholder="Category name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
            <button type="button" onClick={handleCreateCategory} className="dashboard-button secondary">Add</button>
          </div>
          <div className="dashboard-list compact">
            {loadingCategories ? (
              <div className="dashboard-loading"><Spinner /> <span>Loading categories...</span></div>
            ) : categories.length === 0 ? (
              <p className="dashboard-empty">No categories yet.</p>
            ) : (
              categories.map((item) => (
                <div key={item.id} className="dashboard-list-item">
                  <div>
                    <p className="dashboard-list-title">{item.name}</p>
                    <p className="dashboard-list-subtitle">{item.slug}</p>
                  </div>
                  <button onClick={() => handleDeleteCategory(item.id)} className="dashboard-delete">Delete</button>
                </div>
              ))
            )}
          </div>
        </section>

        <section id="team-desk" className="dashboard-card">
          <div className="dashboard-card-title">
            <div>
              <p className="dashboard-section-kicker">Editorial Staff</p>
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
                    {m.introduction && <p className="dashboard-list-description">{m.introduction}</p>}
                    <p className="dashboard-list-meta">Order: {m.order}</p>
                  </div>
                  <div className="dashboard-actions">
                    <button onClick={() => handleEditTeamMember(m)} className="dashboard-button secondary small">Edit</button>
                    <button onClick={() => handleDeleteTeamMember(m.id)} className="dashboard-delete">Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section id="template-library" className="dashboard-card">
          <div className="dashboard-card-title">
            <div>
              <p className="dashboard-section-kicker">Visual Toolkit</p>
              <h2>PhotoCard Templates</h2>
              <p>Manage photocard templates for users.</p>
            </div>
            <span className="dashboard-chip muted">{photocardTemplates.length} templates</span>
          </div>
          <div className="dashboard-note-card">
            <strong>Public download mode:</strong> {activeTemplateCount} template{activeTemplateCount === 1 ? "" : "s"} currently active on the public photocard page.
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
              <div className="dashboard-loading"><Spinner /> <span>Loading templates...</span></div>
            ) : photocardTemplates.length === 0 ? (
              <p className="dashboard-empty">No templates yet.</p>
            ) : (
              photocardTemplates.map((t) => (
                <div key={t.id} className="dashboard-list-item">
                  <div className="dashboard-template-main">
                    {t.previewUrl && <img src={t.previewUrl} alt={t.name} className="dashboard-template-preview" />}
                    <div>
                      <p className="dashboard-list-title">{t.name}</p>
                      {t.description && <p className="dashboard-list-subtitle">{t.description}</p>}
                      <p className="dashboard-list-meta">{t.category && `Category: ${t.category} • `}Status: {t.isActive ? "Active" : "Inactive"}</p>
                    </div>
                  </div>
                  <div className="dashboard-actions">
                    <button onClick={() => handleToggleTemplateActive(t.id, t.isActive)} className="dashboard-button secondary small">{t.isActive ? "Deactivate" : "Activate"}</button>
                    <button onClick={() => handleEditPhotocardTemplate(t)} className="dashboard-button secondary small">Edit</button>
                    <button onClick={() => handleDeletePhotocardTemplate(t.id)} className="dashboard-delete">Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
          </div>
        </div>
      </main>
    </div>
  );
}
