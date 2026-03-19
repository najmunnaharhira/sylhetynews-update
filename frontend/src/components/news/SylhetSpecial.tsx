import { Link } from "react-router-dom";
import { NewsItem } from "@/data/newsData";
import { Calendar } from "lucide-react";

interface SylhetSpecialProps {
  news: NewsItem;
}

const SylhetSpecial = ({ news }: SylhetSpecialProps) => {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-md border border-news-border bg-card">
      <div className="bg-primary px-4 py-3">
        <h2 className="text-base font-bold text-white">
          সিলেট বিশেষ
        </h2>
      </div>
      <Link to={`/news/${news.id}`} className="group flex-1">
        <div className="relative overflow-hidden">
          <img
            src={news.image}
            alt={news.title}
            className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <span className="mb-2 inline-block rounded bg-primary px-2 py-0.5 text-xs text-primary-foreground">
              {news.categoryBn}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="mb-2 line-clamp-3 text-sm font-bold leading-snug text-news-headline transition-colors group-hover:text-primary">
            {news.title}
          </h3>
          <p className="mb-2 line-clamp-2 text-xs text-news-subtext">
            {news.excerpt}
          </p>
          <span className="flex items-center gap-1 text-xs text-news-subtext">
            <Calendar className="h-3 w-3" />
            {news.date}
          </span>
        </div>
      </Link>
      <div className="border-t border-news-border px-4 py-4">
        <Link
          to={`/news/${news.id}`}
          className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Details About News
        </Link>
      </div>
    </div>
  );
};

export default SylhetSpecial;
