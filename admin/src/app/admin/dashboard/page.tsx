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

const getDriveDirectLink = (url: string) => {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([^&]+)/);
  if (!match) return "";
  return `https://drive.google.com/uc?export=view&id=${match[1]}`;
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
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

  useEffect(() => {
    if (!auth.currentUser) {
      router.push("/admin/login");
      return;
    }
    loadNews().catch(() => setError("Failed to load news."));
    loadCategories().catch(() => setError("Failed to load categories."));
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
      </main>
    </div>
  );
}
