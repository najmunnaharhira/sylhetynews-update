import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import LatestNewsSidebar from "@/components/news/LatestNewsSidebar";
import { newsData, getLatestNews } from "@/data/newsData";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const news = newsData.find((n) => n.id === id);
  const latestNews = getLatestNews(5);

  if (!news) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bengali font-bold mb-4">
            সংবাদটি পাওয়া যায়নি
          </h1>
          <Link to="/" className="text-primary hover:underline font-bengali">
            প্রচ্ছদে ফিরে যান
          </Link>
        </div>
      </Layout>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: news.title,
        text: news.excerpt,
        url: window.location.href,
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 2/3 width */}
          <article className="lg:col-span-2">
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-sm text-primary mb-4 hover:underline font-bengali"
            >
              <ArrowLeft className="w-4 h-4" />
              প্রচ্ছদে ফিরে যান
            </Link>

            <div className="bg-card border border-news-border rounded-sm overflow-hidden">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-64 md:h-96 object-cover"
              />

              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="news-category-tag">{news.categoryBn}</span>
                </div>

                <h1 className="news-headline text-2xl md:text-3xl mb-4">
                  {news.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-news-subtext mb-6 pb-6 border-b border-news-border">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {news.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {news.author}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShare}
                    className="ml-auto"
                  >
                    <Share2 className="w-4 h-4 mr-1" />
                    শেয়ার
                  </Button>
                </div>

                <div className="prose prose-lg max-w-none font-bengali">
                  <p className="text-foreground leading-relaxed text-lg">
                    {news.content}
                  </p>
                  <p className="text-foreground leading-relaxed mt-4">
                    এই সংবাদ সম্পর্কে আরও তথ্যের জন্য আমাদের সাথে যোগাযোগ করুন।
                    সিলেটি নিউজ সর্বদা আপনাদের পাশে আছে সঠিক তথ্য নিয়ে।
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar - 1/3 width */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <LatestNewsSidebar news={latestNews} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewsDetail;
