import dotenv from 'dotenv';
import { ResultSetHeader } from 'mysql2';
import { connectDB, query } from './config/database.js';

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

// Add all standard Bangladeshi news categories if not present
const categories = [
  { name: 'জাতীয়', slug: 'national', icon: '' },
  { name: 'আন্তর্জাতিক', slug: 'international', icon: '' },
  { name: 'রাজনীতি', slug: 'politics', icon: '' },
  { name: 'অর্থনীতি', slug: 'economy', icon: '' },
  { name: 'খেলাধুলা', slug: 'sports', icon: '' },
  { name: 'বিনোদন', slug: 'entertainment', icon: '' },
  { name: 'শিক্ষা', slug: 'education', icon: '' },
  { name: 'স্বাস্থ্য', slug: 'health', icon: '' },
  { name: 'বিজ্ঞান ও প্রযুক্তি', slug: 'technology', icon: '' },
  { name: 'মতামত', slug: 'opinion', icon: '' },
  { name: 'লাইফস্টাইল', slug: 'lifestyle', icon: '' },
  { name: 'ধর্ম', slug: 'religion', icon: '' },
  { name: 'জেলা', slug: 'districts', icon: '' },
  { name: 'অন্যান্য', slug: 'others', icon: '' },
];

const run = async () => {
  try {
    await connectDB();
    await query<ResultSetHeader>('DELETE FROM categories');

    for (const cat of categories) {
      await query<ResultSetHeader>(
        `INSERT INTO categories (name, slug, icon) VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE name = VALUES(name), icon = VALUES(icon)`,
        [cat.name, cat.slug, cat.icon]
      );
    }

    await query<ResultSetHeader>('DELETE FROM news');

    for (const item of seedNews) {
      await query<ResultSetHeader>(
        `INSERT INTO news (title, content, summary, category, district, author, image_url, published, featured, tags)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          item.title,
          item.content,
          '',
          item.category,
          '',
          item.author,
          item.imageUrl,
          item.published,
          false,
          JSON.stringify([]),
        ]
      );
    }

    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exitCode = 1;
  } finally {
    process.exit();
  }
};

void run();
