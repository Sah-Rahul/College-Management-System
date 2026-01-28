import mongoose, { Schema, Document, Model } from "mongoose";

export enum AdminLevel {
  ADMIN = "admin",
}

export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  role: AdminLevel;
  permissions: string[];
  profilePicture?: string;
  gender?: string;
  isActive: boolean; 
  createdBy?: mongoose.Types.ObjectId;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema = new Schema<IAdmin>(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,  
    },

    role: {
      type: String,
      enum: Object.values(AdminLevel),
      default: AdminLevel.ADMIN,
    },

    profilePicture: {
      type: String,
      default: "",
    },

    gender: String,

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },

    lastLogin: Date,
  },
  { timestamps: true },
);

export const AdminModel: Model<IAdmin> = mongoose.model<IAdmin>(
  "Admin",
  AdminSchema
);
