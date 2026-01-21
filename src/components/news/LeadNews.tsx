import { Link } from "react-router-dom";
import { NewsItem } from "@/data/newsData";
import { Calendar, User } from "lucide-react";

interface LeadNewsProps {
  news: NewsItem;
}

const LeadNews = ({ news }: LeadNewsProps) => {
  return (
    <article className="bg-card border border-news-border rounded-md overflow-hidden group h-full">
      <Link to={`/news/${news.id}`} className="block h-full">
        <div className="relative overflow-hidden">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-72 md:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm font-bengali font-medium rounded">
              {news.categoryBn}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
            <h1 className="text-white font-bengali font-bold text-xl md:text-2xl lg:text-3xl leading-tight mb-3 line-clamp-3 drop-shadow-lg">
              {news.title}
            </h1>
            <p className="text-white/80 font-bengali text-sm md:text-base mb-3 line-clamp-2 hidden sm:block">
              {news.excerpt}
            </p>
            <div className="flex items-center gap-4 text-xs text-white/70">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {news.date}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                {news.author}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default LeadNews;
