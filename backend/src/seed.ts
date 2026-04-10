import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import { News } from './models/News.js';

dotenv.config();

const seedNews = [
  {
    title: 'সিলেটে ঐতিহাসিক বন্যার পর পুনর্বাসন কার্যক্রম শুরু',
    content:
      'সিলেট বিভাগে সাম্প্রতিক বন্যায় ক্ষতিগ্রস্ত পরিবারগুলোর জন্য সরকারি ও বেসরকারি উদ্যোগে পুনর্বাসন কার্যক্রম চলছে।',
    category: 'sylhet',
    author: 'রহিম উদ্দিন',
    imageUrl:
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
    published: true,
  },
  {
    title: 'জাতীয় সংসদে গুরুত্বপূর্ণ শিক্ষা বিল পাস',
    content:
      'শিক্ষা মন্ত্রণালয়ের উদ্যোগে নতুন শিক্ষা বিল জাতীয় সংসদে পাস হয়েছে।',
    category: 'national',
    author: 'ফাতেমা বেগম',
    imageUrl:
      'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80',
    published: true,
  },
  {
    title: 'সিলেটে নতুন পর্যটন উৎসবের ঘোষণা',
    content: 'সিলেটে পর্যটন খাতকে উৎসাহিত করতে নতুন উৎসবের ঘোষণা দেওয়া হয়েছে।',
    category: 'others',
    author: 'সালেহা ইসলাম',
    imageUrl:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80',
    published: true,
  },
];

const run = async () => {
  try {
    await connectDB();
    await News.deleteMany({});
    await News.insertMany(seedNews);
    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
};

run();
