import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { slugify } from "@/lib/format";
import type { Article, CategoryRow } from "@/types/article";

interface Props {
  article?: Article;
  onSuccess?: () => void;
}

interface FormValues {
  title_bn: string;
  title_en: string;
  slug: string;
  summary: string;
  content: string;
  category_id: string;
  author: string;
  tags: string;
  featured: boolean;
  published: boolean;
  image_url: string;
}

export default function AdminNewsForm({ article, onSuccess }: Props) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      title_bn: article?.title_bn || "",
      title_en: article?.title_en || "",
      slug: article?.slug || "",
      summary: article?.summary || "",
      content: article?.content || "",
      category_id: article?.category_id || "",
      author: article?.author || "",
      tags: (article?.tags || []).join(", "),
      featured: article?.featured || false,
      published: article?.published ?? true,
      image_url: article?.image_url || "",
    },
  });
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const imgUrl = watch("image_url");
  const titleBn = watch("title_bn");

  useEffect(() => {
    supabase.from("categories").select("*").order("sort_order").then(({ data }) => setCategories((data as CategoryRow[]) || []));
  }, []);

  useEffect(() => {
    if (!article && titleBn && !watch("slug")) {
      setValue("slug", slugify(titleBn));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [titleBn]);

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `news/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("article-images").upload(path, file, { upsert: false });
    if (error) {
      toast.error(error.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("article-images").getPublicUrl(path);
    setValue("image_url", data.publicUrl);
    setUploading(false);
  };

  const onSubmit = async (v: FormValues) => {
    setLoading(true);
    const payload = {
      title_bn: v.title_bn,
      title_en: v.title_en || null,
      slug: v.slug || slugify(v.title_bn),
      summary: v.summary || null,
      content: v.content,
      category_id: v.category_id || null,
      author: v.author || null,
      tags: v.tags ? v.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      featured: v.featured,
      published: v.published,
      image_url: v.image_url || null,
    };
    const { error } = article
      ? await supabase.from("articles").update(payload).eq("id", article.id)
      : await supabase.from("articles").insert(payload);
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(article ? "Updated" : "Created");
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium block mb-1">Title (Bangla) *</label>
          <Input {...register("title_bn", { required: true, maxLength: 500 })} />
          {errors.title_bn && <p className="text-xs text-destructive">Required</p>}
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Title (English)</label>
          <Input {...register("title_en", { maxLength: 500 })} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium block mb-1">Slug</label>
          <Input {...register("slug", { maxLength: 120 })} placeholder="auto-generated" />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Category</label>
          <select {...register("category_id")} className="w-full h-10 border border-input bg-background rounded-md px-3 text-sm">
            <option value="">—</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name_bn} / {c.name_en}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium block mb-1">Summary</label>
        <textarea {...register("summary", { maxLength: 500 })} rows={2} className="w-full border border-input bg-background rounded-md px-3 py-2 text-sm" />
      </div>

      <div>
        <label className="text-sm font-medium block mb-1">Content *</label>
        <textarea {...register("content", { required: true })} rows={10} className="w-full border border-input bg-background rounded-md px-3 py-2 text-sm font-bengali" />
        {errors.content && <p className="text-xs text-destructive">Required</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium block mb-1">Author</label>
          <Input {...register("author", { maxLength: 100 })} />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Tags (comma-separated)</label>
          <Input {...register("tags")} placeholder="sylhet, bangladesh" />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium block mb-1">Image</label>
        <div className="flex items-center gap-3">
          {imgUrl && <img src={imgUrl} alt="" className="w-24 h-16 object-cover rounded border" />}
          <label className="cursor-pointer flex items-center gap-2 text-sm border border-dashed border-news-border rounded-md px-3 py-2 hover:bg-muted">
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            Upload
            <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
          </label>
          <Input {...register("image_url")} placeholder="or paste image URL" className="flex-1" />
        </div>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register("featured")} /> Featured
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register("published")} /> Published
        </label>
      </div>

      <div className="flex gap-2 pt-2">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {article ? "Update" : "Create"}
        </Button>
        {onSuccess && <Button type="button" variant="outline" onClick={onSuccess} className="flex-1">Cancel</Button>}
      </div>
    </form>
  );
}
