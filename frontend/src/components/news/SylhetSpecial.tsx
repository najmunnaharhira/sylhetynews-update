import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import { NewsItem } from "@/data/newsData";

interface SylhetSpecialProps {
  news: NewsItem;
}

const SylhetSpecial = ({ news }: SylhetSpecialProps) => {
  return (
    <div className="portal-soft-panel overflow-hidden">
      <div className="flex items-center justify-between bg-[linear-gradient(135deg,#991b1b_0%,#fb923c_100%)] px-5 py-4 text-white">
        <div>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
            Signature Story
          </p>
          <h2 className="mt-1 text-lg font-bold">Sylhet Special</h2>
        </div>
        <Sparkles className="h-5 w-5 text-white/80" />
      </div>

      <Link to={`/news/${news.id}`} className="group block">
        <div className="relative overflow-hidden">
          <img
            src={news.image}
            alt={news.title}
            className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute left-4 top-4">
            <span className="news-category-tag">{news.categoryBn}</span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="line-clamp-3 text-lg font-bold leading-8 text-news-headline transition-colors group-hover:text-primary">
            {news.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-news-subtext">
            {news.excerpt}
          </p>
          <div className="mt-5 flex items-center justify-between gap-3">
            <span className="flex items-center gap-1 text-xs text-news-subtext">
              <Calendar className="h-3.5 w-3.5" />
              {news.date}
            </span>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Open Story
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SylhetSpecial;
