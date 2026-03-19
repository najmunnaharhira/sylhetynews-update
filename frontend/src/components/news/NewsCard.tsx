import { Link } from "react-router-dom";
import { NewsItem } from "@/data/newsData";
import { Calendar } from "lucide-react";

interface NewsCardProps {
  news: NewsItem;
  variant?: "default" | "compact" | "horizontal";
}

const detailsButtonClassName =
  "inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground";

const NewsCard = ({ news, variant = "default" }: NewsCardProps) => {
  if (variant === "compact") {
    return (
      <article className="group">
        <Link
          to={`/news/${news.id}`}
          className="flex gap-3 rounded-sm p-2 transition-colors hover:bg-secondary"
        >
          <img
            src={news.image}
            alt={news.title}
            className="h-16 w-20 flex-shrink-0 rounded-sm object-cover"
          />
          <div className="min-w-0 flex-1">
            <h3 className="news-headline line-clamp-2 text-sm transition-colors group-hover:text-primary">
              {news.title}
            </h3>
            <span className="mt-1 flex items-center gap-1 text-xs text-news-subtext">
              <Calendar className="h-3 w-3" />
              {news.date}
            </span>
          </div>
        </Link>
        <div className="px-2 pb-2">
          <Link to={`/news/${news.id}`} className={detailsButtonClassName}>
            Details About News
          </Link>
        </div>
      </article>
    );
  }

  if (variant === "horizontal") {
    return (
      <article className="news-card group">
        <Link to={`/news/${news.id}`} className="flex flex-col gap-4 sm:flex-row">
          <div className="relative overflow-hidden sm:w-1/3 sm:flex-shrink-0">
            <img
              src={news.image}
              alt={news.title}
              className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:h-full"
            />
            <div className="absolute left-2 top-2">
              <span className="news-category-tag text-xs">{news.categoryBn}</span>
            </div>
          </div>
          <div className="flex-1 p-4 sm:p-0 sm:py-2 sm:pr-4">
            <h3 className="news-headline mb-2 line-clamp-2 text-lg transition-colors group-hover:text-primary">
              {news.title}
            </h3>
            <p className="news-subtext mb-3 line-clamp-2 text-sm">{news.excerpt}</p>
            <span className="flex items-center gap-1 text-xs text-news-subtext">
              <Calendar className="h-3 w-3" />
              {news.date}
            </span>
          </div>
        </Link>
        <div className="px-4 pb-3 sm:pb-0">
          <Link to={`/news/${news.id}`} className={detailsButtonClassName}>
            Details About News
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
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute left-2 top-2">
            <span className="news-category-tag text-xs">{news.categoryBn}</span>
          </div>
        </div>
        <div className="p-3">
          <h3 className="news-headline mb-2 line-clamp-2 text-base transition-colors group-hover:text-primary">
            {news.title}
          </h3>
          <span className="flex items-center gap-1 text-xs text-news-subtext">
            <Calendar className="h-3 w-3" />
            {news.date}
          </span>
        </div>
      </Link>
      <div className="px-3 pb-3">
        <Link to={`/news/${news.id}`} className={detailsButtonClassName}>
          Details About News
        </Link>
      </div>
    </article>
  );
};

export default NewsCard;
