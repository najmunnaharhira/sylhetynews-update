import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, Send, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useI18n } from "@/contexts/I18nContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { z } from "zod";
import type { CommentRow } from "@/types/article";
import { formatDate } from "@/lib/format";

const Comments = ({ articleId }: { articleId: string }) => {
  const { user, isAdmin } = useAuth();
  const { t, lang } = useI18n();
  const [comments, setComments] = useState<CommentRow[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("comments")
      .select("*, profile:profiles!comments_user_id_fkey(display_name, avatar_url)")
      .eq("article_id", articleId)
      .eq("approved", true)
      .order("created_at", { ascending: false });
    setComments((data as any) || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [articleId]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const parsed = z.string().trim().min(1).max(2000).safeParse(content);
    if (!parsed.success) return;
    setPosting(true);
    const { error } = await supabase
      .from("comments")
      .insert({ article_id: articleId, user_id: user.id, content: parsed.data });
    setPosting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setContent("");
    load();
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("comments").delete().eq("id", id);
    if (error) toast.error(error.message);
    else load();
  };

  return (
    <section className="mt-8 bg-card border border-news-border rounded-sm p-5">
      <h3 className="font-bengali font-bold text-lg mb-4">
        {t("comments")} ({comments.length})
      </h3>

      {user ? (
        <form onSubmit={submit} className="mb-6 space-y-2">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t("writeComment")}
            rows={3}
            maxLength={2000}
            required
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={posting || !content.trim()}>
              {posting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
              {t("postComment")}
            </Button>
          </div>
        </form>
      ) : (
        <div className="mb-6 p-4 bg-muted rounded-sm text-center">
          <Link to="/admin/login" className="text-primary font-bengali hover:underline">
            {t("loginToComment")}
          </Link>
        </div>
      )}

      {loading ? (
        <div className="text-center py-6 text-news-subtext"><Loader2 className="w-5 h-5 animate-spin inline" /></div>
      ) : (
        <ul className="space-y-4">
          {comments.map((c) => (
            <li key={c.id} className="border-b border-news-border pb-3 last:border-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bengali font-semibold text-sm">
                      {c.profile?.display_name || "User"}
                    </span>
                    <span className="text-xs text-news-subtext">{formatDate(c.created_at, lang)}</span>
                  </div>
                  <p className="text-sm font-bengali text-news-body whitespace-pre-wrap break-words">{c.content}</p>
                </div>
                {(isAdmin || user?.id === c.user_id) && (
                  <Button variant="ghost" size="icon" onClick={() => remove(c.id)} aria-label="Delete">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                )}
              </div>
            </li>
          ))}
          {!comments.length && (
            <li className="text-sm text-news-subtext font-bengali text-center py-4">—</li>
          )}
        </ul>
      )}
    </section>
  );
};

export default Comments;
