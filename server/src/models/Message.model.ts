import mongoose, { Schema, Document, Model } from "mongoose";
import { MessageSender, MessageType } from "../enums/enums";

export interface IMessage extends Document {
  chat: mongoose.Types.ObjectId;
  sender: MessageSender;
  senderId: mongoose.Types.ObjectId;
  message: string;
  messageType: MessageType;
  attachments?: string[];
  isRead: boolean;
  readAt?: Date;
  isEdited: boolean;
  editedAt?: Date;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
      index: true,
    },
    sender: {
      type: String,
      enum: Object.values(MessageSender),
      required: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      maxlength: 2000,
    },
    messageType: {
      type: String,
      enum: Object.values(MessageType),
      default: MessageType.TEXT,
    },
    attachments: [
      {
        type: String,
      },
    ],
    isRead: {
      type: Boolean,
      default: false,
    },
    readAt: Date,
    isEdited: {
      type: Boolean,
      default: false,
    },
    editedAt: Date,
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  },
);

// Indexes
MessageSchema.index({ chat: 1, createdAt: -1 });
MessageSchema.index({ senderId: 1 });
MessageSchema.index({ isRead: 1 });

export const Message: Model<IMessage> = mongoose.model<IMessage>(
  "Message",
  MessageSchema,
);
