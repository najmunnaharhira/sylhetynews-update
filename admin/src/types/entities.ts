export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  imageUrl?: string;
  published?: boolean;
  createdAt?: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  order: number;
  introduction?: string;
}

export interface PhotoCardTemplate {
  id: string;
  name: string;
  description?: string;
  imageUrl: string;
  previewUrl?: string;
  category?: string;
  isActive: boolean;
}
