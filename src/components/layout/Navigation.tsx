import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { name: "প্রচ্ছদ", path: "/" },
  { name: "সিলেট", path: "/sylhet" },
  { name: "জাতীয়", path: "/national" },
  { name: "রাজনীতি", path: "/politics" },
  { name: "প্রবাস", path: "/expat" },
  { name: "খেলাধুলা", path: "/sports" },
  { name: "মতামত", path: "/opinion" },
  { name: "ফটোকার্ড", path: "/photocard" },
];

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-primary sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-5 py-3 text-primary-foreground font-bengali font-medium text-sm tracking-wide transition-all duration-200 hover:bg-news-dark-red ${
                location.pathname === item.path
                  ? "bg-news-dark-red"
                  : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center justify-between py-3">
          <span className="text-primary-foreground font-bengali font-semibold">
            মেনু
          </span>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-primary-foreground p-2 hover:bg-news-dark-red rounded transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-news-dark-red pb-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 text-primary-foreground font-bengali font-medium text-sm transition-colors hover:bg-news-dark-red ${
                  location.pathname === item.path
                    ? "bg-news-dark-red"
                    : ""
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
