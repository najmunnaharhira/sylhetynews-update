
import { Link } from "react-router-dom";
import { useState } from "react";
import { NewsItem } from "@/data/newsData";

interface TopStoriesProps {
  news: NewsItem[];
}

const PAGE_SIZE = 5;

const TopStories = ({ news }: TopStoriesProps) => {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(news.length / PAGE_SIZE);
  const paginatedNews = news.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="bg-card border border-news-border rounded-md overflow-hidden h-full">
      <div className="bg-news-slate px-4 py-3">
        <h2 className="text-white font-bengali font-bold text-base">
          শীর্ষ সংবাদ
        </h2>
      </div>
      <div className="divide-y divide-news-border">
        {paginatedNews.map((item, index) => (
          <Link
            key={item.id}
            to={`/news/${item.id}`}
            className="block px-4 py-3 hover:bg-muted transition-colors group"
          >
            <div className="flex gap-3">
              <span className="text-primary font-bold text-lg min-w-[24px]">
                {String(page * PAGE_SIZE + index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-bengali font-semibold text-sm text-news-headline leading-snug group-hover:text-primary transition-colors line-clamp-2">
                {item.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 py-3 md:py-2">
          <button
            className="px-3 py-2 rounded bg-primary text-white font-bold text-sm md:text-xs shadow-md focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
          >
            পূর্ববর্তী
          </button>
          <span className="text-xs md:text-sm font-bengali text-primary">
            {page + 1} / {totalPages}
          </span>
          <button
            className="px-3 py-2 rounded bg-primary text-white font-bold text-sm md:text-xs shadow-md focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages - 1}
          >
            পরবর্তী
          </button>
        </div>
      )}
    </div>
  );
};

export default TopStories;
