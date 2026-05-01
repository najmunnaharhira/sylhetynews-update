export interface Article {
  id: string;
  slug: string;
  title_bn: string;
  title_en: string | null;
  summary: string | null;
  content: string;
  category_id: string | null;
  image_url: string | null;
  author: string | null;
  tags: string[] | null;
  featured: boolean;
  published: boolean;
  views: number;
  published_at: string;
  created_at: string;
  updated_at: string;
  // Joined
  category?: { slug: string; name_bn: string; name_en: string } | null;
}

export interface CategoryRow {
  id: string;
  slug: string;
  name_bn: string;
  name_en: string;
  sort_order: number;
}

export interface CommentRow {
  id: string;
  article_id: string;
  user_id: string;
  content: string;
  approved: boolean;
  created_at: string;
  profile?: { display_name: string | null; avatar_url: string | null } | null;
}
