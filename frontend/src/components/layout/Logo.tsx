import { useState } from "react";
import { Link } from "react-router-dom";
import { Camera, Search, Sparkles } from "lucide-react";
import SearchModal from "@/components/search/SearchModal";

const logoImage = "/logo-main.jpeg";

const Logo = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <div className="border-b border-news-border/70 bg-[radial-gradient(circle_at_top,rgba(185,28,28,0.08),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,255,255,0.82))]">
        <div className="container mx-auto px-4 py-6">
          <div className="portal-panel relative overflow-hidden px-4 py-5 sm:px-6">
            <div className="pointer-events-none absolute -right-20 top-0 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-orange-400/10 blur-3xl" />

            <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  Premium News Portal
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-news-subtext shadow-sm">
                  <Camera className="h-3.5 w-3.5 text-primary" />
                  Visual Storytelling
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 lg:order-3">
                <button
                  onClick={() => setSearchOpen(true)}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-news-subtext shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>

              <Link to="/" className="mx-auto flex min-w-0 flex-col items-center text-center lg:order-2">
                <div className="rounded-[28px] border border-white/70 bg-white/90 px-5 py-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
                  <img src={logoImage} alt="Sylhety News" className="h-16 w-auto md:h-20" />
                </div>
                <p className="mt-3 max-w-2xl text-xs tracking-[0.28em] text-news-subtext uppercase font-display">
                  Sylhet, Bangladesh, World, and fast visual updates
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Logo;
