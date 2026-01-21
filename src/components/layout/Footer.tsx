import { Link } from "react-router-dom";
import { Facebook, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-news-slate text-white mt-8">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold font-bengali mb-4 text-primary">
              সিলেটি নিউজ
            </h3>
            <p className="text-sm font-bengali text-white/80 leading-relaxed">
              সিলেটি নিউজ হলো সিলেটের একটি জনপ্রিয় অনলাইন সংবাদ পোর্টাল। আমরা সিলেট, বাংলাদেশ এবং আন্তর্জাতিক সব খবর প্রকাশ করি।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold font-bengali mb-4 text-white">দ্রুত লিংক</h3>
            <ul className="space-y-2 font-bengali text-sm">
              <li>
                <Link to="/" className="text-white/80 hover:text-primary transition-colors">
                  প্রচ্ছদ
                </Link>
              </li>
              <li>
                <Link to="/sylhet" className="text-white/80 hover:text-primary transition-colors">
                  সিলেট
                </Link>
              </li>
              <li>
                <Link to="/national" className="text-white/80 hover:text-primary transition-colors">
                  জাতীয়
                </Link>
              </li>
              <li>
                <Link to="/photocard" className="text-white/80 hover:text-primary transition-colors">
                  ফটোকার্ড জেনারেটর
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold font-bengali mb-4 text-white">যোগাযোগ</h3>
            <ul className="space-y-3 font-bengali text-sm">
              <li className="flex items-center gap-2 text-white/80">
                <MapPin className="w-4 h-4 flex-shrink-0 text-primary" />
                <span>সিলেট, বাংলাদেশ</span>
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <Phone className="w-4 h-4 flex-shrink-0 text-primary" />
                <span>+৮৮০ ১৭১২ ৩৪৫ ৬৭৮</span>
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <Mail className="w-4 h-4 flex-shrink-0 text-primary" />
                <span>info@sylhetynews.com</span>
              </li>
            </ul>
            <div className="flex items-center gap-4 mt-5">
              <a
                href="https://www.facebook.com/share/1FdPD4PdC9/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-primary hover:text-white transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-primary hover:text-white transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-primary hover:text-white transition-all">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center font-bengali text-sm text-white/60">
          <p>© {new Date().getFullYear()} সিলেটি নিউজ। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
