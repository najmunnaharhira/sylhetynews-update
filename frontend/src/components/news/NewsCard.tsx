import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { NewsItem } from "@/data/newsData";

interface NewsCardProps {
  news: NewsItem;
  variant?: "default" | "compact" | "horizontal";
}

<<<<<<< HEAD
const detailsButtonClassName =
  "inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground";

=======
>>>>>>> parent of d4c6ccf (Add password reset, user model, and templates)
const NewsCard = ({ news, variant = "default" }: NewsCardProps) => {
  if (variant === "compact") {
    return (
      <article className="group">
        <Link
          to={`/news/${news.id}`}
<<<<<<< HEAD
          className="flex gap-3 rounded-[22px] border border-transparent p-3 transition-all duration-300 hover:border-primary/10 hover:bg-white/80 hover:shadow-sm"
=======
          className="flex gap-3 p-2 rounded-sm hover:bg-secondary transition-colors"
>>>>>>> parent of d4c6ccf (Add password reset, user model, and templates)
        >
          <img
            src={news.image}
            alt={news.title}
<<<<<<< HEAD
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
=======
            className="w-20 h-16 object-cover rounded-sm flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="news-headline text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {news.title}
            </h3>
            <span className="text-xs text-news-subtext flex items-center gap-1 mt-1">
              <Calendar className="w-3 h-3" />
>>>>>>> parent of d4c6ccf (Add password reset, user model, and templates)
              {news.date}
            </span>
          </div>
        </Link>
<<<<<<< HEAD
=======
        <div className="px-2 pb-2">
          <Link
            to={`/photocard?newsId=${news.id}`}
            className="text-xs text-primary hover:underline font-bengali"
          >
            ফটোকার্ড তৈরি করুন
          </Link>
        </div>
>>>>>>> parent of d4c6ccf (Add password reset, user model, and templates)
      </article>
    );
  }

  if (variant === "horizontal") {
    return (
      <article className="news-card group">
<<<<<<< HEAD
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
=======
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
>>>>>>> parent of d4c6ccf (Add password reset, user model, and templates)
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
<<<<<<< HEAD
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
=======
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
>>>>>>> parent of d4c6ccf (Add password reset, user model, and templates)
    </article>
  );
};

export default NewsCard;
