import { Link } from "react-router-dom";
import { Calendar, Eye } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import type { Article } from "@/types/article";
import { formatDate, banglaDigits } from "@/lib/format";

interface Props {
  news: Article;
  variant?: "default" | "compact" | "horizontal";
}

const fallbackImg = "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&q=80";

const ArticleCard = ({ news, variant = "default" }: Props) => {
  const { lang } = useI18n();
  const title = lang === "en" && news.title_en ? news.title_en : news.title_bn;
  const cat = lang === "en" ? news.category?.name_en : news.category?.name_bn;
  const date = formatDate(news.published_at, lang);
  const img = news.image_url || fallbackImg;
  const href = `/news/${news.slug}`;

  if (variant === "compact") {
    return (
      <article className="group">
        <Link to={href} className="flex gap-3 p-2 rounded-sm hover:bg-secondary transition-colors">
          <img src={img} alt={title} loading="lazy" className="w-20 h-16 object-cover rounded-sm flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h3 className="news-headline text-sm line-clamp-2 group-hover:text-primary transition-colors">{title}</h3>
            <span className="text-xs text-news-subtext flex items-center gap-1 mt-1">
              <Calendar className="w-3 h-3" />
              {date}
            </span>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === "horizontal") {
    return (
      <article className="news-card group">
        <Link to={href} className="flex flex-col sm:flex-row gap-4">
          <div className="relative overflow-hidden sm:w-1/3 flex-shrink-0">
            <img src={img} alt={title} loading="lazy" className="w-full h-40 sm:h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            {cat && (
              <div className="absolute top-2 left-2">
                <span className="news-category-tag text-xs">{cat}</span>
              </div>
            )}
          </div>
          <div className="p-4 sm:p-0 sm:py-2 sm:pr-4 flex-1">
            <h3 className="news-headline text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">{title}</h3>
            {news.summary && <p className="news-subtext text-sm mb-3 line-clamp-2">{news.summary}</p>}
            <div className="flex items-center gap-3 text-xs text-news-subtext">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{date}</span>
              <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{lang === "bn" ? banglaDigits(news.views) : news.views}</span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="news-card group">
      <Link to={href} className="block">
        <div className="relative overflow-hidden">
          <img src={img} alt={title} loading="lazy" className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
          {cat && (
            <div className="absolute top-2 left-2">
              <span className="news-category-tag text-xs">{cat}</span>
            </div>
          )}
        </div>
        <div className="p-3">
          <h3 className="news-headline text-base mb-2 group-hover:text-primary transition-colors line-clamp-2">{title}</h3>
          <span className="text-xs text-news-subtext flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {date}
          </span>
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;
