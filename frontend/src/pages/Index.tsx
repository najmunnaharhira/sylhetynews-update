import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import LeadNews from "@/components/news/LeadNews";
import TopStories from "@/components/news/TopStories";
import SylhetSpecial from "@/components/news/SylhetSpecial";
import LatestNewsSidebar from "@/components/news/LatestNewsSidebar";
import FacebookEmbed from "@/components/news/FacebookEmbed";
import WeatherWidget from "@/components/news/WeatherWidget";
import CategorySection from "@/components/news/CategorySection";
import { newsService } from "@/services/firebaseService";
import { NewsArticle } from "@/types/news";
import { firebaseReady } from "@/config/firebase";
import {
  getFeaturedNews,
  getLatestNews,
  getNewsByCategory,
} from "@/data/newsData";

const Index = () => {
  const [allNews, setAllNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      if (firebaseReady) {
        try {
          const news = await newsService.getAllNews();
          if (news && news.length > 0) {
            setAllNews(news);
          } else {
            // Fallback to static data if no news from Firebase
            setAllNews([]);
          }
        } catch (error) {
          console.error("Failed to load news from Firebase:", error);
          // Silently fallback to static data
          setAllNews([]);
        }
      } else {
        // Silently use static data if Firebase not ready
        setAllNews([]);
      }
      setLoading(false);
    };
    loadNews();
  }, []);
  const categoryNavItems = [
    { name: "প্রচ্ছদ", path: "/" },
    { name: "সিলেট", path: "/sylhet" },
    { name: "জাতীয়", path: "/national" },
    { name: "রাজনীতি", path: "/politics" },
    { name: "মফস্বল সংবাদ", path: "/mofoshol" },
    { name: "আন্তর্জাতিক", path: "/international" },
    { name: "অর্থনীতি ও বাণিজ্য", path: "/economy" },
    { name: "বিনোদন", path: "/entertainment" },
    { name: "প্রবাস", path: "/expat" },
    { name: "খেলাধুলা", path: "/sports" },
    { name: "লাইফ-স্টাইল", path: "/lifestyle" },
    { name: "তথ্য ও প্রযুক্তি", path: "/technology" },
    { name: "আইন ও আদালত", path: "/law" },
  ];

  // Use Firebase data if available, otherwise fallback to static data
  const featuredNews = allNews.find(n => n.featured) || (allNews.length > 0 ? allNews[0] : getFeaturedNews());
  const latestNews = allNews.length > 0 ? allNews.slice(0, 6) : getLatestNews(6);
  const sylhetNews = allNews.length > 0 
    ? allNews.filter(n => n.category === "sylhet" || n.categoryBn === "সিলেট")
    : getNewsByCategory("sylhet");
  const nationalNews = allNews.length > 0
    ? allNews.filter(n => n.category === "national" || n.categoryBn === "জাতীয়")
    : getNewsByCategory("national");
  const sportsNews = allNews.length > 0
    ? allNews.filter(n => n.category === "sports" || n.categoryBn === "খেলাধুলা")
    : getNewsByCategory("sports");

  // Get a featured Sylhet news for the special section
  const sylhetSpecialNews = sylhetNews[0] || featuredNews;

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-6">
          <div className="text-center py-12">
            <p className="text-news-subtext font-bengali">লোড হচ্ছে...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap border border-news-border rounded-sm bg-card px-3 py-2">
            {categoryNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-3 py-1 text-xs font-bengali text-news-subtext rounded-full border border-transparent hover:border-primary hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        {/* Hero Section - 3 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8">
          {/* Lead News - 50% */}
          <div className="lg:col-span-6">
            <LeadNews news={featuredNews} />
          </div>

          {/* Top Stories - 25% */}
          <div className="lg:col-span-3">
            <TopStories news={latestNews} />
          </div>

          {/* Sylhet Special - 25% */}
          <div className="lg:col-span-3">
            <SylhetSpecial news={sylhetSpecialNews} />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* News Sections - 2/3 width */}
          <div className="lg:col-span-2 space-y-8">
            <CategorySection
              title="সিলেট"
              news={sylhetNews}
              categoryPath="/sylhet"
            />
            <CategorySection
              title="জাতীয়"
              news={nationalNews}
              categoryPath="/national"
            />
            <CategorySection
              title="খেলাধুলা"
              news={sportsNews}
              categoryPath="/sports"
            />
          </div>

          {/* Right Sidebar - 1/3 width */}
          <div className="lg:col-span-1 space-y-6">
            <WeatherWidget />
            <LatestNewsSidebar news={latestNews} />
            <div className="sticky top-20">
              <FacebookEmbed />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
