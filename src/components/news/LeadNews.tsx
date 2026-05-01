import { Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";
import type { Article } from "@/types/article";
import { useI18n } from "@/contexts/I18nContext";
import { formatDate } from "@/lib/format";

const fallbackImg = "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1200&q=80";

const LeadNews = ({ news }: { news: Article | null | undefined }) => {
  const { lang } = useI18n();
  if (!news) {
    return <div className="bg-muted rounded-md h-72 md:h-96 animate-pulse" />;
  }
  const title = lang === "en" && news.title_en ? news.title_en : news.title_bn;
  const cat = lang === "en" ? news.category?.name_en : news.category?.name_bn;

  return (
    <article className="bg-card border border-news-border rounded-md overflow-hidden group h-full">
      <Link to={`/news/${news.slug}`} className="block h-full">
        <div className="relative overflow-hidden">
          <img
            src={news.image_url || fallbackImg}
            alt={title}
            className="w-full h-72 md:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          {cat && (
            <div className="absolute top-4 left-4">
              <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm font-bengali font-medium rounded">
                {cat}
              </span>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
            <h1 className="text-white font-bengali font-bold text-xl md:text-2xl lg:text-3xl leading-tight mb-3 line-clamp-3 drop-shadow-lg">
              {title}
            </h1>
            {news.summary && (
              <p className="text-white/80 font-bengali text-sm md:text-base mb-3 line-clamp-2 hidden sm:block">
                {news.summary}
              </p>
            )}
            <div className="flex items-center gap-4 text-xs text-white/70">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{formatDate(news.published_at, lang)}</span>
              {news.author && <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{news.author}</span>}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default LeadNews;
