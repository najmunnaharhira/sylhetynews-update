import mongoose, { Schema } from 'mongoose';

const TeamSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    order: { type: Number, default: 0 },
    introduction: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Team = mongoose.model('Team', TeamSchema);
