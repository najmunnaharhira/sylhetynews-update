import mongoose, { Schema } from 'mongoose';

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    icon: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Category = mongoose.model('Category', CategorySchema);
