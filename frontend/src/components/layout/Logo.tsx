import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import SearchModal from "@/components/search/SearchModal";

const logoImage = "/logo-main.jpeg";

const Logo = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <div className="bg-background py-4 border-b border-news-border">
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Spacer for balance */}
          <div className="w-10 hidden md:block" />
          
          {/* Centered Logo */}
          <Link to="/" className="flex flex-col items-center">
            <img 
              src={logoImage} 
              alt="Sylhety News" 
              className="h-14 md:h-16 w-auto"
            />
            <p className="text-xs text-news-subtext font-bengali mt-1 tracking-wide">
              সিলেটের সর্বাধিক পঠিত অনলাইন সংবাদপত্র
            </p>
          </Link>

          {/* Search Icon */}
          <button 
            onClick={() => setSearchOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-news-subtext" />
          </button>
        </div>
      </div>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Logo;
