import { format } from "date-fns";

export const banglaDigits = (s: string | number) => {
  const map: Record<string, string> = { "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪", "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯" };
  return String(s).replace(/[0-9]/g, (d) => map[d]);
};

export const formatDate = (iso: string, lang: "bn" | "en" = "bn") => {
  try {
    const d = new Date(iso);
    if (lang === "bn") {
      return d.toLocaleDateString("bn-BD", { year: "numeric", month: "long", day: "numeric" });
    }
    return format(d, "MMM d, yyyy");
  } catch {
    return iso;
  }
};

export const readingTime = (text: string, lang: "bn" | "en" = "bn") => {
  const words = (text || "").trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return lang === "bn" ? banglaDigits(minutes) : String(minutes);
};

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80) || `article-${Date.now()}`;
