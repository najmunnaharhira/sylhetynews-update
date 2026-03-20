import { Link } from "react-router-dom";
import { NewsItem } from "@/data/newsData";
import { Calendar, User } from "lucide-react";

interface LeadNewsProps {
  news: NewsItem;
}

const LeadNews = ({ news }: LeadNewsProps) => {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-md border border-news-border bg-card">
      <Link to={`/news/${news.id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={news.image}
            alt={news.title}
            className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-96"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute left-4 top-4">
            <span className="inline-block rounded bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
              {news.categoryBn}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
            <h1 className="mb-3 text-xl font-bold leading-tight text-white drop-shadow-lg md:text-2xl lg:text-3xl">
              {news.title}
            </h1>
            <p className="mb-3 hidden text-sm text-white/80 sm:block md:text-base">
              {news.excerpt}
            </p>
            <div className="flex items-center gap-4 text-xs text-white/70">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {news.date}
              </span>
              <span className="flex items-center gap-1">
                <User className="h-3.5 w-3.5" />
                {news.author}
              </span>
            </div>
          </div>
        </div>
      </Link>

      <div className="flex items-center justify-between gap-3 border-t border-news-border px-5 py-4">
        <p className="line-clamp-1 text-sm text-news-subtext">{news.excerpt}</p>
        <Link
          to={`/news/${news.id}`}
          className="inline-flex shrink-0 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Details About News
        </Link>
      </div>
    </article>
  );
};

export default LeadNews;
