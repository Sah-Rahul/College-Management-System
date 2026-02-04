import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICourse extends Document {
  title: string;
  slug: string;
  description?: string;

  category: mongoose.Types.ObjectId;
  teacher: mongoose.Types.ObjectId;

  level: "beginner" | "intermediate" | "advanced";
  price: number;

  thumbnailUrl?: string;

  isPublished: boolean;
  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String },

    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    teacher: { type: Schema.Types.ObjectId, ref: "User", required: true },

    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },

    price: { type: Number, default: 0, min: 0 },
    thumbnailUrl: { type: String },

    isPublished: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

courseSchema.index({ slug: 1 });
courseSchema.index({ category: 1 });
courseSchema.index({ teacher: 1 });
courseSchema.index({ isPublished: 1 });

export const Course: Model<ICourse> = mongoose.model<ICourse>("Course", courseSchema);
