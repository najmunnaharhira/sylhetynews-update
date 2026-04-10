import { Facebook, Twitter, Youtube, Mail, Thermometer, Calendar } from "lucide-react";

const TopBar = () => {
  const today = new Date();
  const banglaDate = today.toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-news-slate text-white/90">
      <div className="container mx-auto px-4 py-2 flex flex-wrap items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-white/70" />
            <span className="font-bengali">{banglaDate}</span>
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
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="w-4 h-4" />
          </a>
          <a
            href="#"
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href="#"
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Youtube"
          >
            <Youtube className="w-4 h-4" />
          </a>
          <a
            href="mailto:info@sylhetynews.com"
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
