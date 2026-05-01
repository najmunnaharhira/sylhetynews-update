import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { Article } from "@/types/article";
import ArticleCard from "./ArticleCard";
import { useI18n } from "@/contexts/I18nContext";

interface Props {
  title: string;
  news: Article[];
  categoryPath: string;
}

const CategorySection = ({ title, news, categoryPath }: Props) => {
  const { t } = useI18n();
  if (!news?.length) return null;
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title">{title}</h2>
        <Link to={categoryPath} className="text-sm text-primary font-bengali flex items-center gap-1 hover:underline">
          {t("seeMore")}
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.slice(0, 3).map((item) => (
          <ArticleCard key={item.id} news={item} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
