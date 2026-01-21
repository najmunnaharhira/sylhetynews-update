import { Facebook, Thermometer, Calendar, Youtube } from "lucide-react";

const TopBar = () => {
  const today = new Date();
  const banglaDate = today.toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const englishDate = today.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-news-slate text-white/90">
      <div className="container mx-auto px-4 py-2 flex flex-wrap items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-white/70" />
            <span className="font-bengali">{banglaDate}</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-white/70" />
            <span>{englishDate}</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <Thermometer className="w-4 h-4 text-white/70" />
            <span className="font-bengali">সিলেট ২৮°সে</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://www.facebook.com/share/1FdPD4PdC9/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors"
            aria-label="Sylhety News Facebook page"
          >
            <Facebook className="w-4 h-4" />
            <span className="text-xs font-bengali">ফেসবুক পেজ</span>
          </a>
          <a
            href="https://youtube.com/@sylhetynews?si=6bOtmMjZYO3Kn1SF"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors"
            aria-label="Sylhety News YouTube channel"
          >
            <Youtube className="w-4 h-4" />
            <span className="text-xs font-bengali">ইউটিউব</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
