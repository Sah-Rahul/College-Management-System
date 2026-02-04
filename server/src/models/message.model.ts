import mongoose, { Schema, Document, Model } from "mongoose"; 
import { MessageType } from "../@types/enums";

export interface IMessage extends Document {
  conversation: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;

  type: MessageType;

  text?: string;
  fileUrl?: string;

  readBy: mongoose.Types.ObjectId[];

  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    conversation: { type: Schema.Types.ObjectId, ref: "Conversation", required: true },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },

    type: { type: String, enum: Object.values(MessageType), default: MessageType.TEXT },

    text: { type: String, maxlength: 20000 },
    fileUrl: { type: String },

    readBy: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
  },
  { timestamps: true }
);

messageSchema.index({ conversation: 1, createdAt: -1 });
messageSchema.index({ sender: 1 });
messageSchema.index({ type: 1 });

export const Message: Model<IMessage> = mongoose.model<IMessage>("Message", messageSchema);
