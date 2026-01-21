import { useMemo, useState, useEffect } from "react";
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
  others: "অন্যান্য",
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const categoryNews = category ? getNewsByCategory(category) : newsData;
  const categoryTitle = category ? categoryNames[category] || category : "সকল সংবাদ";
  const sectionLabel = category ? `${categoryTitle} সংবাদ` : "সব সংবাদ";
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 1;
  const [opinionName, setOpinionName] = useState("");
  const [opinionText, setOpinionText] = useState("");
  const [opinions, setOpinions] = useState<
    { id: string; name: string; text: string; date: string }[]
  >([]);

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  useEffect(() => {
    if (category !== "opinion") return;
    const stored = localStorage.getItem("opinion-submissions");
    if (stored) {
      try {
        setOpinions(JSON.parse(stored));
      } catch {
        setOpinions([]);
      }
    } else {
      setOpinions([]);
    }
  }, [category]);

  useEffect(() => {
    if (category !== "opinion") return;
    localStorage.setItem("opinion-submissions", JSON.stringify(opinions));
  }, [opinions, category]);

  const totalPages = Math.max(1, Math.ceil(categoryNews.length / pageSize));
  const pagedNews = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return categoryNews.slice(start, start + pageSize);
  }, [categoryNews, currentPage]);

  const handleOpinionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!opinionName.trim() || !opinionText.trim()) return;
    const newOpinion = {
      id: `${Date.now()}`,
      name: opinionName.trim(),
      text: opinionText.trim(),
      date: new Date().toLocaleDateString("bn-BD", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
    setOpinions((prev) => [newOpinion, ...prev]);
    setOpinionName("");
    setOpinionText("");
  };

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
            {category === "opinion" && (
              <div className="bg-card border border-news-border rounded-sm p-6 mb-6">
                <h2 className="font-bengali text-lg font-semibold mb-3">
                  মতামত দিন
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
                      required
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
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded"
                  >
                    পাঠান
                  </button>
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
            {category === "opinion" && (
              <div className="mt-6 space-y-4">
                <h3 className="font-bengali text-lg font-semibold">পাঠক মতামত</h3>
                {opinions.length === 0 ? (
                  <p className="text-sm text-news-subtext font-bengali">
                    এখনো কোনো মতামত নেই।
                  </p>
                ) : (
                  opinions.map((item) => (
                    <div
                      key={item.id}
                      className="border border-news-border rounded-md p-4"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                        <p className="font-bengali font-semibold text-news-headline">
                          {item.name}
                        </p>
                        <p className="text-xs text-news-subtext">{item.date}</p>
                      </div>
                      <p className="text-sm text-news-body font-bengali">
                        {item.text}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
                <button
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
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
