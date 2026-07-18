import { Facebook, Twitter, Youtube, Mail, Thermometer, Calendar, Languages } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

const TopBar = () => {
  const { lang, setLang } = useI18n();
  const today = new Date();
  const date = today.toLocaleDateString(lang === "bn" ? "bn-BD" : "en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-news-slate text-white/90">
      <div className="container mx-auto px-4 py-2 flex flex-wrap items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-white/70" /><span className="font-bengali">{date}</span></div>
          <div className="hidden sm:flex items-center gap-1.5"><Thermometer className="w-4 h-4 text-white/70" /><span className="font-bengali">{lang === "bn" ? "কুমিল্লা ২৮°সে" : "Cumilla 28°C"}</span></div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "bn" ? "en" : "bn")}
            className="flex items-center gap-1 text-white/80 hover:text-white text-xs px-2 py-1 rounded hover:bg-white/10"
            aria-label="Toggle language"
          >
            <Languages className="w-3.5 h-3.5" />
            {lang === "bn" ? "EN" : "বাং"}
          </button>
          <a href="https://www.facebook.com/share/1FdPD4PdC9/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white" aria-label="Facebook"><Facebook className="w-4 h-4" /></a>
          <a href="#" className="text-white/80 hover:text-white" aria-label="Twitter"><Twitter className="w-4 h-4" /></a>
          <a href="#" className="text-white/80 hover:text-white" aria-label="Youtube"><Youtube className="w-4 h-4" /></a>
          <a href="mailto:info@cumillanews.com" className="text-white/80 hover:text-white" aria-label="Email"><Mail className="w-4 h-4" /></a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
