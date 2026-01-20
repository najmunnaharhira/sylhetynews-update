const breakingNews = ["সিলেটে ভারি বৃষ্টিপাতের সতর্কতা জারি", "জাতীয় সংসদে নতুন বিল পাস", "প্রবাসী বাংলাদেশিদের জন্য নতুন ভিসা নীতি", "সিলেট বিভাগে শিক্ষা অবকাঠামো উন্নয়নে বরাদ্দ", "আন্তর্জাতিক ক্রিকেটে বাংলাদেশের ঐতিহাসিক জয়"];
const BreakingNews = () => {
  const duplicatedNews = [...breakingNews, ...breakingNews];
  return <div className="ticker-wrapper py-2 border-b border-news-border">
      <div className="container mx-auto px-4 flex items-center">
        <div className="flex-shrink-0 text-primary-foreground px-3 py-1 font-bengali font-semibold text-sm rounded-sm mr-3 bg-[#de174c]">
          সংবাদ শিরোনাম
        </div>
        <div className="overflow-hidden flex-1">
          <div className="ticker-content">
            {duplicatedNews.map((news, index) => <span key={index} className="inline-block mx-6 text-news-headline font-bengali">
                ● {news}
              </span>)}
          </div>
        </div>
      </div>
    </div>;
};
export default BreakingNews;