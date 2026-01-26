import mongoose, { Schema, Document, Model } from "mongoose";

export interface IChat extends Document {
  chatId: string;
  participants: mongoose.Types.ObjectId[];
  isGroupChat: boolean;
  groupName?: string;
  groupAdmin?: mongoose.Types.ObjectId;

  // Last message info
  lastMessage?: string;
  lastMessageAt?: Date;
  lastMessageBy?: mongoose.Types.ObjectId;

  // Unread count per user
  unreadCount?: Map<string, number>;

  createdAt: Date;
  updatedAt: Date;
}

const ChatSchema = new Schema<IChat>(
  {
    chatId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    groupName: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    groupAdmin: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    lastMessage: String,
    lastMessageAt: Date,
    lastMessageBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    unreadCount: {
      type: Map,
      of: Number,
      default: new Map(),
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
ChatSchema.index({ chatId: 1 });
ChatSchema.index({ participants: 1 });
ChatSchema.index({ isGroupChat: 1 });
ChatSchema.index({ lastMessageAt: -1 });

export const Chat: Model<IChat> = mongoose.model<IChat>("Chat", ChatSchema);
