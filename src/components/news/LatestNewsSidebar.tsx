import type { Article } from "@/types/article";
import ArticleCard from "./ArticleCard";
import { useI18n } from "@/contexts/I18nContext";

const LatestNewsSidebar = ({ news }: { news: Article[] }) => {
  const { t } = useI18n();
  return (
    <aside className="bg-card border border-news-border rounded-sm">
      <div className="bg-primary text-primary-foreground px-4 py-2">
        <h2 className="font-bengali font-semibold">{t("latestNews")}</h2>
      </div>
      <div className="p-2 divide-y divide-news-border">
        {news.map((item) => (
          <ArticleCard key={item.id} news={item} variant="compact" />
        ))}
      </div>
    </aside>
  );
};

export default LatestNewsSidebar;
