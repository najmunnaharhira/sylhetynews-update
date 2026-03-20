import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import { NewsItem } from "@/data/newsData";

interface SylhetSpecialProps {
  news: NewsItem;
}

const SylhetSpecial = ({ news }: SylhetSpecialProps) => {
  return (
<<<<<<< HEAD
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
=======
    <div className="bg-card border border-news-border rounded-md overflow-hidden h-full flex flex-col">
      <div className="bg-primary px-4 py-3">
        <h2 className="text-white font-bengali font-bold text-base">
          সিলেট বিশেষ
        </h2>
      </div>
      <Link to={`/news/${news.id}`} className="flex-1 group">
>>>>>>> parent of d4c6ccf (Add password reset, user model, and templates)
        <div className="relative overflow-hidden">
          <img
            src={news.image}
            alt={news.title}
<<<<<<< HEAD
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
=======
            className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <span className="inline-block px-2 py-0.5 bg-primary text-primary-foreground text-xs font-bengali rounded mb-2">
              {news.categoryBn}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bengali font-bold text-sm text-news-headline leading-snug group-hover:text-primary transition-colors line-clamp-3 mb-2">
            {news.title}
          </h3>
          <p className="text-news-subtext text-xs line-clamp-2 mb-2 font-bengali">
            {news.excerpt}
          </p>
          <span className="text-xs text-news-subtext flex items-center gap-1 font-bengali">
            <Calendar className="w-3 h-3" />
            {news.date}
          </span>
        </div>
>>>>>>> parent of d4c6ccf (Add password reset, user model, and templates)
      </Link>
    </div>
  );
};

export default SylhetSpecial;
