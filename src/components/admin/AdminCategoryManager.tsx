import { useEffect, useState } from "react";
import { Edit2, Trash2, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { slugify } from "@/lib/format";
import type { CategoryRow } from "@/types/article";

export default function AdminCategoryManager() {
  const [items, setItems] = useState<CategoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<CategoryRow | null>(null);
  const [form, setForm] = useState({ name_bn: "", name_en: "", slug: "", sort_order: 0 });

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("categories").select("*").order("sort_order");
    setItems((data as CategoryRow[]) || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name_bn) return toast.error("Name (Bangla) required");
    const payload = { ...form, slug: form.slug || slugify(form.name_en || form.name_bn) };
    const { error } = editing
      ? await supabase.from("categories").update(payload).eq("id", editing.id)
      : await supabase.from("categories").insert(payload);
    if (error) return toast.error(error.message);
    toast.success(editing ? "Updated" : "Created");
    setForm({ name_bn: "", name_en: "", slug: "", sort_order: 0 });
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete category?")) return;
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) toast.error(error.message);
    else load();
  };

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <h3 className="font-bold mb-3">{editing ? "Edit category" : "Add category"}</h3>
        <form onSubmit={submit} className="grid md:grid-cols-4 gap-2">
          <Input placeholder="বাংলা নাম" value={form.name_bn} onChange={(e) => setForm({ ...form, name_bn: e.target.value })} />
          <Input placeholder="English name" value={form.name_en} onChange={(e) => setForm({ ...form, name_en: e.target.value })} />
          <Input placeholder="slug (auto)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          <Input type="number" placeholder="Sort" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} />
          <div className="md:col-span-4 flex gap-2">
            <Button type="submit">{editing ? "Update" : "Add"}</Button>
            {editing && <Button type="button" variant="outline" onClick={() => { setEditing(null); setForm({ name_bn: "", name_en: "", slug: "", sort_order: 0 }); }}>Cancel</Button>}
          </div>
        </form>
      </Card>

      {loading ? (
        <div className="text-center py-6"><Loader2 className="w-5 h-5 animate-spin inline" /></div>
      ) : (
        <div className="grid gap-2">
          {items.map((c) => (
            <Card key={c.id} className="p-3 flex justify-between items-center">
              <div>
                <div className="font-bengali font-semibold">{c.name_bn} <span className="text-sm text-news-subtext">/ {c.name_en}</span></div>
                <div className="text-xs text-news-subtext">/{c.slug} · order {c.sort_order}</div>
              </div>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" onClick={() => { setEditing(c); setForm({ name_bn: c.name_bn, name_en: c.name_en, slug: c.slug, sort_order: c.sort_order }); }}><Edit2 className="w-4 h-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => remove(c.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
