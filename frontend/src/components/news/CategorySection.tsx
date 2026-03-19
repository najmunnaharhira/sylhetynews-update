import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { NewsItem } from "@/data/newsData";
import NewsCard from "./NewsCard";

interface CategorySectionProps {
  title: string;
  news: NewsItem[];
  categoryPath: string;
}

const CategorySection = ({ title, news, categoryPath }: CategorySectionProps) => {
  return (
    <section className="portal-panel px-5 py-6 md:px-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Coverage Desk
          </p>
          <h2 className="section-title mt-2">{title}</h2>
        </div>
        <Link to={categoryPath} className="section-link">
          More Stories
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {news.slice(0, 3).map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
