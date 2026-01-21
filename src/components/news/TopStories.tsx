import { Link } from "react-router-dom";
import { NewsItem } from "@/data/newsData";

interface TopStoriesProps {
  news: NewsItem[];
}

const TopStories = ({ news }: TopStoriesProps) => {
  return (
    <div className="bg-card border border-news-border rounded-md overflow-hidden h-full">
      <div className="bg-news-slate px-4 py-3">
        <h2 className="text-white font-bengali font-bold text-base">
          শীর্ষ সংবাদ
        </h2>
      </div>
      <div className="divide-y divide-news-border">
        {news.slice(0, 5).map((item, index) => (
          <Link
            key={item.id}
            to={`/news/${item.id}`}
            className="block px-4 py-3 hover:bg-muted transition-colors group"
          >
            <div className="flex gap-3">
              <span className="text-primary font-bold text-lg min-w-[24px]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-bengali font-semibold text-sm text-news-headline leading-snug group-hover:text-primary transition-colors line-clamp-2">
                {item.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopStories;
