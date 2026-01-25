"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../../lib/firebase";

type NewsItem = {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  imageUrl?: string;
  published?: boolean;
  createdAt?: string;
};

type CategoryItem = {
  id: string;
  name: string;
  slug: string;
};

type TeamMember = {
  id: string;
  name: string;
  role: string;
  order: number;
  introduction?: string;
};

type PhotoCardTemplate = {
  id: string;
  name: string;
  description?: string;
  imageUrl: string;
  previewUrl?: string;
  category?: string;
  isActive: boolean;
};

const getDriveDirectLink = (url: string) => {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([^&]+)/);
  if (!match) return "";
  return `https://drive.google.com/uc?export=view&id=${match[1]}`;
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [photocardTemplates, setPhotocardTemplates] = useState<PhotoCardTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // Team member form state
  const [memberName, setMemberName] = useState("");
  const [memberRole, setMemberRole] = useState("");
  const [memberOrder, setMemberOrder] = useState<number>(0);
  const [memberIntroduction, setMemberIntroduction] = useState("");
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);

  // PhotoCard template form state
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

  const loadNews = async () => {
    const snapshot = await getDocs(
      query(collection(db, "news"), orderBy("createdAt", "desc"))
    );
    const items = snapshot.docs.map((docRef) => ({
      id: docRef.id,
      ...(docRef.data() as Omit<NewsItem, "id">),
    }));
    setNews(items);
  };

  const loadCategories = async () => {
    const snapshot = await getDocs(
      query(collection(db, "categories"), orderBy("name", "asc"))
    );
    const items = snapshot.docs.map((docRef) => ({
      id: docRef.id,
      ...(docRef.data() as Omit<CategoryItem, "id">),
    }));
    setCategories(items);
  };

  const loadTeamMembers = async () => {
    const snapshot = await getDocs(
      query(collection(db, "team"), orderBy("order", "asc"))
    );
    const items = snapshot.docs.map((docRef) => ({
      id: docRef.id,
      ...(docRef.data() as Omit<TeamMember, "id">),
    }));
    setTeamMembers(items);
  };

  const loadPhotocardTemplates = async () => {
    const snapshot = await getDocs(
      query(collection(db, "photocardTemplates"), orderBy("createdAt", "desc"))
    );
    const items = snapshot.docs.map((docRef) => ({
      id: docRef.id,
      ...(docRef.data() as Omit<PhotoCardTemplate, "id">),
    }));
    setPhotocardTemplates(items);
  };

  useEffect(() => {
    if (!auth.currentUser) {
      router.push("/admin/login");
      return;
    }
    loadNews().catch(() => setError("Failed to load news."));
    loadCategories().catch(() => setError("Failed to load categories."));
    loadTeamMembers().catch(() => setError("Failed to load team members."));
    loadPhotocardTemplates().catch(() => setError("Failed to load photocard templates."));
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/admin/login");
  };

  const handleCreateNews = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    if (!title.trim() || !summary.trim() || !content.trim() || !category.trim()) {
      setError("Title, summary, content, and category are required.");
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, "news"), {
        title: title.trim(),
        summary: summary.trim(),
        content: content.trim(),
        category: category.trim(),
        imageUrl: imageUrl.trim(),
        published: true,
        createdAt: serverTimestamp(),
      });
      setTitle("");
      setSummary("");
      setContent("");
      setCategory("");
      setImageUrl("");
      setImageFile(null);
      await loadNews();
    } catch (err: any) {
      setError(err?.message || "Failed to create news.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNews = async (id: string) => {
    await deleteDoc(doc(db, "news", id));
    await loadNews();
  };

  const handleCreateCategory = async () => {
    setError("");
    if (!categoryName.trim()) {
      setError("Category name is required.");
      return;
    }
    const slug = categoryName.trim().toLowerCase().replace(/\s+/g, "-");
    await addDoc(collection(db, "categories"), {
      name: categoryName.trim(),
      slug,
      createdAt: serverTimestamp(),
    });
    setCategoryName("");
    await loadCategories();
  };

  const handleDeleteCategory = async (id: string) => {
    await deleteDoc(doc(db, "categories", id));
    await loadCategories();
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
    window.open("https://drive.google.com/", "_blank", "noopener,noreferrer");
  };

  const handleUploadImage = async () => {
    if (!imageFile) {
      setError("Please choose an image to upload.");
      return;
    }
    setError("");
    setUploading(true);
    try {
      const safeName = imageFile.name.replace(/\s+/g, "-");
      const storageRef = ref(storage, `news/${Date.now()}-${safeName}`);
      await uploadBytes(storageRef, imageFile);
      const url = await getDownloadURL(storageRef);
      setImageUrl(url);
    } catch (err: any) {
      setError(err?.message || "Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  // Team member handlers
  const handleCreateTeamMember = async () => {
    setError("");
    if (!memberName.trim() || !memberRole.trim()) {
      setError("Name and role are required.");
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, "team"), {
        name: memberName.trim(),
        role: memberRole.trim(),
        order: memberOrder || teamMembers.length + 1,
        introduction: memberIntroduction.trim() || null,
        createdAt: serverTimestamp(),
      });
      setMemberName("");
      setMemberRole("");
      setMemberOrder(0);
      setMemberIntroduction("");
      await loadTeamMembers();
    } catch (err: any) {
      setError(err?.message || "Failed to create team member.");
    } finally {
      setLoading(false);
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
    setLoading(true);
    try {
      const memberRef = doc(db, "team", editingMemberId);
      await updateDoc(memberRef, {
        name: memberName.trim(),
        role: memberRole.trim(),
        order: memberOrder || 0,
        introduction: memberIntroduction.trim() || null,
        updatedAt: serverTimestamp(),
      });
      setEditingMemberId(null);
      setMemberName("");
      setMemberRole("");
      setMemberOrder(0);
      setMemberIntroduction("");
      await loadTeamMembers();
    } catch (err: any) {
      setError(err?.message || "Failed to update team member.");
    } finally {
      setLoading(false);
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
      await deleteDoc(doc(db, "team", id));
      await loadTeamMembers();
    } catch (err: any) {
      setError(err?.message || "Failed to delete team member.");
    }
  };

  // PhotoCard template handlers
  const handleUploadTemplateImage = async () => {
    if (!templateFile) {
      setError("Please choose an image to upload.");
      return;
    }
    setError("");
    setUploading(true);
    try {
      const safeName = templateFile.name.replace(/\s+/g, "-");
      const storageRef = ref(storage, `photocardTemplates/${Date.now()}-${safeName}`);
      await uploadBytes(storageRef, templateFile);
      const url = await getDownloadURL(storageRef);
      setTemplateImageUrl(url);
    } catch (err: any) {
      setError(err?.message || "Failed to upload template image.");
    } finally {
      setUploading(false);
    }
  };

  const handleUploadTemplatePreview = async () => {
    if (!templatePreviewFile) {
      setError("Please choose a preview image to upload.");
      return;
    }
    setError("");
    setUploading(true);
    try {
      const safeName = templatePreviewFile.name.replace(/\s+/g, "-");
      const storageRef = ref(storage, `photocardTemplates/previews/${Date.now()}-${safeName}`);
      await uploadBytes(storageRef, templatePreviewFile);
      const url = await getDownloadURL(storageRef);
      setTemplatePreviewUrl(url);
    } catch (err: any) {
      setError(err?.message || "Failed to upload preview image.");
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
    setLoading(true);
    try {
      await addDoc(collection(db, "photocardTemplates"), {
        name: templateName.trim(),
        description: templateDescription.trim() || null,
        imageUrl: templateImageUrl.trim(),
        previewUrl: templatePreviewUrl.trim() || templateImageUrl.trim(),
        category: templateCategory.trim() || null,
        isActive: true,
        createdAt: serverTimestamp(),
      });
      setTemplateName("");
      setTemplateDescription("");
      setTemplateImageUrl("");
      setTemplatePreviewUrl("");
      setTemplateCategory("");
      setTemplateFile(null);
      setTemplatePreviewFile(null);
      await loadPhotocardTemplates();
    } catch (err: any) {
      setError(err?.message || "Failed to create template.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditPhotocardTemplate = (template: PhotoCardTemplate) => {
    setEditingTemplateId(template.id);
    setTemplateName(template.name);
    setTemplateDescription(template.description || "");
    setTemplateImageUrl(template.imageUrl);
    setTemplatePreviewUrl(template.previewUrl || "");
    setTemplateCategory(template.category || "");
  };

  const handleUpdatePhotocardTemplate = async () => {
    if (!editingTemplateId) return;
    setError("");
    if (!templateName.trim() || !templateImageUrl.trim()) {
      setError("Name and image URL are required.");
      return;
    }
    setLoading(true);
    try {
      const templateRef = doc(db, "photocardTemplates", editingTemplateId);
      await updateDoc(templateRef, {
        name: templateName.trim(),
        description: templateDescription.trim() || null,
        imageUrl: templateImageUrl.trim(),
        previewUrl: templatePreviewUrl.trim() || templateImageUrl.trim(),
        category: templateCategory.trim() || null,
        updatedAt: serverTimestamp(),
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
    } catch (err: any) {
      setError(err?.message || "Failed to update template.");
    } finally {
      setLoading(false);
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
      await deleteDoc(doc(db, "photocardTemplates", id));
      await loadPhotocardTemplates();
    } catch (err: any) {
      setError(err?.message || "Failed to delete template.");
    }
  };

  const handleToggleTemplateActive = async (id: string, currentStatus: boolean) => {
    try {
      const templateRef = doc(db, "photocardTemplates", id);
      await updateDoc(templateRef, {
        isActive: !currentStatus,
        updatedAt: serverTimestamp(),
      });
      await loadPhotocardTemplates();
    } catch (err: any) {
      setError(err?.message || "Failed to update template status.");
    }
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="dashboard-shell">
          <div className="dashboard-brand">
            <img
              src="/sylhety-logo.jpeg"
              alt="Sylhety News"
              className="dashboard-logo"
            />
            <div>
              <h1 className="dashboard-title">Admin Dashboard</h1>
              <p className="dashboard-subtitle">
                Manage news, media, and categories
              </p>
            </div>
          </div>
          <button onClick={handleLogout} className="dashboard-logout">
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
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
              <input
                className="dashboard-input"
                placeholder="Title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
              <input
                className="dashboard-input"
                placeholder="Summary"
                value={summary}
                onChange={(event) => setSummary(event.target.value)}
              />
            </div>
            <textarea
              className="dashboard-textarea"
              placeholder="Content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
            <select
              className="dashboard-input"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="">Select category</option>
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="dashboard-media">
              <div className="dashboard-media-field">
                <input
                  className="dashboard-input"
                  placeholder="Image URL (optional)"
                  value={imageUrl}
                  onChange={(event) => setImageUrl(event.target.value)}
                />
                <div className="dashboard-links">
                  <button
                    type="button"
                    onClick={handleConvertDrive}
                    className="dashboard-link drive"
                  >
                    Convert Google Drive link
                  </button>
                  <a
                    href="https://postimages.org/"
                    target="_blank"
                    rel="noreferrer"
                    className="dashboard-link postimages"
                  >
                    Get URL from Postimages
                  </a>
                </div>
              </div>
              <div className="dashboard-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    setImageFile(event.target.files?.[0] || null)
                  }
                  className="dashboard-file"
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
            <button
              type="submit"
              disabled={loading}
              className="dashboard-button primary"
            >
              {loading ? "Saving..." : "Publish"}
            </button>
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
            {news.length === 0 ? (
              <p className="dashboard-empty">No news yet.</p>
            ) : (
              news.map((item) => (
                <div key={item.id} className="dashboard-list-item">
                  <div>
                    <p className="dashboard-list-title">{item.title}</p>
                    <p className="dashboard-list-subtitle">{item.category}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteNews(item.id)}
                    className="dashboard-delete"
                  >
                    Delete
                  </button>
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
            <input
              className="dashboard-input"
              placeholder="Category name"
              value={categoryName}
              onChange={(event) => setCategoryName(event.target.value)}
            />
            <button
              type="button"
              onClick={handleCreateCategory}
              className="dashboard-button secondary"
            >
              Add
            </button>
          </div>
          <div className="dashboard-list compact">
            {categories.length === 0 ? (
              <p className="dashboard-empty">No categories yet.</p>
            ) : (
              categories.map((item) => (
                <div key={item.id} className="dashboard-list-item">
                  <div>
                    <p className="dashboard-list-title">{item.name}</p>
                    <p className="dashboard-list-subtitle">{item.slug}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteCategory(item.id)}
                    className="dashboard-delete"
                  >
                    Delete
                  </button>
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
              <input
                className="dashboard-input"
                placeholder="Member Name"
                value={memberName}
                onChange={(event) => setMemberName(event.target.value)}
              />
              <input
                className="dashboard-input"
                placeholder="Role (e.g., সম্পাদক)"
                value={memberRole}
                onChange={(event) => setMemberRole(event.target.value)}
              />
              <input
                className="dashboard-input"
                type="number"
                placeholder="Order (display order)"
                value={memberOrder || ""}
                onChange={(event) => setMemberOrder(parseInt(event.target.value) || 0)}
              />
            </div>
            <textarea
              className="dashboard-textarea"
              placeholder="Introduction (optional - leave empty to remove)"
              value={memberIntroduction}
              onChange={(event) => setMemberIntroduction(event.target.value)}
              rows={3}
            />
            <div className="dashboard-row">
              {editingMemberId ? (
                <>
                  <button
                    type="button"
                    onClick={handleUpdateTeamMember}
                    disabled={loading}
                    className="dashboard-button primary"
                  >
                    {loading ? "Updating..." : "Update Member"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="dashboard-button secondary"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleCreateTeamMember}
                  disabled={loading}
                  className="dashboard-button primary"
                >
                  {loading ? "Adding..." : "Add Member"}
                </button>
              )}
            </div>
          </div>
          <div className="dashboard-list">
            {teamMembers.length === 0 ? (
              <p className="dashboard-empty">No team members yet.</p>
            ) : (
              teamMembers.map((member) => (
                <div key={member.id} className="dashboard-list-item">
                  <div>
                    <p className="dashboard-list-title">{member.name}</p>
                    <p className="dashboard-list-subtitle">{member.role}</p>
                    {member.introduction && (
                      <p className="dashboard-list-description" style={{ marginTop: "8px", fontSize: "14px", color: "#666" }}>
                        {member.introduction}
                      </p>
                    )}
                    <p className="dashboard-list-subtitle" style={{ fontSize: "12px", marginTop: "4px" }}>
                      Order: {member.order}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => handleEditTeamMember(member)}
                      className="dashboard-button secondary"
                      style={{ padding: "6px 12px", fontSize: "14px" }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTeamMember(member.id)}
                      className="dashboard-delete"
                    >
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
              <h2>PhotoCard Templates</h2>
              <p>Manage ready-made photocard templates for users to download.</p>
            </div>
            <span className="dashboard-chip muted">{photocardTemplates.length} templates</span>
          </div>
          <div className="dashboard-form">
            <div className="dashboard-grid">
              <input
                className="dashboard-input"
                placeholder="Template Name"
                value={templateName}
                onChange={(event) => setTemplateName(event.target.value)}
              />
              <input
                className="dashboard-input"
                placeholder="Category (optional)"
                value={templateCategory}
                onChange={(event) => setTemplateCategory(event.target.value)}
              />
            </div>
            <textarea
              className="dashboard-textarea"
              placeholder="Description (optional)"
              value={templateDescription}
              onChange={(event) => setTemplateDescription(event.target.value)}
              rows={2}
            />
            <div className="dashboard-media">
              <div className="dashboard-media-field">
                <input
                  className="dashboard-input"
                  placeholder="Template Image URL"
                  value={templateImageUrl}
                  onChange={(event) => setTemplateImageUrl(event.target.value)}
                />
                <div className="dashboard-upload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      setTemplateFile(event.target.files?.[0] || null)
                    }
                    className="dashboard-file"
                  />
                  <button
                    type="button"
                    onClick={handleUploadTemplateImage}
                    disabled={uploading || !templateFile}
                    className="dashboard-button secondary"
                  >
                    {uploading ? "Uploading..." : "Upload Template"}
                  </button>
                </div>
              </div>
              <div className="dashboard-media-field">
                <input
                  className="dashboard-input"
                  placeholder="Preview Image URL (optional)"
                  value={templatePreviewUrl}
                  onChange={(event) => setTemplatePreviewUrl(event.target.value)}
                />
                <div className="dashboard-upload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      setTemplatePreviewFile(event.target.files?.[0] || null)
                    }
                    className="dashboard-file"
                  />
                  <button
                    type="button"
                    onClick={handleUploadTemplatePreview}
                    disabled={uploading || !templatePreviewFile}
                    className="dashboard-button secondary"
                  >
                    {uploading ? "Uploading..." : "Upload Preview"}
                  </button>
                </div>
              </div>
            </div>
            <div className="dashboard-row">
              {editingTemplateId ? (
                <>
                  <button
                    type="button"
                    onClick={handleUpdatePhotocardTemplate}
                    disabled={loading}
                    className="dashboard-button primary"
                  >
                    {loading ? "Updating..." : "Update Template"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelTemplateEdit}
                    className="dashboard-button secondary"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleCreatePhotocardTemplate}
                  disabled={loading}
                  className="dashboard-button primary"
                >
                  {loading ? "Adding..." : "Add Template"}
                </button>
              )}
            </div>
          </div>
          <div className="dashboard-list">
            {photocardTemplates.length === 0 ? (
              <p className="dashboard-empty">No templates yet.</p>
            ) : (
              photocardTemplates.map((template) => (
                <div key={template.id} className="dashboard-list-item">
                  <div style={{ display: "flex", gap: "12px", alignItems: "center", flex: 1 }}>
                    {template.previewUrl && (
                      <img
                        src={template.previewUrl}
                        alt={template.name}
                        style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }}
                      />
                    )}
                    <div>
                      <p className="dashboard-list-title">{template.name}</p>
                      {template.description && (
                        <p className="dashboard-list-subtitle">{template.description}</p>
                      )}
                      <p className="dashboard-list-subtitle" style={{ fontSize: "12px", marginTop: "4px" }}>
                        {template.category && `Category: ${template.category} • `}
                        Status: {template.isActive ? "Active" : "Inactive"}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => handleToggleTemplateActive(template.id, template.isActive)}
                      className="dashboard-button secondary"
                      style={{ padding: "6px 12px", fontSize: "14px" }}
                    >
                      {template.isActive ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      onClick={() => handleEditPhotocardTemplate(template)}
                      className="dashboard-button secondary"
                      style={{ padding: "6px 12px", fontSize: "14px" }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePhotocardTemplate(template.id)}
                      className="dashboard-delete"
                    >
                      Delete
                    </button>
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
