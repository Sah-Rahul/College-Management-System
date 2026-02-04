import mongoose, { Schema, Document, Model } from "mongoose"; 
import { ConversationType } from "../@types/enums";

export interface IConversation extends Document {
  type: ConversationType;

  participants: mongoose.Types.ObjectId[];

  
  course?: mongoose.Types.ObjectId;

 
  lastMessage?: mongoose.Types.ObjectId;

  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const conversationSchema = new Schema<IConversation>(
  {
    type: {
      type: String,
      enum: Object.values(ConversationType),
      default: ConversationType.DIRECT,
    },

    participants: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],

    course: { type: Schema.Types.ObjectId, ref: "Course" },

    lastMessage: { type: Schema.Types.ObjectId, ref: "Message" },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

conversationSchema.index({ participants: 1 });
conversationSchema.index({ course: 1 });
conversationSchema.index({ type: 1 });

export const Conversation: Model<IConversation> = mongoose.model<IConversation>(
  "Conversation",
  conversationSchema
);
