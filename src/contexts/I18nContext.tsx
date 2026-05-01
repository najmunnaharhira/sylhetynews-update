import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "bn" | "en";

const dict = {
  bn: {
    home: "প্রচ্ছদ",
    sylhet: "সিলেট",
    national: "জাতীয়",
    politics: "রাজনীতি",
    expat: "প্রবাস",
    sports: "খেলাধুলা",
    opinion: "মতামত",
    photocard: "ফটোকার্ড",
    latestNews: "সর্বশেষ সংবাদ",
    topStories: "শীর্ষ সংবাদ",
    sylhetSpecial: "সিলেট বিশেষ",
    trending: "জনপ্রিয়",
    seeMore: "আরও দেখুন",
    search: "সংবাদ অনুসন্ধান করুন...",
    noResults: "কোন সংবাদ পাওয়া যায়নি",
    backHome: "প্রচ্ছদে ফিরে যান",
    share: "শেয়ার",
    minRead: "মিনিট পড়া",
    views: "ভিউ",
    by: "লেখক",
    publishedOn: "প্রকাশিত",
    comments: "মন্তব্য",
    writeComment: "আপনার মন্তব্য লিখুন...",
    postComment: "মন্তব্য পোস্ট করুন",
    loginToComment: "মন্তব্য করতে লগইন করুন",
    newsletter: "নিউজলেটার সাবস্ক্রাইব করুন",
    newsletterDesc: "সর্বশেষ সংবাদ পেতে ইমেইল দিন",
    yourEmail: "আপনার ইমেইল",
    subscribe: "সাবস্ক্রাইব",
    subscribed: "ধন্যবাদ! আপনি সাবস্ক্রাইব করেছেন।",
    loadMore: "আরও দেখুন",
    loading: "লোড হচ্ছে...",
    noArticles: "এই বিভাগে কোনো সংবাদ নেই।",
    weather: "আবহাওয়া",
    menu: "মেনু",
    siteTagline: "সিলেটের সর্বাধিক পঠিত অনলাইন সংবাদপত্র",
  },
  en: {
    home: "Home",
    sylhet: "Sylhet",
    national: "National",
    politics: "Politics",
    expat: "Expat",
    sports: "Sports",
    opinion: "Opinion",
    photocard: "PhotoCard",
    latestNews: "Latest News",
    topStories: "Top Stories",
    sylhetSpecial: "Sylhet Special",
    trending: "Trending",
    seeMore: "See more",
    search: "Search news...",
    noResults: "No results found",
    backHome: "Back to home",
    share: "Share",
    minRead: "min read",
    views: "views",
    by: "By",
    publishedOn: "Published",
    comments: "Comments",
    writeComment: "Write your comment...",
    postComment: "Post comment",
    loginToComment: "Login to comment",
    newsletter: "Subscribe to newsletter",
    newsletterDesc: "Get the latest news in your inbox",
    yourEmail: "Your email",
    subscribe: "Subscribe",
    subscribed: "Thanks! You are subscribed.",
    loadMore: "Load more",
    loading: "Loading...",
    noArticles: "No articles in this category.",
    weather: "Weather",
    menu: "Menu",
    siteTagline: "Sylhet's most-read online newspaper",
  },
} as const;

type Key = keyof typeof dict.bn;

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: Key) => string;
}

const Ctx = createContext<I18nCtx>({ lang: "bn", setLang: () => {}, t: (k) => k });

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(
    (localStorage.getItem("lang") as Lang) || "bn"
  );

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };

  const t = (key: Key) => dict[lang][key] ?? dict.bn[key];

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
};

export const useI18n = () => useContext(Ctx);
