import { Calendar, Facebook, Thermometer, Youtube } from "lucide-react";

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
    <div className="border-b border-white/10 bg-[linear-gradient(90deg,#0f172a_0%,#7f1d1d_55%,#111827_100%)] text-white/90">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-4 py-2 text-sm">
        <div className="flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/80">
            Live Desk
          </span>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-white/70" />
            <span className="font-bengali">{banglaDate}</span>
          </div>
          <div className="hidden items-center gap-1.5 md:flex">
            <Calendar className="h-4 w-4 text-white/70" />
            <span>{englishDate}</span>
          </div>
          <div className="hidden items-center gap-1.5 sm:flex">
            <Thermometer className="h-4 w-4 text-white/70" />
            <span className="font-bengali">Sylhet 28°C</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://www.facebook.com/share/1FdPD4PdC9/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-white/90 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Sylhety News Facebook page"
          >
            <Facebook className="h-4 w-4" />
            <span className="text-xs font-bengali">Facebook</span>
          </a>
          <a
            href="https://youtube.com/@sylhetynews?si=6bOtmMjZYO3Kn1SF"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-white/90 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Sylhety News YouTube channel"
          >
            <Youtube className="h-4 w-4" />
            <span className="text-xs font-bengali">YouTube</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
