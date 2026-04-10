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
  { name: "ফটোকার্ড", path: "/photocard" },
];

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-primary sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`news-nav-item ${
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
        <div className="md:hidden flex items-center justify-between py-2">
          <span className="text-primary-foreground font-bengali font-semibold">
            মেনু
          </span>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-primary-foreground p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-news-dark-red">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block news-nav-item ${
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
