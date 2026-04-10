export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  summary: string;
  category: string;
  imageUrl: string;
  imageFile?: File;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  featured: boolean;
  views: number;
  tags: string[];
  published: boolean;
}

export interface NewsCategory {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: Date;
}
