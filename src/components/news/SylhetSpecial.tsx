import { Link } from "react-router-dom";
import { NewsItem } from "@/data/newsData";
import { Calendar } from "lucide-react";

interface SylhetSpecialProps {
  news: NewsItem;
}

const SylhetSpecial = ({ news }: SylhetSpecialProps) => {
  return (
    <div className="bg-card border border-news-border rounded-md overflow-hidden h-full flex flex-col">
      <div className="bg-primary px-4 py-3">
        <h2 className="text-white font-bengali font-bold text-base">
          সিলেট বিশেষ
        </h2>
      </div>
      <Link to={`/news/${news.id}`} className="flex-1 group">
        <div className="relative overflow-hidden">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <span className="inline-block px-2 py-0.5 bg-primary text-primary-foreground text-xs font-bengali rounded mb-2">
              {news.categoryBn}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bengali font-bold text-sm text-news-headline leading-snug group-hover:text-primary transition-colors line-clamp-3 mb-2">
            {news.title}
          </h3>
          <p className="text-news-subtext text-xs line-clamp-2 mb-2 font-bengali">
            {news.excerpt}
          </p>
          <span className="text-xs text-news-subtext flex items-center gap-1 font-bengali">
            <Calendar className="w-3 h-3" />
            {news.date}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default SylhetSpecial;
