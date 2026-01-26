import mongoose, { Schema, Document, Model } from "mongoose";
import { SalaryStatus } from "../enums/enums";

export interface ISalary extends Document {
  employee: mongoose.Types.ObjectId;
  employeeType: "teacher" | "staff";
  month: string;  
  basicSalary: number;
  allowances?: number;
  deductions?: number;
  netSalary: number;
  paymentDate?: Date;
  paymentMode?: string;
  transactionId?: string;
  status: SalaryStatus;
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SalarySchema = new Schema<ISalary>(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    employeeType: {
      type: String,
      enum: ["teacher", "staff"],
      required: true,
    },
    month: {
      type: String,
      required: true,
      match: /^\d{4}-(0[1-9]|1[0-2])$/,
    },
    basicSalary: {
      type: Number,
      required: true,
      min: 0,
    },
    allowances: {
      type: Number,
      default: 0,
      min: 0,
    },
    deductions: {
      type: Number,
      default: 0,
      min: 0,
    },
    netSalary: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentDate: Date,
    paymentMode: String,
    transactionId: String,
    status: {
      type: String,
      enum: Object.values(SalaryStatus),
      default: SalaryStatus.PENDING,
    },
    remarks: String,
  },
  {
    timestamps: true,
  },
);

 
SalarySchema.index({ employee: 1, month: 1 }, { unique: true });
SalarySchema.index({ status: 1 });

export const Salary: Model<ISalary> = mongoose.model<ISalary>(
  "Salary",
  SalarySchema,
);
