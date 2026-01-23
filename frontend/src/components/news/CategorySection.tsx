import { Link } from "react-router-dom";
import { NewsItem } from "@/data/newsData";
import NewsCard from "./NewsCard";
import { ChevronRight } from "lucide-react";

interface CategorySectionProps {
  title: string;
  news: NewsItem[];
  categoryPath: string;
}

const CategorySection = ({ title, news, categoryPath }: CategorySectionProps) => {
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title">{title}</h2>
        <Link
          to={categoryPath}
          className="text-sm text-primary font-bengali flex items-center gap-1 hover:underline"
        >
          আরও দেখুন
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.slice(0, 3).map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
