export interface News {
  id: string;
  title: string;
  content: string;
  summary: string;
  category: string;
  district: string;
  author: string;
  imageUrl: string;
  published: boolean;
  featured: boolean;
  views: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
