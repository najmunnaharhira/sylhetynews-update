import { useEffect, useState } from "react";
import { Edit2, Eye, EyeOff, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Article } from "@/types/article";
import AdminNewsForm from "./AdminNewsForm";

export default function AdminNewsList() {
  const [items, setItems] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Article | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("articles")
      .select("*, category:categories(slug, name_bn, name_en)")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setItems((data as Article[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const togglePublish = async (a: Article) => {
    const { error } = await supabase.from("articles").update({ published: !a.published }).eq("id", a.id);
    if (error) toast.error(error.message);
    else load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete article?")) return;
    const { error } = await supabase.from("articles").delete().eq("id", id);
    if (error) toast.error(error.message);
    else load();
  };

  if (loading) return <div className="text-center py-8"><Loader2 className="w-5 h-5 animate-spin inline" /></div>;

  if (editing) {
    return (
      <div>
        <h3 className="font-bold mb-3">Edit article</h3>
        <AdminNewsForm article={editing} onSuccess={() => { setEditing(null); load(); }} />
      </div>
    );
  }

  if (!items.length) return <div className="text-center py-8 text-news-subtext">No articles yet.</div>;

  return (
    <div className="space-y-3">
      {items.map((a) => (
        <Card key={a.id} className="p-3 flex gap-3">
          {a.image_url && <img src={a.image_url} alt="" className="w-20 h-20 object-cover rounded" />}
          <div className="flex-1 min-w-0">
            <h4 className="font-bengali font-semibold truncate">{a.title_bn}</h4>
            {a.summary && <p className="text-sm text-news-subtext line-clamp-2">{a.summary}</p>}
            <div className="flex flex-wrap gap-2 mt-1 text-xs">
              {a.category && <span className="bg-muted px-2 py-0.5 rounded">{a.category.name_bn}</span>}
              {a.featured && <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">Featured</span>}
              <span className="text-news-subtext">{a.views} views</span>
            </div>
          </div>
          <div className="flex gap-1">
            <Button size="icon" variant="ghost" onClick={() => togglePublish(a)} title={a.published ? "Unpublish" : "Publish"}>
              {a.published ? <Eye className="w-4 h-4 text-green-600" /> : <EyeOff className="w-4 h-4 text-news-subtext" />}
            </Button>
            <Button size="icon" variant="ghost" onClick={() => setEditing(a)}><Edit2 className="w-4 h-4" /></Button>
            <Button size="icon" variant="ghost" onClick={() => remove(a.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
