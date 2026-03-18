export interface Opinion {
  id: string;
  name: string;
  comment: string;
  rating: number;
  likes_count: number;
  likedBy: string[];
  created_at: Date;
}
