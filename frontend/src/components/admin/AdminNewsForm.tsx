import { AlertCircle, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NewsArticle, NewsCategory } from "../../types/news";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { sylhetDistricts } from "@/data/districts";

import {
  newsService,
  imageService,
  categoryService,
  api,
} from "../../services/dataService";

interface AdminNewsFormProps {
  news?: NewsArticle;
  onSuccess?: () => void;
}

type NewsFormData = {
  title: string;
  content: string;
  summary: string;
  category: string;
  district: string;
  author: string;
  featured: boolean;
  tags: string;
  published: boolean;
};

export default function AdminNewsForm({ news, onSuccess }: AdminNewsFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NewsFormData>({
    defaultValues: news
      ? {
          title: news.title ?? "",
          content: news.content ?? "",
          summary: news.summary ?? "",
          category: news.category ?? "",
          district: news.district ?? "",
          author: news.author ?? "",
          featured: news.featured ?? false,
          tags: (news.tags ?? []).join(", "),
          published: news.published ?? false,
        }
      : {
          title: "",
          content: "",
          summary: "",
          category: "",
          district: "",
          author: "",
          featured: false,
          tags: "",
          published: true,
        },
  });

  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(
    news?.imageUrl || ""
  );
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>(
    news?.imageUrl || ""
  );
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const cats = await categoryService.getAllCategories();
      setCategories(cats);
    } catch (err) {
      console.error("Error loading categories:", err);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadImage = async () => {
    if (!image) {
      setError("Please select an image first");
      return;
    }
    try {
      setError("");
      setUploading(true);
      const url = await imageService.uploadImage(image, "news");
      setUploadedImageUrl(url);
      setSuccess("Image uploaded successfully!");
      setImage(null);
      // Keep preview but mark as uploaded
      setTimeout(() => setSuccess(""), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: NewsFormData) => {
    try {
      setError("");
      setSuccess("");
      setLoading(true);

      // Use the uploaded image URL, or upload if still pending
      let finalImageUrl = uploadedImageUrl;
      if (image && !uploadedImageUrl) {
        finalImageUrl = await imageService.uploadImage(image, "news");
      }

      if (!news?.id && !finalImageUrl) {
        throw new Error("Image upload is mandatory. Please upload a news image first.");
      }

      const articleData = {
        title: data.title,
        content: data.content,
        summary: data.summary,
        category: data.category,
        district: data.district || undefined,
        author: data.author || undefined,
        imageUrl: finalImageUrl || undefined,
        featured: data.featured,
        tags: data.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        published: data.published,
      };

      if (news?.id) {
        // Update existing
        await newsService.updateNews(news.id, articleData);
        setSuccess("Article updated successfully!");
      } else {
        // Create new
        await newsService.createNews(articleData);
        setSuccess("Article created successfully!");
      }

      setTimeout(() => {
        onSuccess?.();
      }, 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error saving article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-white">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-2">
            <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700">{success}</p>
          </div>
        )}

        {/* Featured Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Featured Image
          </label>
          <div className="space-y-3">
            {imagePreview && (
              <div className="relative w-48 h-32 bg-gray-100 rounded-lg overflow-hidden border-2 border-indigo-200">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                {uploadedImageUrl && (
                  <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">✓ Uploaded</span>
                  </div>
                )}
                <button
                  type="button"
                  aria-label="Remove selected image"
                  title="Remove selected image"
                  onClick={() => {
                    setImage(null);
                    setImagePreview(news?.imageUrl || "");
                    setUploadedImageUrl(news?.imageUrl || "");
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded hover:bg-red-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            )}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-indigo-500 transition-colors">
              <Upload className="mx-auto text-gray-400 mb-2" size={24} />
              <p className="text-sm text-gray-600 mb-3">
                {image ? "Click to change image" : "Click to select image"}
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-input"
              />
              <label htmlFor="image-input" className="cursor-pointer">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("image-input")?.click();
                  }}
                >
                  {image ? "Change Image" : "Select Image"}
                </Button>
              </label>
            </div>
            {image && !uploadedImageUrl && (
              <Button
                type="button"
                onClick={handleUploadImage}
                disabled={uploading || !image}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {uploading ? "Uploading to Firebase..." : "Upload Image to Firebase"}
              </Button>
            )}
            {uploadedImageUrl && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-sm font-medium">✓ Image ready for article</p>
              </div>
            )}
            {!news?.id && !uploadedImageUrl && (
              <p className="text-xs text-red-600">Image is mandatory for new articles.</p>
            )}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <Input
            {...register("title", { required: "Title is required" })}
            placeholder="Article title"
            className="w-full"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Summary */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Summary *
          </label>
          <textarea
            {...register("summary", { required: "Summary is required" })}
            placeholder="Brief summary (shown in listings)"
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.summary && (
            <p className="text-red-500 text-sm mt-1">
              {errors.summary.message}
            </p>
          )}
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content *
          </label>
          <textarea
            {...register("content", { required: "Content is required" })}
            placeholder="Full article content"
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">
              {errors.content.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* District */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            District
          </label>
          <select
            {...register("district")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select a district</option>
            {sylhetDistricts.map((district) => (
              <option key={district.id} value={district.nameEn}>
                {district.nameBn}
              </option>
            ))}
          </select>
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Author
          </label>
          <Input
            {...register("author")}
            placeholder="Author name"
            className="w-full"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags
          </label>
          <Input
            {...register("tags")}
            placeholder="tag1, tag2, tag3"
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1">
            Separate tags with commas
          </p>
        </div>

        {/* Checkboxes */}
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("featured")}
              className="rounded border-gray-300"
            />
            <span className="text-sm font-medium text-gray-700">
              Featured Article
            </span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("published")}
              className="rounded border-gray-300"
            />
            <span className="text-sm font-medium text-gray-700">Published</span>
          </label>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            disabled={loading || uploading}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700"
          >
            {loading ? "Saving..." : news ? "Update Article" : "Create Article"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => onSuccess?.()}
            className="flex-1"
            disabled={loading || uploading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
