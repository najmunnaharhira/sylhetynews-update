import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Article } from "@/types/article";
import ArticleCard from "./ArticleCard";
import { useI18n } from "@/contexts/I18nContext";

interface Props {
  categoryId: string | null;
  excludeId: string;
}

const RelatedArticles = ({ categoryId, excludeId }: Props) => {
  const { lang } = useI18n();
  const { data = [] } = useQuery({
    queryKey: ["related", categoryId, excludeId],
    enabled: !!categoryId,
    queryFn: async (): Promise<Article[]> => {
      const { data, error } = await supabase
        .from("articles")
        .select(
          "id, slug, title_bn, title_en, summary, image_url, published_at, views, category:categories(slug, name_bn, name_en)",
        )
        .eq("published", true)
        .eq("category_id", categoryId!)
        .neq("id", excludeId)
        .order("published_at", { ascending: false })
        .limit(4);
      if (error) throw error;
      return (data || []) as unknown as Article[];
    },
  });

  if (!data.length) return null;

  return (
    <section className="mt-8" aria-labelledby="related-heading">
      <h2 id="related-heading" className="section-title mb-4">
        {lang === "en" ? "Related News" : "সম্পর্কিত সংবাদ"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.map((a) => (
          <ArticleCard key={a.id} news={a} variant="horizontal" />
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;
