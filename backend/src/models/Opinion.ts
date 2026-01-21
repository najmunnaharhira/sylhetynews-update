import mongoose, { Schema } from 'mongoose';

const OpinionSchema = new Schema(
  {
    name: { type: String, default: 'Anonymous' },
    comment: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    likes_count: { type: Number, default: 0 },
    likedBy: { type: [String], default: [] },
    created_at: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export const Opinion = mongoose.model('Opinion', OpinionSchema);
