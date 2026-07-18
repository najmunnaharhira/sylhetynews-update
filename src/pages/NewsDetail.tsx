import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, User, ArrowLeft, Share2, Eye, Clock } from "lucide-react";
import Layout from "@/components/layout/Layout";
import LatestNewsSidebar from "@/components/news/LatestNewsSidebar";
import TrendingWidget from "@/components/news/TrendingWidget";
import Comments from "@/components/news/Comments";
import RelatedArticles from "@/components/news/RelatedArticles";
import AdSlot from "@/components/AdSlot";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { useArticleBySlug, useLatestArticles, incrementViews } from "@/hooks/useArticles";
import { useI18n } from "@/contexts/I18nContext";
import { formatDate, readingTime, banglaDigits } from "@/lib/format";
import { Skeleton } from "@/components/ui/skeleton";

const NewsDetail = () => {
  const { id: slug } = useParams<{ id: string }>();
  const { lang, t } = useI18n();
  const { data: news, isLoading } = useArticleBySlug(slug);
  const { data: latest = [] } = useLatestArticles(5);

  useEffect(() => {
    if (slug && news) incrementViews(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, news?.id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-6 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
          <Skeleton className="h-96" />
        </div>
      </Layout>
    );
  }

  if (!news) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bengali font-bold mb-4">{t("noResults")}</h1>
          <Link to="/" className="text-primary hover:underline font-bengali">{t("backHome")}</Link>
        </div>
      </Layout>
    );
  }

  const title = lang === "en" && news.title_en ? news.title_en : news.title_bn;
  const cat = lang === "en" ? news.category?.name_en : news.category?.name_bn;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title, text: news.summary || "", url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    image: news.image_url ? [news.image_url] : undefined,
    datePublished: news.published_at,
    dateModified: news.updated_at,
    author: news.author ? [{ "@type": "Person", name: news.author }] : undefined,
    publisher: {
      "@type": "Organization",
      name: "Sylhety News",
    },
    description: news.summary || undefined,
    articleSection: cat,
  };

  return (
    <Layout>
      <Seo
        title={`${title} | ${lang === "en" ? "Sylhety News" : "সিলেটি নিউজ"}`}
        description={news.summary || title}
        image={news.image_url || undefined}
        type="article"
        jsonLd={jsonLd}
      />
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <article className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-1 text-sm text-primary mb-4 hover:underline font-bengali">
              <ArrowLeft className="w-4 h-4" />
              {t("backHome")}
            </Link>

            <div className="bg-card border border-news-border rounded-sm overflow-hidden">
              {news.image_url && (
                <img src={news.image_url} alt={title} className="w-full h-64 md:h-96 object-cover" />
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  {cat && <span className="news-category-tag">{cat}</span>}
                </div>

                <h1 className="news-headline text-2xl md:text-3xl mb-4">{title}</h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-news-subtext mb-6 pb-6 border-b border-news-border">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{formatDate(news.published_at, lang)}</span>
                  {news.author && <span className="flex items-center gap-1"><User className="w-4 h-4" />{news.author}</span>}
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{readingTime(news.content, lang)} {t("minRead")}</span>
                  <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{lang === "bn" ? banglaDigits(news.views) : news.views}</span>
                  <Button variant="ghost" size="sm" onClick={handleShare} className="ml-auto">
                    <Share2 className="w-4 h-4 mr-1" />{t("share")}
                  </Button>
                </div>

                <div className="prose prose-lg max-w-none font-bengali">
                  {news.summary && <p className="text-foreground leading-relaxed text-lg font-medium mb-4">{news.summary}</p>}
                  {news.content.split(/\n+/).map((p, i) => (
                    <p key={i} className="text-foreground leading-relaxed mt-4">{p}</p>
                  ))}
                </div>
              </div>
            </div>

            <AdSlot size="leaderboard" className="my-6" />

            <RelatedArticles categoryId={news.category_id} excludeId={news.id} />

            <Comments articleId={news.id} />
          </article>

          <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-20 space-y-6">
              <AdSlot size="rectangle" />
              <TrendingWidget />
              <LatestNewsSidebar news={latest} />
              <AdSlot size="rectangle" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewsDetail;
