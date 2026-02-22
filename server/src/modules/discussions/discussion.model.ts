import mongoose, { Schema, Document } from "mongoose";
import { DiscussionCategory, DiscussionStatus } from "./discussion.enums";

export interface IReply {
  _id: mongoose.Types.ObjectId;
  author: mongoose.Types.ObjectId;
  content: string;
  upvotes: mongoose.Types.ObjectId[];
  downvotes: mongoose.Types.ObjectId[];
  isAccepted: boolean;
  acceptedBy?: mongoose.Types.ObjectId;
  acceptedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDiscussion extends Document {
  courseId: mongoose.Types.ObjectId;
  author: mongoose.Types.ObjectId;
  title: string;
  content: string;
  category: DiscussionCategory;
  status: DiscussionStatus;
  tags: string[];
  replies: IReply[];
  upvotes: mongoose.Types.ObjectId[];
  downvotes: mongoose.Types.ObjectId[];
  views: number;
  isPinned: boolean;
  isFeatured: boolean;
  hasAcceptedAnswer: boolean;
  lastActivityAt: Date;
  closedAt?: Date;
  closedBy?: mongoose.Types.ObjectId;
  closeReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const discussionSchema = new Schema<IDiscussion>(
  {
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    category: {
      type: String,
      enum: Object.values(DiscussionCategory),
      default: DiscussionCategory.GENERAL,
    },
    status: {
      type: String,
      enum: Object.values(DiscussionStatus),
      default: DiscussionStatus.OPEN,
    },
    tags: [{ type: String, lowercase: true, trim: true }],
    replies: [
      {
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
        content: { type: String, required: true },
        upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
        downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
        isAccepted: { type: Boolean, default: false },
        acceptedBy: { type: Schema.Types.ObjectId, ref: "User" },
        acceptedAt: Date,
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
      },
    ],
    upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    views: { type: Number, default: 0 },
    isPinned: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    hasAcceptedAnswer: { type: Boolean, default: false },
    lastActivityAt: { type: Date, default: Date.now },
    closedAt: Date,
    closedBy: { type: Schema.Types.ObjectId, ref: "User" },
    closeReason: String,
  },
  { timestamps: true },
);

discussionSchema.index({ courseId: 1, status: 1, lastActivityAt: -1 });
discussionSchema.index({ author: 1, createdAt: -1 });
discussionSchema.index({ category: 1, status: 1 });
discussionSchema.index({ tags: 1 });
discussionSchema.index({ isPinned: -1, isFeatured: -1, lastActivityAt: -1 });

const DiscussionModel = mongoose.model<IDiscussion>(
  "Discussion",
  discussionSchema,
);

export default DiscussionModel