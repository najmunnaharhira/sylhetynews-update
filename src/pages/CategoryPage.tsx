import { useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ArticleCard from "@/components/news/ArticleCard";
import FacebookEmbed from "@/components/news/FacebookEmbed";
import TrendingWidget from "@/components/news/TrendingWidget";
import NewsletterSignup from "@/components/news/NewsletterSignup";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { useArticlesByCategory, useCategories } from "@/hooks/useArticles";
import { useI18n } from "@/contexts/I18nContext";
import { Skeleton } from "@/components/ui/skeleton";

const PAGE_SIZE = 10;

const CategoryPage = () => {
  const location = useLocation();
  const slug = location.pathname.replace("/", "") || "cumilla";
  const { lang, t } = useI18n();
  const [page, setPage] = useState(0);
  const { data: cats = [] } = useCategories();
  const { data, isLoading } = useArticlesByCategory(slug, page, PAGE_SIZE);
  const cat = cats.find((c) => c.slug === slug);
  const title = cat ? (lang === "en" ? cat.name_en : cat.name_bn) : slug;
  const totalPages = data ? Math.max(1, Math.ceil(data.count / PAGE_SIZE)) : 1;

  return (
    <Layout>
      <Seo title={`${title} | ${lang === "en" ? "Cumilla News" : "কুমিল্লা নিউজ"}`} description={t("siteTagline")} />
      <div className="container mx-auto px-4 py-6">
        <h1 className="section-title text-2xl mb-6">{title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {isLoading && <div className="space-y-4">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-40 w-full" />)}</div>}
            {!isLoading && data?.items.length === 0 && (
              <div className="bg-card border border-news-border rounded-sm p-8 text-center">
                <p className="text-news-subtext font-bengali">{t("noArticles")}</p>
              </div>
            )}
            {!isLoading && (data?.items.length || 0) > 0 && (
              <>
                <div className="space-y-4">
                  {data!.items.map((news) => <ArticleCard key={news.id} news={news} variant="horizontal" />)}
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-6">
                    <Button variant="outline" disabled={page === 0} onClick={() => setPage((p) => Math.max(0, p - 1))}>‹</Button>
                    <span className="font-bengali text-sm">{page + 1} / {totalPages}</span>
                    <Button variant="outline" disabled={page + 1 >= totalPages} onClick={() => setPage((p) => p + 1)}>›</Button>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-20 space-y-6">
              <TrendingWidget />
              <NewsletterSignup />
              <FacebookEmbed />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
