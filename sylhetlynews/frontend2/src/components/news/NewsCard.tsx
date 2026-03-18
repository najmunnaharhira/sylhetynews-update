import { Link } from "react-router-dom";
import { NewsItem } from "@/data/newsData";
import { Calendar } from "lucide-react";

interface NewsCardProps {
  news: NewsItem;
  variant?: "default" | "compact" | "horizontal";
}

const NewsCard = ({ news, variant = "default" }: NewsCardProps) => {
  if (variant === "compact") {
    return (
      <article className="group">
        <Link
          to={`/news/${news.id}`}
          className="flex gap-3 p-2 rounded-sm hover:bg-secondary transition-colors"
        >
          <img
            src={news.image}
            alt={news.title}
            className="w-20 h-16 object-cover rounded-sm flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="news-headline text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {news.title}
            </h3>
            <span className="text-xs text-news-subtext flex items-center gap-1 mt-1">
              <Calendar className="w-3 h-3" />
              {news.date}
            </span>
          </div>
        </Link>
        <div className="px-2 pb-2">
          <Link
            to={`/photocard?newsId=${news.id}`}
            className="text-xs text-primary hover:underline font-bengali"
          >
            ফটোকার্ড তৈরি করুন
          </Link>
        </div>
      </article>
    );
  }

  if (variant === "horizontal") {
    return (
      <article className="news-card group">
        <Link to={`/news/${news.id}`} className="flex flex-col sm:flex-row gap-4">
          <div className="relative overflow-hidden sm:w-1/3 flex-shrink-0">
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-40 sm:h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-2 left-2">
              <span className="news-category-tag text-xs">{news.categoryBn}</span>
            </div>
          </div>
          <div className="p-4 sm:p-0 sm:py-2 sm:pr-4 flex-1">
            <h3 className="news-headline text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {news.title}
            </h3>
            <p className="news-subtext text-sm mb-3 line-clamp-2">{news.excerpt}</p>
            <span className="text-xs text-news-subtext flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {news.date}
            </span>
          </div>
        </Link>
        <div className="px-4 pb-3 sm:pb-0">
          <Link
            to={`/photocard?newsId=${news.id}`}
            className="text-xs text-primary hover:underline font-bengali"
          >
            ফটোকার্ড তৈরি করুন
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="news-card group">
      <Link to={`/news/${news.id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 left-2">
            <span className="news-category-tag text-xs">{news.categoryBn}</span>
          </div>
        </div>
        <div className="p-3">
          <h3 className="news-headline text-base mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {news.title}
          </h3>
          <span className="text-xs text-news-subtext flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {news.date}
          </span>
        </div>
      </Link>
      <div className="px-3 pb-3">
        <Link
          to={`/photocard?newsId=${news.id}`}
          className="text-xs text-primary hover:underline font-bengali"
        >
          ফটোকার্ড তৈরি করুন
        </Link>
      </div>
    </article>
  );
};

export default NewsCard;
