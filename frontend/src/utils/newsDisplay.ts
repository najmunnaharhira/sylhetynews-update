/**
 * Normalize NewsArticle (from Firebase/API) to the display shape (NewsItem) used by
 * LeadNews, NewsCard, SylhetSpecial, etc. so admin-uploaded news and photos show on the frontend.
 */

import type { NewsArticle } from "@/types/news";
import type { NewsItem } from "@/data/newsData";

export const categorySlugToBn: Record<string, string> = {
  sylhet: "সিলেট",
  national: "জাতীয়",
  politics: "রাজনীতি",
  mofoshol: "মফস্বল সংবাদ",
  international: "আন্তর্জাতিক",
  economy: "অর্থনীতি ও বাণিজ্য",
  entertainment: "বিনোদন",
  expat: "প্রবাস",
  sports: "খেলাধুলা",
  lifestyle: "লাইফ-স্টাইল",
  technology: "তথ্য ও প্রযুক্তি",
  law: "আইন ও আদালত",
  opinion: "মতামত",
  others: "অন্যান্য",
};

function formatDateBn(date: Date): string {
  return date.toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Convert NewsArticle (Firebase/API) to NewsItem shape for display on homepage, category pages, and detail. */
export function articleToDisplayItem(article: NewsArticle): NewsItem {
  const createdAt =
    article.createdAt instanceof Date
      ? article.createdAt
      : new Date(article.createdAt as unknown as string);
  return {
    id: article.id,
    title: article.title,
    excerpt: article.summary || article.content?.slice(0, 120) || "",
    content: article.content || "",
    image: article.imageUrl || "",
    category: article.category || "others",
    categoryBn: categorySlugToBn[article.category] || article.category || "অন্যান্য",
    district: article.district || "",
    date: formatDateBn(createdAt),
    author: article.author || "সিলেটি নিউজ",
    featured: article.featured,
  };
}

/** Normalize either NewsArticle or NewsItem for display (pass-through if already NewsItem). */
export function toDisplayItem(
  item: NewsArticle | NewsItem
): NewsItem {
  if ("image" in item && typeof (item as NewsItem).image === "string") {
    return item as NewsItem;
  }
  return articleToDisplayItem(item as NewsArticle);
}
