import mongoose, { Schema, Document, Model } from "mongoose";
import {
  NotificationStatus,
  NotificationTrigger,
  NotificationType,
} from "../enums/enums";

export interface INotification extends Document {
  user: mongoose.Types.ObjectId;
  type: NotificationType;
  trigger: NotificationTrigger;
  title: string;
  message: string;
  status: NotificationStatus;

  // Additional data for context
  metadata?: {
    noticeId?: mongoose.Types.ObjectId;
    examId?: mongoose.Types.ObjectId;
    feeId?: mongoose.Types.ObjectId;
    bookId?: mongoose.Types.ObjectId;
    leaveId?: mongoose.Types.ObjectId;
    attendancePercentage?: number;
    [key: string]: any;
  };

  sentAt?: Date;
  readAt?: Date;
  failureReason?: string;
  retryCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(NotificationType),
      required: true,
    },
    trigger: {
      type: String,
      enum: Object.values(NotificationTrigger),
      required: true,
    },
    title: {
      type: String,
      required: [true, "Notification title is required"],
      trim: true,
      maxlength: 200,
    },
    message: {
      type: String,
      required: [true, "Notification message is required"],
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: Object.values(NotificationStatus),
      default: NotificationStatus.PENDING,
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
    sentAt: Date,
    readAt: Date,
    failureReason: String,
    retryCount: {
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
NotificationSchema.index({ user: 1, status: 1 });
NotificationSchema.index({ user: 1, createdAt: -1 });
NotificationSchema.index({ status: 1, type: 1 });
NotificationSchema.index({ trigger: 1 });

export const Notification: Model<INotification> = mongoose.model<INotification>(
  "Notification",
  NotificationSchema,
);
