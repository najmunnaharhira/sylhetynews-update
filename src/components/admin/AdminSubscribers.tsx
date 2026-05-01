import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function AdminSubscribers() {
  const [items, setItems] = useState<{ id: string; email: string; created_at: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("newsletter_subscribers")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setItems((data as any) || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-6"><Loader2 className="w-5 h-5 animate-spin inline" /></div>;

  return (
    <div>
      <h2 className="text-lg font-bold mb-3">Newsletter subscribers ({items.length})</h2>
      {!items.length && <p className="text-sm text-news-subtext">No subscribers yet.</p>}
      <ul className="divide-y divide-news-border">
        {items.map((s) => (
          <li key={s.id} className="py-2 flex justify-between text-sm">
            <span>{s.email}</span>
            <span className="text-news-subtext">{new Date(s.created_at).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
