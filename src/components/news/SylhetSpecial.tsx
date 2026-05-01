import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import type { Article } from "@/types/article";
import { useI18n } from "@/contexts/I18nContext";
import { formatDate } from "@/lib/format";

const fallbackImg = "https://images.unsplash.com/photo-1518976024611-28bf4b48222e?w=800&q=80";

const SylhetSpecial = ({ news }: { news: Article | null | undefined }) => {
  const { lang, t } = useI18n();
  if (!news) {
    return <div className="bg-muted rounded-md h-full min-h-[300px] animate-pulse" />;
  }
  const title = lang === "en" && news.title_en ? news.title_en : news.title_bn;
  const cat = lang === "en" ? news.category?.name_en : news.category?.name_bn;

  return (
    <div className="bg-card border border-news-border rounded-md overflow-hidden h-full flex flex-col">
      <div className="bg-primary px-4 py-3">
        <h2 className="text-white font-bengali font-bold text-base">{t("sylhetSpecial")}</h2>
      </div>
      <Link to={`/news/${news.slug}`} className="flex-1 group">
        <div className="relative overflow-hidden">
          <img src={news.image_url || fallbackImg} alt={title} loading="lazy" className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          {cat && (
            <div className="absolute bottom-3 left-3 right-3">
              <span className="inline-block px-2 py-0.5 bg-primary text-primary-foreground text-xs font-bengali rounded mb-2">{cat}</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bengali font-bold text-sm text-news-headline leading-snug group-hover:text-primary transition-colors line-clamp-3 mb-2">{title}</h3>
          {news.summary && <p className="text-news-subtext text-xs line-clamp-2 mb-2 font-bengali">{news.summary}</p>}
          <span className="text-xs text-news-subtext flex items-center gap-1 font-bengali">
            <Calendar className="w-3 h-3" />{formatDate(news.published_at, lang)}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default SylhetSpecial;
