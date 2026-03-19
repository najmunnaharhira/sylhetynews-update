import { Clock3 } from "lucide-react";
import { NewsItem } from "@/data/newsData";
import NewsCard from "./NewsCard";

interface LatestNewsSidebarProps {
  news: NewsItem[];
}

const LatestNewsSidebar = ({ news }: LatestNewsSidebarProps) => {
  return (
    <aside className="portal-soft-panel overflow-hidden">
      <div className="flex items-center justify-between border-b border-news-border/70 px-5 py-4">
        <div>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Live Feed
          </p>
          <h2 className="mt-1 text-lg font-bold text-news-headline">Latest News</h2>
        </div>
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/8 text-primary">
          <Clock3 className="h-4 w-4" />
        </span>
      </div>
      <div className="divide-y divide-news-border/60 p-3">
        {news.map((item) => (
          <NewsCard key={item.id} news={item} variant="compact" />
        ))}
      </div>
    </aside>
  );
};

export default LatestNewsSidebar;
