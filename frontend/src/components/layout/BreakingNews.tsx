const breakingNews = [
  "সিলেটে ভারি বৃষ্টিপাতের সতর্কতা জারি",
  "জাতীয় সংসদে নতুন বিল পাস",
  "প্রবাসী বাংলাদেশিদের জন্য নতুন ভিসা নীতি",
  "সিলেট বিভাগে শিক্ষা অবকাঠামো উন্নয়নে বরাদ্দ",
  "আন্তর্জাতিক ক্রিকেটে বাংলাদেশের ঐতিহাসিক জয়",
];

import { useEffect, useState } from "react";

const BreakingNews = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % breakingNews.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-muted border-b border-news-border">
      <div className="container mx-auto px-4 flex items-center">
        <div className="flex-shrink-0 bg-primary text-primary-foreground px-4 py-2.5 font-bengali font-bold text-sm">
          সংবাদ শিরোনাম
        </div>
        <div className="overflow-hidden flex-1 py-2">
          <div className="h-7 overflow-hidden">
            <div
              className="transition-transform duration-500"
              style={{ transform: `translateY(-${index * 28}px)` }}
            >
              {breakingNews.map((news, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex items-center gap-3 text-news-headline font-bengali text-sm h-7"
                >
                  <span className="text-primary">●</span>
                  <span>{news}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;
