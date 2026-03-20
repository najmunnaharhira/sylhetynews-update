import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { getAdminToken } from "../../config/api";

interface Photocard {
  id: string;
  title: string;
  imageUrl: string;
}


import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { X, Upload, Image as ImageIcon } from "lucide-react";

const AdminPhotocardManager = () => {
  const [photocards, setPhotocards] = useState<Photocard[]>([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchPhotocards();
  }, []);

  const fetchPhotocards = async () => {
    try {
      const token = getAdminToken();
      const res = await fetch("http://localhost:5000/api/photocards", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch photocards");
      setPhotocards(await res.json());
    } catch (err: any) {
      setError(err.message || "Failed to load photocards");
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setPreview(URL.createObjectURL(e.dataTransfer.files[0]));
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this photocard?")) return;
    try {
      const token = getAdminToken();
      const res = await fetch(`http://localhost:5000/api/photocards/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete photocard");
      setPhotocards((prev) => prev.filter((c) => c.id !== id));
    } catch (err: any) {
      setError(err.message || "Failed to delete photocard");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setUploading(true);
    try {
      if (!file) throw new Error("Please select a file");
      const token = getAdminToken();
      const formData = new FormData();
      formData.append("title", title);
      formData.append("image", file);
      const res = await fetch("http://localhost:5000/api/photocards", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      } as any);
      if (!res.ok) throw new Error("Failed to upload photocard");
      setMessage("Photocard uploaded successfully");
      setTitle("");
      setFile(null);
      setPreview("");
      fetchPhotocards();
    } catch (err: any) {
      setError(err.message || "Failed to upload photocard");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="p-6 bg-white">
      <h2 className="text-xl font-bold mb-4">Photocard Manager</h2>
      <form onSubmit={handleSubmit} className="mb-6 flex flex-col md:flex-row gap-4 items-center">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Photocard Title"
          required
          disabled={uploading}
          className="flex-1"
        />
        <div
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-indigo-500 transition-colors bg-gray-50"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {preview ? (
            <div className="relative w-24 h-24 mb-2">
              <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
              <button
                type="button"
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                onClick={() => { setFile(null); setPreview(""); }}
                aria-label="Remove image"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <>
              <ImageIcon className="text-gray-400 mb-2" size={32} />
              <span className="text-xs text-gray-500">Drag & drop or click to select</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="photocard-image-input"
                disabled={uploading}
              />
              <label htmlFor="photocard-image-input" className="cursor-pointer text-indigo-600 hover:underline mt-1">Browse</label>
            </>
          )}
        </div>
        <Button type="submit" disabled={uploading || !file} className="bg-indigo-600 hover:bg-indigo-700">
          {uploading ? "Uploading..." : <><Upload size={16} className="inline mr-1" /> Upload</>}
        </Button>
      </form>
      {message && <div className="p-2 bg-green-50 border border-green-200 rounded mb-2 text-green-700">{message}</div>}
      {error && <div className="p-2 bg-red-50 border border-red-200 rounded mb-2 text-red-700">{error}</div>}
      <h3 className="text-lg font-semibold mb-2">All Photocards</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {photocards.length === 0 ? (
          <div className="col-span-full text-gray-400 text-center py-8">No photocards yet.</div>
        ) : (
          photocards.map((card) => (
            <div key={card.id} className="relative group border rounded-lg p-2 bg-gray-50 hover:shadow-lg transition">
              <img src={card.imageUrl} alt={card.title} className="w-full h-32 object-cover rounded-md mb-2" />
              <div className="font-medium text-sm mb-1 truncate">{card.title}</div>
              <button
                type="button"
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                onClick={() => handleDelete(card.id)}
                aria-label="Delete photocard"
              >
                <X size={14} />
              </button>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default AdminPhotocardManager;
