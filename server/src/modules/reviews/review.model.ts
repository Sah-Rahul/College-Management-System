import mongoose, { Schema, Document } from "mongoose";
import { ReviewStatus, ReviewType } from "./review.enums";

export interface IReview extends Document {
  userId: mongoose.Types.ObjectId;
  type: ReviewType;
  courseId?: mongoose.Types.ObjectId;
  instituteId?: mongoose.Types.ObjectId;
  enrollmentId?: mongoose.Types.ObjectId;
  rating: number; // 1-5
  title?: string;
  comment: string;
  pros?: string[];
  cons?: string[];
  status: ReviewStatus;
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  notHelpfulCount: number;
  helpfulBy: mongoose.Types.ObjectId[];
  notHelpfulBy: mongoose.Types.ObjectId[];
  replies?: Array<{
    userId: mongoose.Types.ObjectId;
    comment: string;
    createdAt: Date;
  }>;
  reportedBy?: mongoose.Types.ObjectId[];
  reportReason?: string;
  moderatedBy?: mongoose.Types.ObjectId;
  moderatedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: Object.values(ReviewType),
      required: true,
    },
    courseId: { type: Schema.Types.ObjectId, ref: "Course" },
    instituteId: { type: Schema.Types.ObjectId, ref: "Institute" },
    enrollmentId: { type: Schema.Types.ObjectId, ref: "Enrollment" },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, trim: true },
    comment: { type: String, required: true, trim: true },
    pros: [String],
    cons: [String],
    status: {
      type: String,
      enum: Object.values(ReviewStatus),
      default: ReviewStatus.PENDING,
    },
    isVerifiedPurchase: { type: Boolean, default: false },
    helpfulCount: { type: Number, default: 0 },
    notHelpfulCount: { type: Number, default: 0 },
    helpfulBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    notHelpfulBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    replies: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    reportedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    reportReason: String,
    moderatedBy: { type: Schema.Types.ObjectId, ref: "User" },
    moderatedAt: Date,
  },
  { timestamps: true },
);

reviewSchema.index({ courseId: 1, status: 1, rating: -1 });
reviewSchema.index({ instituteId: 1, status: 1, rating: -1 });
reviewSchema.index({ userId: 1 });
reviewSchema.index({ createdAt: -1 });

 
reviewSchema.index({ userId: 1, courseId: 1 }, { unique: true, sparse: true });
reviewSchema.index(
  { userId: 1, instituteId: 1 },
  { unique: true, sparse: true },
);

 const ReviewModel = mongoose.model<IReview>("Review", reviewSchema);
export default ReviewModel