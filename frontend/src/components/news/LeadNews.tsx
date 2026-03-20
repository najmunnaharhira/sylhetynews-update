import { Link } from "react-router-dom";
import { ArrowRight, Calendar, User } from "lucide-react";
import { NewsItem } from "@/data/newsData";

interface LeadNewsProps {
  news: NewsItem;
}

const LeadNews = ({ news }: LeadNewsProps) => {
  return (
<<<<<<< HEAD
    <article className="news-card group flex h-full flex-col">
=======
    <article className="bg-card border border-news-border rounded-md overflow-hidden group h-full">
>>>>>>> parent of d4c6ccf (Add password reset, user model, and templates)
      <Link to={`/news/${news.id}`} className="block h-full">
        <div className="relative overflow-hidden">
          <img
            src={news.image}
            alt={news.title}
<<<<<<< HEAD
            className="h-[360px] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-[540px]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08),rgba(15,23,42,0.18),rgba(15,23,42,0.78))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_32%)]" />

          <div className="absolute left-5 right-5 top-5 flex items-start justify-between gap-3 md:left-6 md:right-6">
            <span className="news-category-tag">{news.categoryBn}</span>
            <span className="inline-flex items-center rounded-full border border-white/15 bg-black/25 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/80 backdrop-blur-md">
              Lead Story
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
            <div className="max-w-3xl rounded-[30px] border border-white/15 bg-black/25 p-5 shadow-[0_24px_64px_rgba(15,23,42,0.26)] backdrop-blur-xl md:p-7">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                Sylhet Front Page
              </p>
              <h1 className="mt-3 text-2xl font-bold leading-tight text-white drop-shadow-lg md:text-4xl">
                {news.title}
              </h1>
              <p className="mt-4 hidden max-w-2xl text-sm leading-7 text-white/80 md:block">
                {news.excerpt}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-white/70">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {news.date}
                </span>
                <span className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5" />
                  {news.author}
                </span>
              </div>
=======
            className="w-full h-72 md:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm font-bengali font-medium rounded">
              {news.categoryBn}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
            <h1 className="text-white font-bengali font-bold text-xl md:text-2xl lg:text-3xl leading-tight mb-3 line-clamp-3 drop-shadow-lg">
              {news.title}
            </h1>
            <p className="text-white/80 font-bengali text-sm md:text-base mb-3 line-clamp-2 hidden sm:block">
              {news.excerpt}
            </p>
            <div className="flex items-center gap-4 text-xs text-white/70">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {news.date}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                {news.author}
              </span>
>>>>>>> parent of d4c6ccf (Add password reset, user model, and templates)
            </div>
          </div>
        </div>
      </Link>
<<<<<<< HEAD

      <div className="flex items-center justify-between gap-4 border-t border-news-border/70 px-5 py-5 md:px-6">
        <p className="line-clamp-2 max-w-2xl text-sm leading-7 text-news-subtext">{news.excerpt}</p>
        <Link
          to={`/news/${news.id}`}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground shadow-[0_16px_32px_rgba(185,28,28,0.22)] transition-all hover:-translate-y-0.5"
        >
          Details About News
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
=======
>>>>>>> parent of d4c6ccf (Add password reset, user model, and templates)
    </article>
  );
};

export default LeadNews;
