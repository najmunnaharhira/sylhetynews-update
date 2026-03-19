import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { NewsItem } from "@/data/newsData";

interface TopStoriesProps {
  news: NewsItem[];
}

const TopStories = ({ news }: TopStoriesProps) => {
  return (
    <div className="portal-soft-panel overflow-hidden">
      <div className="bg-[linear-gradient(135deg,#0f172a_0%,#991b1b_100%)] px-5 py-4 text-white">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
          Most Read
        </p>
        <h2 className="mt-1 text-lg font-bold">Top Stories</h2>
      </div>

      <div className="p-3">
        {news.slice(0, 5).map((item, index) => (
          <Link
            key={item.id}
            to={`/news/${item.id}`}
            className="group flex items-start gap-4 rounded-[22px] px-3 py-4 transition-all duration-300 hover:bg-primary/5"
          >
            <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/8 font-display text-base font-extrabold text-primary">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="min-w-0 flex-1">
              <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-news-subtext">
                {item.categoryBn}
              </span>
              <h3 className="mt-2 line-clamp-2 text-sm font-semibold leading-7 text-news-headline transition-colors group-hover:text-primary">
                {item.title}
              </h3>
              <div className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Open Story
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopStories;
