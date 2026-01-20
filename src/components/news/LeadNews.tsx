import { Link } from "react-router-dom";
import { NewsItem } from "@/data/newsData";
import { Calendar, User } from "lucide-react";

interface LeadNewsProps {
  news: NewsItem;
}

const LeadNews = ({ news }: LeadNewsProps) => {
  return (
    <article className="news-card group">
      <Link to={`/news/${news.id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-64 md:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className="news-category-tag">{news.categoryBn}</span>
          </div>
        </div>
        <div className="p-4">
          <h2 className="news-headline text-xl md:text-2xl mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {news.title}
          </h2>
          <p className="news-subtext mb-4 line-clamp-3">{news.excerpt}</p>
          <div className="flex items-center gap-4 text-xs text-news-subtext">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {news.date}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {news.author}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default LeadNews;
