import mongoose, { Schema, Document, Model } from "mongoose";

export enum StaffDepartment {
  ADMINISTRATION = "administration",
  LIBRARY = "library",
  SECURITY = "security",
  MAINTENANCE = "maintenance",
  TRANSPORT = "transport",
  CANTEEN = "canteen",
  IT = "it",
  ACCOUNTS = "accounts",
  HR = "hr",
  OTHER = "other",
}

export enum StaffShift {
  MORNING = "morning",
  EVENING = "evening",
  NIGHT = "night",
  ROTATIONAL = "rotational",
}

export interface IStaff extends Document {
  name: string;
  employeeId: string;
  department: StaffDepartment;
  designation: string;
  shift: StaffShift;
  salary: number;
  joiningDate: Date;
  exitDate?: Date;
  isActive: boolean;
  profilePicture?: string;
}

const StaffSchema = new Schema<IStaff>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    employeeId: {
      type: String,
      required: [true, "Employee ID is required"],
      unique: true,
      uppercase: true,
    },
    department: {
      type: String,
      enum: Object.values(StaffDepartment),
      required: [true, "Department is required"],
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true,
    },
    shift: {
      type: String,
      enum: Object.values(StaffShift),
      default: StaffShift.MORNING,
    },
    salary: {
      type: Number,
      required: [true, "Salary is required"],
      min: 0,
    },
    joiningDate: {
      type: Date,
      required: [true, "Joining date is required"],
    },
    exitDate: Date,
    isActive: {
      type: Boolean,
      default: true,
    },
    profilePicture: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
StaffSchema.index({ employeeId: 1 });
StaffSchema.index({ user: 1 });
StaffSchema.index({ department: 1 });
StaffSchema.index({ isActive: 1 });

export const Staff: Model<IStaff> = mongoose.model<IStaff>(
  "Staff",
  StaffSchema,
);
