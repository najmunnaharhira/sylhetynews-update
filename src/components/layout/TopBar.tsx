import { Facebook, Twitter, Youtube, Mail, MapPin, Calendar } from "lucide-react";

const TopBar = () => {
  const today = new Date();
  const banglaDate = today.toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-secondary border-b border-news-border">
      <div className="container mx-auto px-4 py-2 flex flex-wrap items-center justify-between text-sm">
        <div className="flex items-center gap-4 text-news-subtext">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{banglaDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>সিলেট, বাংলাদেশ</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://www.facebook.com/share/1FdPD4PdC9/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-news-subtext hover:text-primary transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="w-4 h-4" />
          </a>
          <a
            href="#"
            className="text-news-subtext hover:text-primary transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href="#"
            className="text-news-subtext hover:text-primary transition-colors"
            aria-label="Youtube"
          >
            <Youtube className="w-4 h-4" />
          </a>
          <a
            href="mailto:info@sylhetview24.news"
            className="text-news-subtext hover:text-primary transition-colors"
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
