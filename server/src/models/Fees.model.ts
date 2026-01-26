import mongoose, { Schema, Document, Model } from "mongoose";
import { FeeStatus, PaymentMode } from "../enums/enums";

interface IPaymentHistory {
  amount: number;
  paymentMode: PaymentMode;
  transactionId?: string;
  paymentDate: Date;
  receiptNumber: string;
  remarks?: string;
}

export interface IFees extends Document {
  student: mongoose.Types.ObjectId;
  academicYear: string;  
  semester: number;
  totalFee: number;
  paidAmount: number;
  pendingAmount: number;
  dueDate: Date;
  status: FeeStatus;
  paymentHistory: IPaymentHistory[];
  lateFee?: number;
  discount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentHistorySchema = new Schema<IPaymentHistory>(
  {
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentMode: {
      type: String,
      enum: Object.values(PaymentMode),
      required: true,
    },
    transactionId: String,
    paymentDate: {
      type: Date,
      required: true,
    },
    receiptNumber: {
      type: String,
      required: true,
      unique: true,
    },
    remarks: String,
  },
  { _id: true },
);

const FeesSchema = new Schema<IFees>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    academicYear: {
      type: String,
      required: true,
    },
    semester: {
      type: Number,
      required: true,
      min: 1,
    },
    totalFee: {
      type: Number,
      required: true,
      min: 0,
    },
    paidAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    pendingAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(FeeStatus),
      default: FeeStatus.PENDING,
    },
    paymentHistory: [PaymentHistorySchema],
    lateFee: {
      type: Number,
      default: 0,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

FeesSchema.index({ student: 1, academicYear: 1, semester: 1 });
FeesSchema.index({ status: 1 });
FeesSchema.index({ dueDate: 1 });

export const Fees: Model<IFees> = mongoose.model<IFees>("Fees", FeesSchema);
