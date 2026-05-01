import { useEffect } from "react";

interface SeoProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  jsonLd?: Record<string, any>;
}

const upsertMeta = (selector: string, attr: string, value: string) => {
  let el = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
  if (!el) {
    if (selector.startsWith("link")) {
      el = document.createElement("link");
      const rel = selector.match(/rel="([^"]+)"/)?.[1] || "";
      (el as HTMLLinkElement).rel = rel;
    } else {
      el = document.createElement("meta");
      const name = selector.match(/name="([^"]+)"/)?.[1];
      const prop = selector.match(/property="([^"]+)"/)?.[1];
      if (name) (el as HTMLMetaElement).name = name;
      if (prop) (el as HTMLMetaElement).setAttribute("property", prop);
    }
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

const Seo = ({ title, description, image, url, type = "website", jsonLd }: SeoProps) => {
  useEffect(() => {
    document.title = title.slice(0, 65);
    if (description) {
      upsertMeta('meta[name="description"]', "content", description.slice(0, 160));
      upsertMeta('meta[property="og:description"]', "content", description.slice(0, 160));
    }
    upsertMeta('meta[property="og:title"]', "content", title);
    upsertMeta('meta[property="og:type"]', "content", type);
    if (image) {
      upsertMeta('meta[property="og:image"]', "content", image);
      upsertMeta('meta[name="twitter:image"]', "content", image);
    }
    const canonical = url || window.location.href;
    upsertMeta('meta[property="og:url"]', "content", canonical);
    upsertMeta('link[rel="canonical"]', "href", canonical);

    let scriptEl = document.getElementById("ld-json") as HTMLScriptElement | null;
    if (jsonLd) {
      if (!scriptEl) {
        scriptEl = document.createElement("script");
        scriptEl.id = "ld-json";
        scriptEl.type = "application/ld+json";
        document.head.appendChild(scriptEl);
      }
      scriptEl.text = JSON.stringify(jsonLd);
    } else if (scriptEl) {
      scriptEl.remove();
    }
  }, [title, description, image, url, type, JSON.stringify(jsonLd)]);

  return null;
};

export default Seo;
