import { Link } from "react-router-dom";
import { Facebook, Mail, Phone, MapPin, Youtube } from "lucide-react";
import chillekothaLogo from "@/assets/photo of portart Development.jpeg";

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
              সিলেটি নিউজ হলো উত্তর সিলেটের জনপ্রিয় অনলাইন সংবাদ পোর্টাল। আমরা সিলেট, বাংলাদেশ এবং আন্তর্জাতিক সব খবর প্রকাশ করি।
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
                <Link to="/politics" className="text-white/80 hover:text-primary transition-colors">
                  রাজনীতি
                </Link>
              </li>
              <li>
                <Link to="/international" className="text-white/80 hover:text-primary transition-colors">
                  আন্তর্জাতিক
                </Link>
              </li>
              <li>
                <Link to="/economy" className="text-white/80 hover:text-primary transition-colors">
                  অর্থনীতি ও বাণিজ্য
                </Link>
              </li>
              <li>
                <Link to="/technology" className="text-white/80 hover:text-primary transition-colors">
                  তথ্য ও প্রযুক্তি
                </Link>
              </li>
              <li>
                <Link to="/photocard" className="text-white/80 hover:text-primary transition-colors">
                  ফটোকার্ড জেনারেটর
                </Link>
              </li>
              <li>
                <Link to="/districts" className="text-white/80 hover:text-primary transition-colors">
                  জেলা
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-white/80 hover:text-primary transition-colors">
                  টিম
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold font-bengali mb-4 text-white">যোগাযোগ</h3>
            <ul className="space-y-3 font-bengali text-sm">
              <li className="text-white/80">
                উপদেষ্টা: ড. জিয়াউর রহমান
              </li>
              <li className="text-white/80">
                সম্পাদক ও প্রকাশক: রুহুল আমিন বাবুল
              </li>
              <li className="text-white/80">
                নির্বাহী সম্পাদক: মাহমুদুল হাসান নাঈম
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <MapPin className="w-4 h-4 flex-shrink-0 text-primary" />
                <span>অফিস: আখলু মিয়া মার্কেট, কোম্পানীগঞ্জ, সিলেট।</span>
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <Phone className="w-4 h-4 flex-shrink-0 text-primary" />
                <span>মোবাইল: +৮৮০১৬২০-৭৫৬৮২৭</span>
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <Mail className="w-4 h-4 flex-shrink-0 text-primary" />
                <span>sylhetynews.com@gmail.com</span>
              </li>
              <li className="text-white/80">
                ফেসবুক গ্রুপ:{" "}
                <a
                  href="https://www.facebook.com/share/g/17cyNBkTK8/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-primary"
                >
                  যুক্ত হন
                </a>
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
              <a
                href="https://youtube.com/@sylhetynews?si=6bOtmMjZYO3Kn1SF"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-primary hover:text-white transition-all"
                aria-label="Sylhety News YouTube channel"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center font-bengali text-sm text-white/60">
          <p>© {new Date().getFullYear()} সিলেটি নিউজ। সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="mt-2 inline-flex items-center justify-center gap-2">
            <span>Portal Development: Chillekotha</span>
            <img
              src={chillekothaLogo}
              alt="Chillekotha logo"
              className="h-6 w-6 rounded-sm object-contain bg-white/90 p-0.5"
              loading="lazy"
            />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
