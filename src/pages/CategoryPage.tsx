import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import NewsCard from "@/components/news/NewsCard";
import FacebookEmbed from "@/components/news/FacebookEmbed";
import { getNewsByCategory, newsData } from "@/data/newsData";

const categoryNames: Record<string, string> = {
  sylhet: "সিলেট",
  national: "জাতীয়",
  politics: "রাজনীতি",
  expat: "প্রবাস",
  sports: "খেলাধুলা",
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const categoryNews = category ? getNewsByCategory(category) : newsData;
  const categoryTitle = category ? categoryNames[category] || category : "সকল সংবাদ";

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="section-title text-2xl mb-6">{categoryTitle}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* News Grid - 2/3 width */}
          <div className="lg:col-span-2">
            {categoryNews.length > 0 ? (
              <div className="space-y-4">
                {categoryNews.map((news) => (
                  <NewsCard key={news.id} news={news} variant="horizontal" />
                ))}
              </div>
            ) : (
              <div className="bg-card border border-news-border rounded-sm p-8 text-center">
                <p className="text-news-subtext font-bengali">
                  এই বিভাগে কোনো সংবাদ নেই।
                </p>
              </div>
            )}
          </div>

          {/* Sidebar - 1/3 width */}
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

export default CategoryPage;
