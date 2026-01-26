import mongoose, { Schema, Document, Model } from "mongoose";
import { NoticeAudience, NoticeCategory, NoticePriority } from "../enums/enums";

export interface INotice extends Document {
  title: string;
  description: string;
  category: NoticeCategory;
  targetAudience: NoticeAudience;
  priority: NoticePriority;

  // For specific targeting
  targetCourses?: mongoose.Types.ObjectId[];
  targetDepartments?: mongoose.Types.ObjectId[];
  targetSemesters?: number[];

  attachments?: string[];
  publishedBy: mongoose.Types.ObjectId;
  publishedDate: Date;
  expiryDate?: Date;
  isActive: boolean;
  isPinned: boolean;
  viewCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const NoticeSchema = new Schema<INotice>(
  {
    title: {
      type: String,
      required: [true, "Notice title is required"],
      trim: true,
      maxlength: 300,
    },
    description: {
      type: String,
      required: [true, "Notice description is required"],
      maxlength: 5000,
    },
    category: {
      type: String,
      enum: Object.values(NoticeCategory),
      required: [true, "Category is required"],
    },
    targetAudience: {
      type: String,
      enum: Object.values(NoticeAudience),
      required: [true, "Target audience is required"],
    },
    priority: {
      type: String,
      enum: Object.values(NoticePriority),
      default: NoticePriority.MEDIUM,
    },
    targetCourses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    targetDepartments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Department",
      },
    ],
    targetSemesters: [
      {
        type: Number,
        min: 1,
        max: 12,
      },
    ],
    attachments: [
      {
        type: String,
      },
    ],
    publishedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    publishedDate: {
      type: Date,
      default: Date.now,
    },
    expiryDate: Date,
    isActive: {
      type: Boolean,
      default: true,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    viewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
NoticeSchema.index({ category: 1, isActive: 1 });
NoticeSchema.index({ targetAudience: 1 });
NoticeSchema.index({ publishedDate: -1 });
NoticeSchema.index({ isPinned: -1, publishedDate: -1 });

export const Notice: Model<INotice> = mongoose.model<INotice>(
  "Notice",
  NoticeSchema,
);
