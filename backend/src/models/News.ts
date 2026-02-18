import mongoose, { Schema } from 'mongoose';

const NewsSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    summary: { type: String, default: '' },
    category: { type: String, required: true },
    district: { type: String, default: '' },
    author: { type: String, required: true },
    imageUrl: { type: String, required: true },
    published: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export const News = mongoose.model('News', NewsSchema);
