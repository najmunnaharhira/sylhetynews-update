import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

const breakingNews = [
  "à¦¸à¦¿à¦²à§‡à¦Ÿà§‡ à¦­à¦¾à¦°à¦¿ à¦¬à§ƒà¦·à§à¦Ÿà¦¿à¦ªà¦¾à¦¤à§‡à¦° à¦¸à¦¤à¦°à§à¦•à¦¤à¦¾ à¦œà¦¾à¦°à¦¿",
  "à¦œà¦¾à¦¤à§€à¦¯à¦¼ à¦¸à¦‚à¦¸à¦¦à§‡ à¦¨à¦¤à§à¦¨ à¦¬à¦¿à¦² à¦ªà¦¾à¦¸",
  "à¦ªà§à¦°à¦¬à¦¾à¦¸à§€ à¦¬à¦¾à¦‚à¦²à¦¾à¦¦à§‡à¦¶à¦¿à¦¦à§‡à¦° à¦œà¦¨à§à¦¯ à¦¨à¦¤à§à¦¨ à¦­à¦¿à¦¸à¦¾ à¦¨à§€à¦¤à¦¿",
  "à¦¸à¦¿à¦²à§‡à¦Ÿ à¦¬à¦¿à¦­à¦¾à¦—à§‡ à¦¶à¦¿à¦•à§à¦·à¦¾ à¦…à¦¬à¦•à¦¾à¦ à¦¾à¦®à§‹ à¦‰à¦¨à§à¦¨à¦¯à¦¼à¦¨à§‡ à¦¬à¦°à¦¾à¦¦à§à¦¦",
  "à¦†à¦¨à§à¦¤à¦°à§à¦œà¦¾à¦¤à¦¿à¦• à¦•à§à¦°à¦¿à¦•à§‡à¦Ÿà§‡ à¦¬à¦¾à¦‚à¦²à¦¾à¦¦à§‡à¦¶à§‡à¦° à¦à¦¤à¦¿à¦¹à¦¾à¦¸à¦¿à¦• à¦œà¦¯à¦¼",
];

const BreakingNews = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % breakingNews.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="border-b border-news-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(255,255,255,0.72))]">
      <div className="container mx-auto px-4 py-3">
        <div className="portal-soft-panel flex items-center gap-4 px-4 py-3">
          <div className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground shadow-[0_12px_24px_rgba(185,28,28,0.2)]">
            <Zap className="h-4 w-4" />
            Trending Now
          </div>
          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="h-7 overflow-hidden">
              <div
                className="transition-transform duration-500"
                style={{ transform: `translateY(-${index * 28}px)` }}
              >
                {breakingNews.map((news, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex h-7 items-center gap-3 text-sm text-news-headline"
                  >
                    <span className="text-primary">●</span>
                    <span className="line-clamp-1 font-medium">{news}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;
