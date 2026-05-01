import { useState, useMemo, useEffect } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useSearchArticles } from "@/hooks/useArticles";
import { useI18n } from "@/contexts/I18nContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: Props) => {
  const { lang, t } = useI18n();
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 250);
  const { data: results = [], isFetching } = useSearchArticles(debounced);

  useEffect(() => {
    if (!isOpen) setQuery("");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-news-border rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden">
        <div className="flex items-center gap-3 p-4 border-b border-news-border">
          <Search className="w-5 h-5 text-news-subtext" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search")}
            className="flex-1 border-0 focus-visible:ring-0 text-lg font-bengali bg-transparent"
            autoFocus
          />
          {isFetching && <Loader2 className="w-4 h-4 animate-spin text-news-subtext" />}
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full" aria-label="Close">
            <X className="w-5 h-5 text-news-subtext" />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          {debounced.trim().length > 1 && results.length === 0 && !isFetching && (
            <div className="p-8 text-center text-news-subtext font-bengali">{t("noResults")}</div>
          )}
          {results.map((news) => {
            const title = lang === "en" && news.title_en ? news.title_en : news.title_bn;
            const cat = lang === "en" ? news.category?.name_en : news.category?.name_bn;
            return (
              <Link key={news.id} to={`/news/${news.slug}`} onClick={onClose} className="flex gap-4 p-4 hover:bg-muted transition-colors border-b border-news-border last:border-0">
                {news.image_url && <img src={news.image_url} alt={title} className="w-20 h-16 object-cover rounded flex-shrink-0" />}
                <div className="flex-1 min-w-0">
                  {cat && <span className="text-xs font-bengali text-primary font-medium">{cat}</span>}
                  <h4 className="font-bengali font-semibold text-news-headline line-clamp-2 text-sm mt-1">{title}</h4>
                </div>
              </Link>
            );
          })}
          {!query.trim() && (
            <div className="p-8 text-center text-news-subtext font-bengali">{t("search")}</div>
          )}
        </div>
      </div>
    </div>
  );
};

function useDebounce<T>(value: T, delay = 250) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
}

export default SearchModal;
