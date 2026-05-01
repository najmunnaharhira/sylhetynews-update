import { Link } from "react-router-dom";
import type { Article } from "@/types/article";
import { useI18n } from "@/contexts/I18nContext";
import { banglaDigits } from "@/lib/format";

const TopStories = ({ news }: { news: Article[] }) => {
  const { lang, t } = useI18n();
  return (
    <div className="bg-card border border-news-border rounded-md overflow-hidden h-full">
      <div className="bg-news-slate px-4 py-3">
        <h2 className="text-white font-bengali font-bold text-base">{t("topStories")}</h2>
      </div>
      <div className="divide-y divide-news-border">
        {news.slice(0, 5).map((item, index) => {
          const title = lang === "en" && item.title_en ? item.title_en : item.title_bn;
          const num = lang === "bn" ? banglaDigits(String(index + 1).padStart(2, "0")) : String(index + 1).padStart(2, "0");
          return (
            <Link key={item.id} to={`/news/${item.slug}`} className="block px-4 py-3 hover:bg-muted transition-colors group">
              <div className="flex gap-3">
                <span className="text-primary font-bold text-lg min-w-[24px]">{num}</span>
                <h3 className="font-bengali font-semibold text-sm text-news-headline leading-snug group-hover:text-primary transition-colors line-clamp-2">{title}</h3>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TopStories;
