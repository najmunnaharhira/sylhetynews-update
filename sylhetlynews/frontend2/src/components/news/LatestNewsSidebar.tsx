import { NewsItem } from "@/data/newsData";
import NewsCard from "./NewsCard";

interface LatestNewsSidebarProps {
  news: NewsItem[];
}

const LatestNewsSidebar = ({ news }: LatestNewsSidebarProps) => {
  return (
    <aside className="bg-card border border-news-border rounded-sm">
      <div className="bg-primary text-primary-foreground px-4 py-2">
        <h2 className="font-bengali font-semibold">সর্বশেষ সংবাদ</h2>
      </div>
      <div className="p-2 divide-y divide-news-border">
        {news.map((item) => (
          <NewsCard key={item.id} news={item} variant="compact" />
        ))}
      </div>
    </aside>
  );
};

export default LatestNewsSidebar;
