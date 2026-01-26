import mongoose, { Schema, Document, Model } from "mongoose";

export interface IExamSubject extends Document {
  exam: mongoose.Types.ObjectId;
  subject: mongoose.Types.ObjectId;
  examDate: Date;
  startTime: string;
  endTime: string;
  totalMarks: number;
  passingMarks: number;
  room?: string;
  duration?: number; // in minutes
  instructions?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ExamSubjectSchema = new Schema<IExamSubject>(
  {
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
    examDate: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
    },
    endTime: {
      type: String,
      required: true,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
    },
    totalMarks: {
      type: Number,
      required: true,
      min: 0,
    },
    passingMarks: {
      type: Number,
      required: true,
      min: 0,
    },
    room: {
      type: String,
      trim: true,
    },
    duration: {
      type: Number,
      min: 0,
    },
    instructions: {
      type: String,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  },
);

// Unique constraint: one exam subject per exam
ExamSubjectSchema.index({ exam: 1, subject: 1 }, { unique: true });
ExamSubjectSchema.index({ examDate: 1 });

export const ExamSubject: Model<IExamSubject> = mongoose.model<IExamSubject>(
  "ExamSubject",
  ExamSubjectSchema,
);
