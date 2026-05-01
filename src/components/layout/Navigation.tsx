import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/contexts/I18nContext";

const Navigation = () => {
  const location = useLocation();
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  const items = [
    { name: t("home"), path: "/" },
    { name: t("sylhet"), path: "/sylhet" },
    { name: t("national"), path: "/national" },
    { name: t("politics"), path: "/politics" },
    { name: t("expat"), path: "/expat" },
    { name: t("sports"), path: "/sports" },
    { name: t("opinion"), path: "/opinion" },
    { name: t("photocard"), path: "/photocard" },
  ];

  return (
    <nav className="bg-primary sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="hidden md:flex items-center justify-center">
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-5 py-3 text-primary-foreground font-bengali font-medium text-sm tracking-wide transition-all hover:bg-news-dark-red ${location.pathname === item.path ? "bg-news-dark-red" : ""}`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="md:hidden flex items-center justify-between py-3">
          <span className="text-primary-foreground font-bengali font-semibold">{t("menu")}</span>
          <button onClick={() => setOpen(!open)} className="text-primary-foreground p-2 hover:bg-news-dark-red rounded" aria-label="Toggle menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-news-dark-red pb-2">
            {items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 text-primary-foreground font-bengali font-medium text-sm hover:bg-news-dark-red ${location.pathname === item.path ? "bg-news-dark-red" : ""}`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
