import { Link } from "react-router-dom";
import logoImage from "@/assets/logo.jpeg";

const Logo = () => {
  return (
    <div className="bg-card py-4 border-b border-news-border">
      <div className="container mx-auto px-4 flex items-center justify-center">
        <Link to="/" className="flex flex-col items-center">
          <img 
            src={logoImage} 
            alt="সিলেটি নিউজ" 
            className="h-16 md:h-20 w-auto"
          />
          <p className="text-sm text-news-subtext font-bengali mt-1">
            সিলেটের সর্বাধিক পঠিত অনলাইন সংবাদপত্র
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Logo;
