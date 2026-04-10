import { Link } from "react-router-dom";
import { Facebook, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background mt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold font-bengali mb-4 text-primary">
              সিলেট ভিউ ২৪
            </h3>
            <p className="text-sm font-bengali opacity-80 leading-relaxed">
              সিলেট ভিউ ২৪ হলো সিলেটের একটি জনপ্রিয় অনলাইন সংবাদ পোর্টাল। আমরা সিলেট, বাংলাদেশ এবং আন্তর্জাতিক সব খবর প্রকাশ করি।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold font-bengali mb-4">দ্রুত লিংক</h3>
            <ul className="space-y-2 font-bengali text-sm">
              <li>
                <Link to="/" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">
                  প্রচ্ছদ
                </Link>
              </li>
              <li>
                <Link to="/sylhet" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">
                  সিলেট
                </Link>
              </li>
              <li>
                <Link to="/national" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">
                  জাতীয়
                </Link>
              </li>
              <li>
                <Link to="/photocard" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">
                  ফটোকার্ড জেনারেটর
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold font-bengali mb-4">যোগাযোগ</h3>
            <ul className="space-y-3 font-bengali text-sm">
              <li className="flex items-center gap-2 opacity-80">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>সিলেট, বাংলাদেশ</span>
              </li>
              <li className="flex items-center gap-2 opacity-80">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+৮৮০ ১৭১২ ৩৪৫ ৬৭৮</span>
              </li>
              <li className="flex items-center gap-2 opacity-80">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@sylhetview24.news</span>
              </li>
            </ul>
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://www.facebook.com/share/1FdPD4PdC9/"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-80 hover:opacity-100 hover:text-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-6 text-center font-bengali text-sm opacity-60">
          <p>© {new Date().getFullYear()} সিলেট ভিউ ২৪। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
