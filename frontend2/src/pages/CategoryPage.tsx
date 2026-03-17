import { useMemo, useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import NewsCard from "@/components/news/NewsCard";
import FacebookEmbed from "@/components/news/FacebookEmbed";
import { getNewsByCategory, newsData, type NewsItem } from "@/data/newsData";
import { newsService } from "@/services/dataService";
import { NewsArticle } from "@/types/news";
import { toDisplayItem } from "@/utils/newsDisplay";
import { Share2, ThumbsUp, Star } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const categoryNames: Record<string, string> = {
  sylhet: "সিলেট",
  national: "জাতীয়",
  politics: "রাজনীতি",
  mofoshol: "মফস্বল সংবাদ",
  international: "আন্তর্জাতিক",
  economy: "অর্থনীতি ও বাণিজ্য",
  entertainment: "বিনোদন",
  expat: "প্রবাস",
  sports: "খেলাধুলা",
  lifestyle: "লাইফ-স্টাইল",
  technology: "তথ্য ও প্রযুক্তি",
  law: "আইন ও আদালত",
  opinion: "মতামত",
  others: "অন্যান্য",
};

/** Normalized opinion item (used in state and API). */
type OpinionItem = {
  id: string;
  name: string;
  comment: string;
  created_at: string;
  rating: number;
  likes_count: number;
};

/** Raw shape when parsing from localStorage (legacy fields supported). */
type StoredOpinionItem = Partial<OpinionItem> & {
  text?: string;
  likes?: number;
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const location = useLocation();
  const resolvedCategory =
    category ||
    (location.pathname === "/opinion"
      ? "opinion"
      : location.pathname === "/others"
      ? "others"
      : undefined);
  const categoryTitle = resolvedCategory
    ? categoryNames[resolvedCategory] || resolvedCategory
    : "সকল সংবাদ";
  const sectionLabel = resolvedCategory ? `${categoryTitle} সংবাদ` : "সব সংবাদ";
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 1;
  const [allNews, setAllNews] = useState<(NewsArticle | NewsItem)[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        let news: NewsArticle[] = [];
        if (resolvedCategory) {
          news = await newsService.getNewsByCategory(resolvedCategory);
        } else {
          news = await newsService.getAllNews();
        }
        if (news && news.length > 0) {
          setAllNews(news);
        } else {
          // Fallback to static data if no dynamic news
          setAllNews(
            resolvedCategory ? getNewsByCategory(resolvedCategory) : newsData
          );
        }
      } catch (error) {
        console.error("Failed to load news:", error);
        // Silently fallback to static data
        setAllNews(
          resolvedCategory ? getNewsByCategory(resolvedCategory) : newsData
        );
      }
      setLoading(false);
    };
    loadNews();
  }, [resolvedCategory]);

  const categoryNews: (NewsArticle | NewsItem)[] =
    allNews.length > 0
      ? allNews
      : resolvedCategory
      ? getNewsByCategory(resolvedCategory)
      : newsData;

  const displayNews = useMemo(
    () => categoryNews.map((n) => toDisplayItem(n as NewsArticle | NewsItem)),
    [categoryNews]
  );
  const [opinionName, setOpinionName] = useState("");
  const [opinionText, setOpinionText] = useState("");
  const [opinionRating, setOpinionRating] = useState(0);
  const [opinions, setOpinions] = useState<OpinionItem[]>([]);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState("");
  const apiBase = import.meta.env.VITE_API_URL || "";
  const storageKey = "opinion-submissions-v2";
  const likedKey = "opinion-liked-ids";
  const sessionId = useMemo(() => {
    const stored = localStorage.getItem("opinion-session");
    if (stored) return stored;
    const generated = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    localStorage.setItem("opinion-session", generated);
    return generated;
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [resolvedCategory]);

  useEffect(() => {
    if (resolvedCategory !== "opinion") return;
    const stored = localStorage.getItem(storageKey);
    const storedLikes = localStorage.getItem(likedKey);
    if (storedLikes) {
      try {
        setLikedIds(JSON.parse(storedLikes));
      } catch {
        setLikedIds([]);
      }
    }
    const loadOpinions = async () => {
      if (apiBase) {
        try {
          const response = await fetch(`${apiBase}/api/opinions`);
          if (response.ok) {
            const data = await response.json();
            setOpinions(data.opinions || []);
            return;
          }
        } catch {
          // fallback to local storage
        }
      }
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const normalized = Array.isArray(parsed)
            ? (parsed as StoredOpinionItem[]).map((item) => ({
                id: item.id ?? "",
                name: item.name ?? "",
                comment: item.comment ?? item.text ?? "",
                rating: item.rating ?? 0,
                likes_count: item.likes_count ?? item.likes ?? 0,
                created_at: item.created_at ?? new Date().toISOString(),
              }))
            : [];
          setOpinions(normalized);
        } catch {
          setOpinions([]);
        }
      } else {
        setOpinions([]);
      }
    };
    loadOpinions();
  }, [resolvedCategory, apiBase]);

  useEffect(() => {
    if (resolvedCategory !== "opinion") return;
    localStorage.setItem(storageKey, JSON.stringify(opinions));
    localStorage.setItem(likedKey, JSON.stringify(likedIds));
  }, [opinions, likedIds, resolvedCategory]);

  const totalPages = Math.max(1, Math.ceil(displayNews.length / pageSize));
  const pagedNews = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return displayNews.slice(start, start + pageSize);
  }, [displayNews, currentPage]);

  const handleOpinionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(false);
    setFormError("");
    if (!opinionText.trim()) {
      setFormError("মতামত লিখুন");
      return;
    }
    if (opinionRating === 0) {
      setFormError("রেটিং নির্বাচন করুন");
      return;
    }
    setIsSubmitting(true);
    const newOpinion = {
      id: `${Date.now()}`,
      name: opinionName.trim() || "Anonymous",
      comment: opinionText.trim(),
      rating: opinionRating,
      likes_count: 0,
      created_at: new Date().toISOString(),
    };
    try {
      if (apiBase) {
        const response = await fetch(`${apiBase}/api/opinions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: newOpinion.name,
            comment: newOpinion.comment,
            rating: newOpinion.rating,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          setOpinions((prev) => [data.opinion, ...prev]);
        } else {
          setOpinions((prev) => [newOpinion, ...prev]);
        }
      } else {
        setOpinions((prev) => [newOpinion, ...prev]);
      }
      setOpinionName("");
      setOpinionText("");
      setOpinionRating(0);
      setSubmitSuccess(true);
      setFormError("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpinionLike = async (id: string) => {
    const isLiked = likedIds.includes(id);
    setLikedIds((prev) =>
      isLiked ? prev.filter((item) => item !== id) : [...prev, id]
    );
    setOpinions((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              likes_count: isLiked
                ? Math.max(0, item.likes_count - 1)
                : item.likes_count + 1,
            }
          : item
      )
    );
    if (apiBase) {
      try {
        await fetch(`${apiBase}/api/opinions/${id}/like`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-session-id": sessionId,
          },
        });
      } catch {
        // ignore
      }
    }
  };

  const handleOpinionShare = async (id: string) => {
    const shareUrl = `${window.location.origin}/opinion#${id}`;
    const opinion = opinions.find((item) => item.id === id);
    if (navigator.share) {
      await navigator.share({
        title: "মতামত - সিলেটি নিউজ",
        text: opinion ? opinion.comment : "সিলেটি নিউজের পাঠক মতামত",
        url: shareUrl,
      });
      return;
    }
    await navigator.clipboard.writeText(shareUrl);
    toast({ description: "Link copied to clipboard" });
  };

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
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-primary text-primary-foreground px-4 py-2 font-bengali font-semibold text-sm">
            {sectionLabel}
          </div>
          <div className="flex-1 border-t border-news-border" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* News Grid - 2/3 width */}
          <div className="lg:col-span-2">
            {resolvedCategory === "opinion" && (
              <div className="bg-card border border-news-border rounded-sm p-6 mb-6">
                <h2 className="font-bengali text-lg font-semibold mb-3">
                  মতামত ও রিভিউ দিন
                </h2>
                <form onSubmit={handleOpinionSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bengali text-news-subtext mb-1">
                      আপনার নাম
                    </label>
                    <input
                      value={opinionName}
                      onChange={(e) => setOpinionName(e.target.value)}
                      className="w-full rounded-md border border-news-border px-3 py-2 text-sm"
                      placeholder="নাম লিখুন"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bengali text-news-subtext mb-1">
                      মতামত
                    </label>
                    <textarea
                      value={opinionText}
                      onChange={(e) => setOpinionText(e.target.value)}
                      className="w-full rounded-md border border-news-border px-3 py-2 text-sm min-h-[120px]"
                      placeholder="আপনার মতামত লিখুন"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bengali text-news-subtext mb-1">
                      রেটিং
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setOpinionRating(value)}
                          className="transition-transform hover:scale-105"
                          aria-label={`Rate ${value}`}
                        >
                          <Star
                            className={`w-5 h-5 ${
                              opinionRating >= value
                                ? "text-primary"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded transition-colors disabled:opacity-70"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "পাঠানো হচ্ছে..." : "পাঠান"}
                  </button>
                  {formError && (
                    <p className="text-sm text-red-600 font-bengali">
                      {formError}
                    </p>
                  )}
                  {submitSuccess && (
                    <p className="text-sm text-green-600 font-bengali">
                      আপনার মতামত যোগ হয়েছে।
                    </p>
                  )}
                </form>
              </div>
            )}
            {pagedNews.length > 0 ? (
              <div className="space-y-4">
                {pagedNews.map((news) => (
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
            {resolvedCategory === "opinion" && (
              <div className="mt-6 space-y-4">
                <h3 className="font-bengali text-lg font-semibold">
                  পাঠক মতামত ও রিভিউ
                </h3>
                {opinions.length === 0 ? (
                  <p className="text-sm text-news-subtext font-bengali">
                    এখনো কোনো মতামত নেই।
                  </p>
                ) : (
                  opinions
                    .sort(
                      (a, b) =>
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime()
                    )
                    .map((item) => (
                      <div
                        key={item.id}
                        className="border border-news-border rounded-md p-4"
                        id={item.id}
                      >
                        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                          <p className="font-bengali font-semibold text-news-headline">
                            {item.name || "Anonymous"}
                          </p>
                          <p className="text-xs text-news-subtext">
                            {new Date(item.created_at).toLocaleDateString(
                              "bn-BD",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-primary mb-2">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              className={`w-4 h-4 ${
                                item.rating > index
                                  ? "text-primary"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-news-body font-bengali">
                          {item.comment}
                        </p>
                        <div className="flex items-center gap-3 mt-4">
                          <button
                            type="button"
                            onClick={() => handleOpinionLike(item.id)}
                            className={`inline-flex items-center gap-2 text-sm transition-colors ${
                              likedIds.includes(item.id)
                                ? "text-primary"
                                : "text-news-subtext hover:text-primary"
                            }`}
                          >
                            <ThumbsUp className="w-4 h-4" />
                            লাইক ({item.likes_count})
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpinionShare(item.id)}
                            className="inline-flex items-center gap-1 text-sm text-news-subtext hover:text-primary"
                          >
                            <Share2 className="w-4 h-4" />
                            শেয়ার
                          </button>
                        </div>
                      </div>
                    ))
                )}
              </div>
            )}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
                <button
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm border border-news-border rounded disabled:opacity-50"
                >
                  আগের
                </button>
                {Array.from({ length: totalPages }).map((_, pageIndex) => {
                  const pageNumber = pageIndex + 1;
                  const isActive = pageNumber === currentPage;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`px-3 py-2 text-sm border rounded ${
                        isActive
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-news-border text-news-subtext hover:bg-muted"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                <button
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm border border-news-border rounded disabled:opacity-50"
                >
                  পরের
                </button>
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
