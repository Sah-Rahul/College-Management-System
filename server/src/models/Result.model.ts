import mongoose, { Schema, Document, Model } from "mongoose";
import { Grade } from "../enums/enums";

export interface IResult extends Document {
  student: mongoose.Types.ObjectId;
  exam: mongoose.Types.ObjectId;
  subject: mongoose.Types.ObjectId;
  marksObtained: number;
  totalMarks: number;
  grade: Grade;
  percentage: number;
  isPassed: boolean;
  remarks?: string;
  enteredBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ResultSchema = new Schema<IResult>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    exam: {
      type: Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    marksObtained: {
      type: Number,
      required: true,
      min: 0,
    },
    totalMarks: {
      type: Number,
      required: true,
      min: 0,
    },
    grade: {
      type: String,
      enum: Object.values(Grade),
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    isPassed: {
      type: Boolean,
      required: true,
    },
    remarks: String,
    enteredBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

 
ResultSchema.index({ student: 1, exam: 1, subject: 1 }, { unique: true });

export const Result: Model<IResult> = mongoose.model<IResult>(
  "Result",
  ResultSchema,
);
