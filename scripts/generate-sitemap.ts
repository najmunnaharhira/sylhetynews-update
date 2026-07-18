// Runs before `vite dev` and `vite build` (predev/prebuild hooks).
// Writes public/sitemap.xml and public/rss.xml with dynamic article routes.

import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://sylhetlynews.lovable.app";
const SUPABASE_URL = "https://usccpnmyqflorpavgygr.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzY2Nwbm15cWZsb3JwYXZneWdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1ODgyMjAsImV4cCI6MjA5MzE2NDIyMH0.Gxm_swJaeG3DwBoEJMOF1R8XWS-7WGk5CZHIw2-M4bM";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const staticEntries: SitemapEntry[] = [
  { path: "/", changefreq: "hourly", priority: "1.0" },
  { path: "/sylhet", changefreq: "hourly", priority: "0.9" },
  { path: "/national", changefreq: "hourly", priority: "0.9" },
  { path: "/politics", changefreq: "hourly", priority: "0.8" },
  { path: "/expat", changefreq: "hourly", priority: "0.8" },
  { path: "/sports", changefreq: "hourly", priority: "0.8" },
  { path: "/opinion", changefreq: "daily", priority: "0.7" },
  { path: "/photocard", changefreq: "monthly", priority: "0.3" },
];

interface ArticleRow {
  slug: string;
  title_bn: string;
  summary: string | null;
  image_url: string | null;
  author: string | null;
  published_at: string;
  updated_at: string;
  category: { slug: string; name_bn: string } | null;
}

async function fetchArticles(): Promise<ArticleRow[]> {
  try {
    const url =
      `${SUPABASE_URL}/rest/v1/articles?select=slug,title_bn,summary,image_url,author,published_at,updated_at,category:categories(slug,name_bn)` +
      `&published=eq.true&order=published_at.desc&limit=2000`;
    const res = await fetch(url, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
    });
    if (!res.ok) return [];
    return (await res.json()) as ArticleRow[];
  } catch {
    return [];
  }
}

function xmlEscape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildSitemap(entries: SitemapEntry[]) {
  const urls = entries
    .map((e) =>
      [
        `  <url>`,
        `    <loc>${BASE_URL}${e.path}</loc>`,
        e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
        e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
        e.priority ? `    <priority>${e.priority}</priority>` : null,
        `  </url>`,
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function buildRss(articles: ArticleRow[]) {
  const items = articles
    .slice(0, 50)
    .map((a) => {
      const link = `${BASE_URL}/news/${a.slug}`;
      const desc = xmlEscape(a.summary || a.title_bn);
      const cat = a.category?.name_bn ? `<category>${xmlEscape(a.category.name_bn)}</category>` : "";
      const img = a.image_url
        ? `<enclosure url="${xmlEscape(a.image_url)}" type="image/jpeg" />`
        : "";
      const author = a.author ? `<dc:creator>${xmlEscape(a.author)}</dc:creator>` : "";
      return `  <item>
    <title>${xmlEscape(a.title_bn)}</title>
    <link>${link}</link>
    <guid isPermaLink="true">${link}</guid>
    <pubDate>${new Date(a.published_at).toUTCString()}</pubDate>
    <description>${desc}</description>
    ${cat}
    ${author}
    ${img}
  </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>সিলেটি নিউজ</title>
  <link>${BASE_URL}</link>
  <description>সিলেটের সর্বাধিক পঠিত অনলাইন সংবাদপত্র</description>
  <language>bn</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
</channel>
</rss>
`;
}

async function main() {
  const articles = await fetchArticles();
  const dynamicEntries: SitemapEntry[] = articles.map((a) => ({
    path: `/news/${a.slug}`,
    lastmod: (a.updated_at || a.published_at).split("T")[0],
    changefreq: "weekly",
    priority: "0.7",
  }));

  writeFileSync(resolve("public/sitemap.xml"), buildSitemap([...staticEntries, ...dynamicEntries]));
  writeFileSync(resolve("public/rss.xml"), buildRss(articles));
  console.log(
    `sitemap.xml (${staticEntries.length + dynamicEntries.length} urls) + rss.xml (${Math.min(articles.length, 50)} items) written`,
  );
}

main();
