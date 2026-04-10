import Layout from "@/components/layout/Layout";
import LeadNews from "@/components/news/LeadNews";
import LatestNewsSidebar from "@/components/news/LatestNewsSidebar";
import FacebookEmbed from "@/components/news/FacebookEmbed";
import CategorySection from "@/components/news/CategorySection";
import {
  getFeaturedNews,
  getLatestNews,
  getNewsByCategory,
} from "@/data/newsData";

const Index = () => {
  const featuredNews = getFeaturedNews();
  const latestNews = getLatestNews(5);
  const sylhetNews = getNewsByCategory("sylhet");
  const nationalNews = getNewsByCategory("national");
  const sportsNews = getNewsByCategory("sports");

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Lead News - 2/3 width */}
          <div className="lg:col-span-2">
            <LeadNews news={featuredNews} />
          </div>

          {/* Latest News Sidebar - 1/3 width */}
          <div className="lg:col-span-1">
            <LatestNewsSidebar news={latestNews} />
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
          <div className="lg:col-span-1">
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
