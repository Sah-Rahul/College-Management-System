import mongoose, { Schema, Document, Model } from "mongoose"; 
import { NotificationType } from "../@types/enums";

export interface INotification extends Document {
  user: mongoose.Types.ObjectId;

  type: NotificationType;

  title: string;
  body: string;

  entityId?: mongoose.Types.ObjectId;

  isRead: boolean;

  metadata?: Record<string, any>;

  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },

    type: {
      type: String,
      enum: Object.values(NotificationType),
      default: NotificationType.SYSTEM,
    },

    title: { type: String, required: true, minlength: 2, maxlength: 200 },
    body: { type: String, required: true, minlength: 2, maxlength: 5000 },

    entityId: { type: Schema.Types.ObjectId },

    isRead: { type: Boolean, default: false },

    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

notificationSchema.index({ user: 1, createdAt: -1 });
notificationSchema.index({ isRead: 1 });
notificationSchema.index({ type: 1 });

export const Notification: Model<INotification> = mongoose.model<INotification>(
  "Notification",
  notificationSchema
);
