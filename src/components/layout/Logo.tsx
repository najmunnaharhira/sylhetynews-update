import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="bg-card py-4 border-b border-news-border">
      <div className="container mx-auto px-4 flex items-center justify-center">
        <Link to="/" className="flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary font-bengali">
            সিলেটি নিউজ
          </h1>
          <p className="text-sm text-news-subtext font-bengali">
            সিলেটের সর্বাধিক পঠিত অনলাইন সংবাদপত্র
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Logo;
