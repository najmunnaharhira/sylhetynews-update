import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import LatestNewsSidebar from "@/components/news/LatestNewsSidebar";
import { newsData, getLatestNews } from "@/data/newsData";
import { Calendar, User, ArrowLeft, Share2, Star, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type NewsComment = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
};

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const news = newsData.find((n) => n.id === id);
  const latestNews = getLatestNews(5);
  const [comments, setComments] = useState<NewsComment[]>([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (!id) return;
    const stored = localStorage.getItem(`news-comments-${id}`);
    if (stored) {
      try {
        setComments(JSON.parse(stored));
      } catch {
        setComments([]);
      }
    } else {
      setComments([]);
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;
    localStorage.setItem(`news-comments-${id}`, JSON.stringify(comments));
  }, [comments, id]);

  const averageRating = useMemo(() => {
    if (comments.length === 0) return 0;
    const total = comments.reduce((sum, item) => sum + item.rating, 0);
    return Math.round((total / comments.length) * 10) / 10;
  }, [comments]);

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

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !commentText.trim()) return;
    const newComment: NewsComment = {
      id: `${Date.now()}`,
      name: name.trim(),
      rating,
      comment: commentText.trim(),
      date: new Date().toLocaleDateString("bn-BD", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
    setComments((prev) => [newComment, ...prev]);
    setName("");
    setRating(5);
    setCommentText("");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 2/3 width */}
          <article className="lg:col-span-2 space-y-6">
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
                  <div className="flex items-center gap-2 ml-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <Link to={`/photocard?newsId=${news.id}`}>
                        <ImageIcon className="w-4 h-4 mr-1" />
                        ফটোকার্ড
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleShare}
                    >
                      <Share2 className="w-4 h-4 mr-1" />
                      শেয়ার
                    </Button>
                  </div>
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

            <div className="bg-card border border-news-border rounded-sm p-6">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                <h2 className="font-bengali text-lg font-semibold">মন্তব্য ও রিভিউ</h2>
                {comments.length > 0 && (
                  <div className="flex items-center gap-2 text-sm text-news-subtext">
                    <span>{comments.length} মন্তব্য</span>
                    <span>•</span>
                    <span>গড় রেটিং {averageRating}/৫</span>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmitComment} className="space-y-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bengali text-news-subtext mb-1">
                      আপনার নাম
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-md border border-news-border px-3 py-2 text-sm"
                      placeholder="নাম লিখুন"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bengali text-news-subtext mb-1">
                      রেটিং
                    </label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full rounded-md border border-news-border px-3 py-2 text-sm"
                    >
                      {[5, 4, 3, 2, 1].map((value) => (
                        <option key={value} value={value}>
                          {value} / 5
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bengali text-news-subtext mb-1">
                    মন্তব্য
                  </label>
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full rounded-md border border-news-border px-3 py-2 text-sm min-h-[120px]"
                    placeholder="আপনার মতামত লিখুন"
                    required
                  />
                </div>
                <Button type="submit" className="px-6">
                  মন্তব্য যোগ করুন
                </Button>
              </form>

              {comments.length === 0 ? (
                <p className="text-sm text-news-subtext font-bengali">
                  এখনো কোনো মন্তব্য নেই।
                </p>
              ) : (
                <div className="space-y-4">
                  {comments.map((item) => (
                    <div
                      key={item.id}
                      className="border border-news-border rounded-md p-4"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                        <div>
                          <p className="font-bengali font-semibold text-news-headline">
                            {item.name}
                          </p>
                          <p className="text-xs text-news-subtext">{item.date}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              className={`w-4 h-4 ${
                                index < item.rating
                                  ? "text-primary"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-news-body font-bengali">
                        {item.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}
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
