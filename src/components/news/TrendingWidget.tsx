import { Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";
import { useTrendingArticles } from "@/hooks/useArticles";
import { useI18n } from "@/contexts/I18nContext";
import { banglaDigits } from "@/lib/format";

const TrendingWidget = () => {
  const { lang, t } = useI18n();
  const { data: items = [] } = useTrendingArticles(5);

  return (
    <aside className="bg-card border border-news-border rounded-sm">
      <div className="bg-news-slate text-white px-4 py-2 flex items-center gap-2">
        <TrendingUp className="w-4 h-4" />
        <h2 className="font-bengali font-semibold">{t("trending")}</h2>
      </div>
      <ol className="p-2 divide-y divide-news-border">
        {items.map((a, i) => {
          const title = lang === "en" && a.title_en ? a.title_en : a.title_bn;
          const num = lang === "bn" ? banglaDigits(i + 1) : String(i + 1);
          return (
            <li key={a.id}>
              <Link to={`/news/${a.slug}`} className="flex gap-3 p-2 hover:bg-muted transition-colors group">
                <span className="text-2xl font-bold text-primary/60 min-w-[28px] leading-none">{num}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bengali text-sm font-semibold text-news-headline group-hover:text-primary line-clamp-2">{title}</h3>
                  <span className="text-xs text-news-subtext">
                    {lang === "bn" ? banglaDigits(a.views) : a.views} {t("views")}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
        {!items.length && (
          <li className="p-4 text-sm text-news-subtext font-bengali text-center">—</li>
        )}
      </ol>
    </aside>
  );
};

export default TrendingWidget;
