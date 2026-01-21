import mongoose, { Schema } from 'mongoose';

const NewsSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
    imageUrl: { type: String, required: true },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const News = mongoose.model('News', NewsSchema);
