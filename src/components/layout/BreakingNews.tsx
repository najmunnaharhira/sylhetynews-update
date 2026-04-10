const breakingNews = [
  "সিলেটে ভারি বৃষ্টিপাতের সতর্কতা জারি",
  "জাতীয় সংসদে নতুন বিল পাস",
  "প্রবাসী বাংলাদেশিদের জন্য নতুন ভিসা নীতি",
  "সিলেট বিভাগে শিক্ষা অবকাঠামো উন্নয়নে বরাদ্দ",
  "আন্তর্জাতিক ক্রিকেটে বাংলাদেশের ঐতিহাসিক জয়",
];

const BreakingNews = () => {
  const duplicatedNews = [...breakingNews, ...breakingNews];

  return (
    <div className="bg-muted border-b border-news-border">
      <div className="container mx-auto px-4 flex items-center">
        <div className="flex-shrink-0 bg-primary text-primary-foreground px-4 py-2.5 font-bengali font-bold text-sm">
          সংবাদ শিরোনাম
        </div>
        <div className="overflow-hidden flex-1 py-2">
          <div className="ticker-content">
            {duplicatedNews.map((news, index) => (
              <span
                key={index}
                className="inline-block mx-6 text-news-headline font-bengali text-sm"
              >
                <span className="text-primary mr-2">●</span>
                {news}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;
