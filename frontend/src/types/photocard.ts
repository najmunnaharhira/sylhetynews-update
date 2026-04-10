export interface PhotoCardTemplate {
  id: string;
  name: string;
  description?: string;
  imageUrl: string;
  previewUrl?: string;
  category?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
