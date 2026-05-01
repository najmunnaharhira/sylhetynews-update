import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Article, CategoryRow } from "@/types/article";

const ARTICLE_SELECT = `
  id, slug, title_bn, title_en, summary, content, category_id, image_url,
  author, tags, featured, published, views, published_at, created_at, updated_at,
  category:categories(slug, name_bn, name_en)
`;

export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: async (): Promise<CategoryRow[]> => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data as CategoryRow[];
    },
  });

export const useFeaturedArticle = () =>
  useQuery({
    queryKey: ["articles", "featured"],
    queryFn: async (): Promise<Article | null> => {
      const { data, error } = await supabase
        .from("articles")
        .select(ARTICLE_SELECT)
        .eq("published", true)
        .eq("featured", true)
        .order("published_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data as Article | null;
    },
  });

export const useLatestArticles = (limit = 6) =>
  useQuery({
    queryKey: ["articles", "latest", limit],
    queryFn: async (): Promise<Article[]> => {
      const { data, error } = await supabase
        .from("articles")
        .select(ARTICLE_SELECT)
        .eq("published", true)
        .order("published_at", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return (data || []) as Article[];
    },
  });

export const useTrendingArticles = (limit = 5) =>
  useQuery({
    queryKey: ["articles", "trending", limit],
    queryFn: async (): Promise<Article[]> => {
      const { data, error } = await supabase
        .from("articles")
        .select(ARTICLE_SELECT)
        .eq("published", true)
        .order("views", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return (data || []) as Article[];
    },
  });

export const useArticlesByCategory = (slug: string | undefined, page = 0, pageSize = 10) =>
  useQuery({
    queryKey: ["articles", "category", slug, page, pageSize],
    enabled: !!slug,
    queryFn: async (): Promise<{ items: Article[]; count: number }> => {
      const from = page * pageSize;
      const to = from + pageSize - 1;
      const { data, error, count } = await supabase
        .from("articles")
        .select(`${ARTICLE_SELECT}, categories!inner(slug)`, { count: "exact" })
        .eq("published", true)
        .eq("categories.slug", slug!)
        .order("published_at", { ascending: false })
        .range(from, to);
      if (error) throw error;
      return { items: (data || []) as Article[], count: count || 0 };
    },
  });

export const useArticleBySlug = (slug: string | undefined) =>
  useQuery({
    queryKey: ["article", slug],
    enabled: !!slug,
    queryFn: async (): Promise<Article | null> => {
      const { data, error } = await supabase
        .from("articles")
        .select(ARTICLE_SELECT)
        .eq("slug", slug!)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      return data as Article | null;
    },
  });

export const useSearchArticles = (q: string) =>
  useQuery({
    queryKey: ["articles", "search", q],
    enabled: q.trim().length > 1,
    queryFn: async (): Promise<Article[]> => {
      const term = `%${q.trim()}%`;
      const { data, error } = await supabase
        .from("articles")
        .select(ARTICLE_SELECT)
        .eq("published", true)
        .or(`title_bn.ilike.${term},title_en.ilike.${term},summary.ilike.${term},content.ilike.${term}`)
        .order("published_at", { ascending: false })
        .limit(15);
      if (error) throw error;
      return (data || []) as Article[];
    },
  });

export const incrementViews = async (slug: string) => {
  await supabase.rpc("increment_article_views", { _slug: slug });
};
