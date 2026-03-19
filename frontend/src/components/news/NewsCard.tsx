import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { NewsItem } from "@/data/newsData";

interface NewsCardProps {
  news: NewsItem;
  variant?: "default" | "compact" | "horizontal";
}

const detailsButtonClassName =
  "inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground";

const NewsCard = ({ news, variant = "default" }: NewsCardProps) => {
  if (variant === "compact") {
    return (
      <article className="group">
        <Link
          to={`/news/${news.id}`}
          className="flex gap-3 rounded-[22px] border border-transparent p-3 transition-all duration-300 hover:border-primary/10 hover:bg-white/80 hover:shadow-sm"
        >
          <img
            src={news.image}
            alt={news.title}
            className="h-20 w-24 flex-shrink-0 rounded-[18px] object-cover shadow-sm"
          />
          <div className="min-w-0 flex-1">
            <span className="inline-flex rounded-full bg-primary/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              {news.categoryBn}
            </span>
            <h3 className="news-headline mt-2 line-clamp-2 text-sm transition-colors group-hover:text-primary">
              {news.title}
            </h3>
            <span className="mt-2 flex items-center gap-1 text-xs text-news-subtext">
              <Calendar className="h-3 w-3" />
              {news.date}
            </span>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === "horizontal") {
    return (
      <article className="news-card group">
        <Link to={`/news/${news.id}`} className="flex h-full flex-col gap-4 sm:flex-row">
          <div className="relative overflow-hidden sm:w-[38%] sm:flex-shrink-0">
            <img
              src={news.image}
              alt={news.title}
              className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
            <div className="absolute left-4 top-4">
              <span className="news-category-tag">{news.categoryBn}</span>
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-between p-5 sm:pl-0">
            <div>
              <h3 className="news-headline line-clamp-2 text-xl transition-colors group-hover:text-primary">
                {news.title}
              </h3>
              <p className="news-subtext mt-3 line-clamp-3 text-sm leading-7">{news.excerpt}</p>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <span className="flex items-center gap-1 text-xs text-news-subtext">
                <Calendar className="h-3.5 w-3.5" />
                {news.date}
              </span>
              <span className={detailsButtonClassName}>
                Details About News
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="news-card group">
      <Link to={`/news/${news.id}`} className="block h-full">
        <div className="relative overflow-hidden">
          <img
            src={news.image}
            alt={news.title}
            className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          <div className="absolute left-4 top-4">
            <span className="news-category-tag">{news.categoryBn}</span>
          </div>
        </div>
        <div className="flex h-full flex-col p-5">
          <h3 className="news-headline line-clamp-2 text-lg transition-colors group-hover:text-primary">
            {news.title}
          </h3>
          <p className="news-subtext mt-3 line-clamp-3 flex-1 text-sm leading-7">{news.excerpt}</p>
          <div className="mt-5 flex items-center justify-between gap-3">
            <span className="flex items-center gap-1 text-xs text-news-subtext">
              <Calendar className="h-3.5 w-3.5" />
              {news.date}
            </span>
            <span className={detailsButtonClassName}>
              Details About News
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default NewsCard;
