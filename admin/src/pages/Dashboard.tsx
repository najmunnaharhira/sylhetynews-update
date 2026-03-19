import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  NewsItem, CategoryItem, TeamMember, PhotoCardTemplate
} from "../types/entities";
import {
  fetchNews, fetchCategories, fetchTeam, fetchPhotoCardTemplates,
  createTeamMember, updateTeamMember, deleteTeamMember,
  createPhotoCardTemplate, updatePhotoCardTemplate, deletePhotoCardTemplate
} from "../services/entities";
import { apiFetch } from "../lib/api";
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
  const [imageUrl, setImageUrl] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
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


  const [authReady, setAuthReady] = useState(true); // Always ready, backend-driven

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

  const handleLogout = async () => {
    logout();
    navigate("/login");
  };

  const handleCreateNews = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!title.trim() || !summary.trim() || !content.trim() || !category.trim()) {
      setError("Title, summary, content, and category are required.");
      return;
    }
    setUploading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          summary: summary.trim(),
          content: content.trim(),
          category: category.trim(),
          imageUrl: imageUrl.trim(),
        }),
      });
      if (!res.ok) throw new Error("Failed to create news");
      setTitle("");
      setSummary("");
      setContent("");
      setCategory("");
      setImageUrl("");
      setImageFile(null);
      await loadNews();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create news.");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteNews = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/news/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete news");
      await loadNews();
    } catch {
      setError("Failed to delete news.");
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
    window.open("https://drive.google.com/", "_blank");
  };

  // Stub for image upload: Replace with actual backend upload endpoint if available
  const handleUploadImage = async () => {
    if (!imageFile) {
      setError("Please choose an image to upload.");
      return;
    }
    setError("");
    setUploading(true);
    try {
      // TODO: Implement actual backend upload and get URL
      setTimeout(() => {
        setImageUrl("/uploads/" + imageFile.name);
        setUploading(false);
      }, 1000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to upload image.");
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

  // Stub for template image upload: Replace with actual backend upload endpoint if available
  const handleUploadTemplateImage = async () => {
    if (!templateFile) return;
    setError("");
    setUploading(true);
    try {
      // TODO: Implement actual backend upload and get URL
      setTimeout(() => {
        setTemplateImageUrl("/uploads/" + templateFile.name);
        setUploading(false);
      }, 1000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to upload template image.");
      setUploading(false);
    }
  };

  // Stub for template preview upload: Replace with actual backend upload endpoint if available
  const handleUploadTemplatePreview = async () => {
    if (!templatePreviewFile) return;
    setError("");
    setUploading(true);
    try {
      // TODO: Implement actual backend upload and get URL
      setTimeout(() => {
        setTemplatePreviewUrl("/uploads/" + templatePreviewFile.name);
        setUploading(false);
      }, 1000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to upload preview.");
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
    // TODO: Implement backend API call to toggle template active status
    setError("Toggle active/inactive not yet implemented.");
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

        <section className="dashboard-card">
          <div className="dashboard-card-title">
            <div>
              <h2>Create News</h2>
              <p>Publish breaking updates and daily headlines.</p>
            </div>
            <span className="dashboard-chip">Live</span>
          </div>
          <form onSubmit={handleCreateNews} className="dashboard-form">
            <div className="dashboard-grid">
              <input className="dashboard-input" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
              <input className="dashboard-input" placeholder="Summary" value={summary} onChange={(e) => setSummary(e.target.value)} />
            </div>
            <textarea className="dashboard-textarea" placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
            <select className="dashboard-input" value={category} onChange={(e) => setCategory(e.target.value)} aria-label="News category">
              <option value="">Select category</option>
              {categoryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <div className="dashboard-media">
              <div className="dashboard-media-field">
                <input className="dashboard-input" placeholder="Image URL (optional)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                <div className="dashboard-links">
                  <button type="button" onClick={handleConvertDrive} className="dashboard-link drive">Convert Google Drive link</button>
                  <a href="https://postimages.org/" target="_blank" rel="noopener noreferrer" className="dashboard-link postimages">Get URL from Postimages</a>
                </div>
              </div>
              <div className="dashboard-upload">
                <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="dashboard-file" aria-label="Choose image" />
                <button type="button" onClick={handleUploadImage} disabled={uploading} className="dashboard-button secondary">{uploading ? "Uploading..." : "Upload Media"}</button>
              </div>
            </div>
            <button type="submit" disabled={uploading} className="dashboard-button primary">{uploading ? "Saving..." : "Publish"}</button>
          </form>
        </section>

        <section className="dashboard-card">
          <div className="dashboard-card-title">
            <div>
              <h2>Latest News</h2>
              <p>Review recently published items.</p>
            </div>
            <span className="dashboard-chip muted">{news.length} items</span>
          </div>
          <div className="dashboard-list">
            {loadingNews ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Spinner /> <span>Loading news...</span></div>
            ) : news.length === 0 ? (
              <p className="dashboard-empty">No news yet.</p>
            ) : (
              news.map((item) => (
                <div key={item.id} className="dashboard-list-item">
                  <div>
                    <p className="dashboard-list-title">{item.title}</p>
                    <p className="dashboard-list-subtitle">{item.category}</p>
                  </div>
                  <button onClick={() => handleDeleteNews(item.id)} className="dashboard-delete">Delete</button>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="dashboard-card">
          <div className="dashboard-card-title">
            <div>
              <h2>Categories</h2>
              <p>Manage homepage sections.</p>
            </div>
            <span className="dashboard-chip muted">{categories.length} total</span>
          </div>
          <div className="dashboard-row">
            <input className="dashboard-input" placeholder="Category name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
            <button type="button" onClick={handleCreateCategory} className="dashboard-button secondary">Add</button>
          </div>
          <div className="dashboard-list compact">
            {loadingCategories ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Spinner /> <span>Loading categories...</span></div>
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
                      <p className="dashboard-list-subtitle" style={{ fontSize: "12px", marginTop: "4px" }}>{t.category && `Category: ${t.category} • `}Status: {t.isActive ? "Active" : "Inactive"}</p>
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
