import mongoose, { Schema, Document } from "mongoose";
import { DeviceType, SessionStatus } from "./session.enums";

export interface ISession extends Document {
  userId: mongoose.Types.ObjectId;
  sessionToken: string;
  refreshToken: string;
  status: SessionStatus;
  device: {
    type: DeviceType;
    name?: string;
    os?: string;
    browser?: string;
    version?: string;
  };
  ipAddress: string;
  location?: {
    country?: string;
    city?: string;
    region?: string;
    latitude?: number;
    longitude?: number;
  };
  userAgent: string;
  isCurrent: boolean;
  lastActivity: Date;
  loginAt: Date;
  logoutAt?: Date;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new Schema<ISession>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sessionToken: { type: String, required: true, unique: true },
    refreshToken: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: Object.values(SessionStatus),
      default: SessionStatus.ACTIVE,
    },
    device: {
      type: {
        type: String,
        enum: Object.values(DeviceType),
        required: true,
      },
      name: String,
      os: String,
      browser: String,
      version: String,
    },
    ipAddress: { type: String, required: true },
    location: {
      country: String,
      city: String,
      region: String,
      latitude: Number,
      longitude: Number,
    },
    userAgent: { type: String, required: true },
    isCurrent: { type: Boolean, default: true },
    lastActivity: { type: Date, default: Date.now },
    loginAt: { type: Date, default: Date.now },
    logoutAt: Date,
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true },
);

sessionSchema.index({ userId: 1, status: 1 });
sessionSchema.index({ sessionToken: 1 });
sessionSchema.index({ refreshToken: 1 });
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index
sessionSchema.index({ lastActivity: 1 });

export const Session = mongoose.model<ISession>("Session", sessionSchema);
