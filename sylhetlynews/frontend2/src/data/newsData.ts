export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  categoryBn: string;
  district: string;
  date: string;
  author: string;
  featured?: boolean;
}

export const newsData: NewsItem[] = [
  {
    id: "1",
    title: "সিলেটে ঐতিহাসিক বন্যার পর পুনর্বাসন কার্যক্রম শুরু",
    excerpt: "সিলেট বিভাগে সাম্প্রতিক বন্যায় ক্ষতিগ্রস্ত পরিবারগুলোর জন্য সরকারি ও বেসরকারি উদ্যোগে পুনর্বাসন কার্যক্রম পুরোদমে চলছে।",
    content: "সিলেট বিভাগে সাম্প্রতিক বন্যায় ক্ষতিগ্রস্ত পরিবারগুলোর জন্য সরকারি ও বেসরকারি উদ্যোগে পুনর্বাসন কার্যক্রম পুরোদমে চলছে। স্থানীয় প্রশাসন জানিয়েছে, প্রায় ৫০ হাজার পরিবারকে ত্রাণ সামগ্রী বিতরণ করা হয়েছে।",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
    category: "sylhet",
    categoryBn: "সিলেট",
    district: "sylhet-sadar",
    date: "২০ জানুয়ারি, ২০২৬",
    author: "রহিম উদ্দিন",
    featured: true,
  },
  {
    id: "2",
    title: "জাতীয় সংসদে গুরুত্বপূর্ণ শিক্ষা বিল পাস",
    excerpt: "শিক্ষা মন্ত্রণালয়ের উদ্যোগে নতুন শিক্ষা বিল জাতীয় সংসদে পাস হয়েছে। এই বিলে শিক্ষকদের বেতন বৃদ্ধি এবং শিক্ষা অবকাঠামো উন্নয়নে বিশেষ বরাদ্দ রাখা হয়েছে।",
    content: "শিক্ষা মন্ত্রণালয়ের উদ্যোগে নতুন শিক্ষা বিল জাতীয় সংসদে পাস হয়েছে। এই বিলে শিক্ষকদের বেতন বৃদ্ধি এবং শিক্ষা অবকাঠামো উন্নয়নে বিশেষ বরাদ্দ রাখা হয়েছে।",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80",
    category: "national",
    categoryBn: "জাতীয়",
    district: "",
    date: "১৯ জানুয়ারি, ২০২৬",
    author: "ফাতেমা বেগম",
  },
  {
    id: "3",
    title: "যুক্তরাজ্যে প্রবাসী বাংলাদেশিদের জন্য নতুন কর্মসংস্থান সুযোগ",
    excerpt: "যুক্তরাজ্য সরকার প্রবাসী বাংলাদেশিদের জন্য নতুন কর্মসংস্থান কর্মসূচি ঘোষণা করেছে। এতে প্রায় ১০ হাজার বাংলাদেশি উপকৃত হবেন।",
    content: "যুক্তরাজ্য সরকার প্রবাসী বাংলাদেশিদের জন্য নতুন কর্মসংস্থান কর্মসূচি ঘোষণা করেছে।",
    image: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=800&q=80",
    category: "expat",
    categoryBn: "প্রবাস",
    district: "",
    date: "১৮ জানুয়ারি, ২০২৬",
    author: "আব্দুল করিম",
  },
  {
    id: "4",
    title: "বাংলাদেশ ক্রিকেট দলের ঐতিহাসিক টেস্ট জয়",
    excerpt: "বাংলাদেশ ক্রিকেট দল টেস্ট সিরিজে ঐতিহাসিক জয় অর্জন করেছে। এই জয় বাংলাদেশ ক্রিকেটের ইতিহাসে স্মরণীয় হয়ে থাকবে।",
    content: "বাংলাদেশ ক্রিকেট দল টেস্ট সিরিজে ঐতিহাসিক জয় অর্জন করেছে।",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80",
    category: "sports",
    categoryBn: "খেলাধুলা",
    district: "",
    date: "১৭ জানুয়ারি, ২০২৬",
    author: "মাহমুদ হাসান",
  },
  {
    id: "5",
    title: "সিলেট শাহজালাল বিমানবন্দরে নতুন আন্তর্জাতিক রুট চালু",
    excerpt: "সিলেট শাহজালাল বিমানবন্দর থেকে দুবাই ও সিঙ্গাপুরে সরাসরি ফ্লাইট চালু হয়েছে। এতে প্রবাসী সিলেটিদের যাতায়াত সহজ হবে।",
    content: "সিলেট শাহজালাল বিমানবন্দর থেকে দুবাই ও সিঙ্গাপুরে সরাসরি ফ্লাইট চালু হয়েছে।",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    category: "sylhet",
    categoryBn: "সিলেট",
    district: "sylhet-sadar",
    date: "১৬ জানুয়ারি, ২০২৬",
    author: "সাবরিনা আক্তার",
  },
  {
    id: "6",
    title: "রাজনৈতিক দলগুলোর মধ্যে সংলাপ শুরু",
    excerpt: "দেশের প্রধান রাজনৈতিক দলগুলোর মধ্যে জাতীয় ঐক্য প্রতিষ্ঠায় সংলাপ শুরু হয়েছে। এই সংলাপে সকল দল অংশ নিয়েছে।",
    content: "দেশের প্রধান রাজনৈতিক দলগুলোর মধ্যে জাতীয় ঐক্য প্রতিষ্ঠায় সংলাপ শুরু হয়েছে।",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80",
    category: "politics",
    categoryBn: "রাজনীতি",
    district: "",
    date: "১৫ জানুয়ারি, ২০২৬",
    author: "আনিসুর রহমান",
  },
  {
    id: "7",
    title: "সিলেটে নতুন আইটি পার্ক স্থাপনের ঘোষণা",
    excerpt: "সিলেটে বৃহৎ আকারে আইটি পার্ক স্থাপনের ঘোষণা দিয়েছে সরকার। এতে হাজারো তরুণের কর্মসংস্থান হবে।",
    content: "সিলেটে বৃহৎ আকারে আইটি পার্ক স্থাপনের ঘোষণা দিয়েছে সরকার।",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    category: "sylhet",
    categoryBn: "সিলেট",
    district: "sylhet-sadar",
    date: "১৪ জানুয়ারি, ২০২৬",
    author: "তানভীর আহমেদ",
  },
  {
    id: "8",
    title: "মধ্যপ্রাচ্যে বাংলাদেশি শ্রমিকদের জন্য নতুন সুবিধা",
    excerpt: "মধ্যপ্রাচ্যের দেশগুলোতে কর্মরত বাংলাদেশি শ্রমিকদের জন্য নতুন সুযোগ-সুবিধা ঘোষণা করা হয়েছে।",
    content: "মধ্যপ্রাচ্যের দেশগুলোতে কর্মরত বাংলাদেশি শ্রমিকদের জন্য নতুন সুযোগ-সুবিধা ঘোষণা করা হয়েছে।",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    category: "expat",
    categoryBn: "প্রবাস",
    district: "",
    date: "১৩ জানুয়ারি, ২০২৬",
    author: "নাজমুল ইসলাম",
  },
  {
    id: "9",
    title: "সিলেটে নতুন পর্যটন উৎসবের ঘোষণা",
    excerpt: "সিলেটে পর্যটন খাতকে উৎসাহিত করতে নতুন উৎসবের ঘোষণা দেওয়া হয়েছে।",
    content: "সিলেটে পর্যটন খাতকে উৎসাহিত করতে নতুন উৎসবের ঘোষণা দেওয়া হয়েছে।",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80",
    category: "others",
    categoryBn: "অন্যান্য",
    district: "",
    date: "১২ জানুয়ারি, ২০২৬",
    author: "সালেহা ইসলাম",
  },
];

export const getNewsByCategory = (category: string) => {
  return newsData.filter((news) => news.category === category);
};

export const getNewsByDistrict = (district: string) => {
  return newsData.filter((news) => news.district === district);
};

export const getFeaturedNews = () => {
  return newsData.find((news) => news.featured) || newsData[0];
};

export const getLatestNews = (limit: number = 5) => {
  return newsData.slice(0, limit);
};
