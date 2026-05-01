import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { newsData, NewsItem } from "@/data/newsData";
import { Input } from "@/components/ui/input";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState("");

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    
    const searchTerm = query.toLowerCase();
    return newsData.filter(
      (news) =>
        news.title.toLowerCase().includes(searchTerm) ||
        news.excerpt.toLowerCase().includes(searchTerm) ||
        news.content.toLowerCase().includes(searchTerm) ||
        news.categoryBn.includes(query)
    ).slice(0, 8);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-card border border-news-border rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-news-border">
          <Search className="w-5 h-5 text-news-subtext" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="সংবাদ অনুসন্ধান করুন..."
            className="flex-1 border-0 focus-visible:ring-0 text-lg font-bengali bg-transparent"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5 text-news-subtext" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query.trim() && searchResults.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-news-subtext font-bengali">
                "{query}" এর জন্য কোন সংবাদ পাওয়া যায়নি
              </p>
            </div>
          )}
          
          {searchResults.map((news) => (
            <Link
              key={news.id}
              to={`/news/${news.id}`}
              onClick={onClose}
              className="flex gap-4 p-4 hover:bg-muted transition-colors border-b border-news-border last:border-0"
            >
              <img
                src={news.image}
                alt={news.title}
                className="w-20 h-16 object-cover rounded flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bengali text-primary font-medium">
                  {news.categoryBn}
                </span>
                <h4 className="font-bengali font-semibold text-news-headline line-clamp-2 text-sm mt-1">
                  {news.title}
                </h4>
                <p className="text-xs text-news-subtext font-bengali mt-1">
                  {news.date}
                </p>
              </div>
            </Link>
          ))}

          {!query.trim() && (
            <div className="p-8 text-center">
              <p className="text-news-subtext font-bengali">
                সংবাদ অনুসন্ধান করতে টাইপ করুন
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
