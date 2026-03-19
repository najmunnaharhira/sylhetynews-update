import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "à¦ªà§à¦°à¦šà§à¦›à¦¦", path: "/" },
  { name: "à¦¸à¦¿à¦²à§‡à¦Ÿ", path: "/sylhet" },
  { name: "à¦œà¦¾à¦¤à§€à¦¯à¦¼", path: "/national" },
  { name: "à¦°à¦¾à¦œà¦¨à§€à¦¤à¦¿", path: "/politics" },
  { name: "à¦®à¦«à¦¸à§à¦¬à¦² à¦¸à¦‚à¦¬à¦¾à¦¦", path: "/mofoshol" },
  { name: "à¦†à¦¨à§à¦¤à¦°à§à¦œà¦¾à¦¤à¦¿à¦•", path: "/international" },
  { name: "à¦…à¦°à§à¦¥à¦¨à§€à¦¤à¦¿ à¦“ à¦¬à¦¾à¦£à¦¿à¦œà§à¦¯", path: "/economy" },
  { name: "à¦¬à¦¿à¦¨à§‹à¦¦à¦¨", path: "/entertainment" },
  { name: "à¦ªà§à¦°à¦¬à¦¾à¦¸", path: "/expat" },
  { name: "à¦–à§‡à¦²à¦¾à¦§à§à¦²à¦¾", path: "/sports" },
  { name: "à¦²à¦¾à¦‡à¦«-à¦¸à§à¦Ÿà¦¾à¦‡à¦²", path: "/lifestyle" },
  { name: "à¦¤à¦¥à§à¦¯ à¦“ à¦ªà§à¦°à¦¯à§à¦•à§à¦¤à¦¿", path: "/technology" },
  { name: "à¦†à¦‡à¦¨ à¦“ à¦†à¦¦à¦¾à¦²à¦¤", path: "/law" },
  { name: "à¦®à¦¤à¦¾à¦®à¦¤", path: "/opinion" },
  { name: "à¦…à¦¨à§à¦¯à¦¾à¦¨à§à¦¯", path: "/others" },
  { name: "à¦œà§‡à¦²à¦¾", path: "/districts" },
  { name: "à¦«à¦Ÿà§‹à¦•à¦¾à¦°à§à¦¡", path: "/photocard" },
  { name: "à¦Ÿà¦¿à¦®", path: "/team" },
];

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-y border-white/10 bg-[linear-gradient(90deg,rgba(127,29,29,0.98),rgba(153,27,27,0.95),rgba(127,29,29,0.98))] shadow-[0_14px_40px_rgba(127,29,29,0.18)] backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="hidden md:flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`news-nav-item whitespace-nowrap border ${
                  isActive
                    ? "border-white/20 bg-white/18 shadow-[0_10px_24px_rgba(15,23,42,0.15)]"
                    : "border-transparent"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center justify-between py-3 md:hidden">
          <span className="font-display text-sm font-semibold uppercase tracking-[0.28em] text-white/80">
            Explore
          </span>
          <button
            onClick={() => setMobileMenuOpen((current) => !current)}
            className="rounded-full border border-white/10 bg-white/10 p-2 text-primary-foreground transition-colors hover:bg-white/15"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="grid gap-2 border-t border-white/10 pb-4 pt-2 md:hidden">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-2xl px-4 py-3 text-sm font-medium text-primary-foreground transition-colors ${
                  location.pathname === item.path ? "bg-white/16" : "hover:bg-white/10"
                }`}
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
