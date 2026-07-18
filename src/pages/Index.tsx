import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import LeadNews from "@/components/news/LeadNews";
import TopStories from "@/components/news/TopStories";
import SylhetSpecial from "@/components/news/SylhetSpecial";
import LatestNewsSidebar from "@/components/news/LatestNewsSidebar";
import FacebookEmbed from "@/components/news/FacebookEmbed";
import WeatherWidget from "@/components/news/WeatherWidget";
import CategorySection from "@/components/news/CategorySection";
import TrendingWidget from "@/components/news/TrendingWidget";
import NewsletterSignup from "@/components/news/NewsletterSignup";
import AdSlot from "@/components/AdSlot";
import Seo from "@/components/Seo";
import { useFeaturedArticle, useLatestArticles, useArticlesByCategory } from "@/hooks/useArticles";
import { useI18n } from "@/contexts/I18nContext";

const Index = () => {
  const { t, lang } = useI18n();
  const { data: featured } = useFeaturedArticle();
  const { data: latest = [] } = useLatestArticles(8);
  const { data: cumilla } = useArticlesByCategory("cumilla", 0, 6);
  const { data: national } = useArticlesByCategory("national", 0, 6);
  const { data: sports } = useArticlesByCategory("sports", 0, 6);

  const cumillaItems = cumilla?.items || [];
  const cumillaSpecial = cumillaItems[0] || featured || null;

  return (
    <Layout>
      <Seo
        title={lang === "en" ? "Cumilla News — Cumilla's most-read online newspaper" : "কুমিল্লা নিউজ — কুমিল্লার সর্বাধিক পঠিত অনলাইন সংবাদপত্র"}
        description={t("siteTagline")}
        type="website"
      />
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8">
          <div className="lg:col-span-6"><LeadNews news={featured || latest[0]} /></div>
          <div className="lg:col-span-3"><TopStories news={latest} /></div>
          <div className="lg:col-span-3"><SylhetSpecial news={cumillaSpecial} /></div>
        </div>

        <AdSlot size="leaderboard" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-8">
            <CategorySection title={t("cumilla")} news={cumillaItems} categoryPath="/cumilla" />
            <AdSlot size="leaderboard" />
            <CategorySection title={t("national")} news={national?.items || []} categoryPath="/national" />
            <CategorySection title={t("sports")} news={sports?.items || []} categoryPath="/sports" />
          </div>
          <div className="lg:col-span-1 space-y-6">
            <WeatherWidget />
            <AdSlot size="rectangle" />
            <TrendingWidget />
            <LatestNewsSidebar news={latest.slice(0, 6)} />
            <NewsletterSignup />
            <FacebookEmbed />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
