import mongoose, { Schema, Document, Model } from "mongoose"; 
import { NoticeAudience } from "../@types/enums";

export interface INotice extends Document {
  title: string;
  message: string;

  createdBy: mongoose.Types.ObjectId;

  targetAudience: NoticeAudience;

  course?: mongoose.Types.ObjectId;

  isPinned: boolean;
  isActive: boolean;

  publishAt?: Date;
  expiresAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const noticeSchema = new Schema<INotice>(
  {
    title: { type: String, required: true, trim: true, minlength: 2, maxlength: 200 },
    message: { type: String, required: true, maxlength: 20000 },

    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },

    targetAudience: {
      type: String,
      enum: Object.values(NoticeAudience),
      default: NoticeAudience.ALL,
    },

    course: { type: Schema.Types.ObjectId, ref: "Course" },

    isPinned: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

    publishAt: { type: Date },
    expiresAt: { type: Date },
  },
  { timestamps: true }
);

noticeSchema.index({ targetAudience: 1 });
noticeSchema.index({ course: 1 });
noticeSchema.index({ isPinned: 1 });
noticeSchema.index({ isActive: 1 });
noticeSchema.index({ publishAt: 1 });
noticeSchema.index({ expiresAt: 1 });

export const Notice: Model<INotice> = mongoose.model<INotice>("Notice", noticeSchema);
