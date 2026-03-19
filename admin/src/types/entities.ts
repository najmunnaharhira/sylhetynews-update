export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  district?: string;
  author?: string;
  imageUrl?: string;
  published?: boolean;
  featured?: boolean;
  tags?: string[];
  views?: number;
  createdAt?: string;
  updatedAt?: string;
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
