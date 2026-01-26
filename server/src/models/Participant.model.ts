import mongoose, { Schema, Document, Model } from "mongoose";

export enum UserOnlineStatus {
  ONLINE = "online",
  OFFLINE = "offline",
  AWAY = "away",
}

export enum ParticipantRole {
  USER = "user",
  SUPPORT = "support",
}

export interface IParticipant extends Document {
  chat: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  role: ParticipantRole;
  isOnline: boolean;
  onlineStatus: UserOnlineStatus;
  lastSeen?: Date;
  joinedAt: Date;
  leftAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ParticipantSchema = new Schema<IParticipant>(
  {
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(ParticipantRole),
      required: true,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    onlineStatus: {
      type: String,
      enum: Object.values(UserOnlineStatus),
      default: UserOnlineStatus.OFFLINE,
    },
    lastSeen: Date,
    joinedAt: {
      type: Date,
      default: Date.now,
    },
    leftAt: Date,
  },
  {
    timestamps: true,
  },
);

// Indexes
ParticipantSchema.index({ chat: 1, userId: 1 }, { unique: true });
ParticipantSchema.index({ userId: 1 });
ParticipantSchema.index({ chat: 1, isOnline: 1 });

export const Participant: Model<IParticipant> = mongoose.model<IParticipant>(
  "Participant",
  ParticipantSchema,
);
