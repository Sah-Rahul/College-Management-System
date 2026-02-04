import mongoose, { Schema, Document, Model } from "mongoose"; 
import { QuizStatus } from "../@types/enums";

export interface IQuiz extends Document {
  course: mongoose.Types.ObjectId;
  teacher: mongoose.Types.ObjectId;

  title: string;
  description?: string;

  status: QuizStatus;

  durationMinutes: number;

  startTime?: Date;
  endTime?: Date;

  totalMarks: number;

  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const quizSchema = new Schema<IQuiz>(
  {
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    teacher: { type: Schema.Types.ObjectId, ref: "User", required: true },

    title: { type: String, required: true, trim: true, minlength: 2, maxlength: 200 },
    description: { type: String, maxlength: 10000 },

    status: {
      type: String,
      enum: Object.values(QuizStatus),
      default: QuizStatus.DRAFT,
    },

    durationMinutes: { type: Number, required: true, min: 1, max: 600 },

    startTime: { type: Date },
    endTime: { type: Date },

    totalMarks: { type: Number, default: 100, min: 0, max: 5000 },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

quizSchema.index({ course: 1 });
quizSchema.index({ teacher: 1 });
quizSchema.index({ status: 1 });
quizSchema.index({ startTime: 1, endTime: 1 });
quizSchema.index({ isActive: 1 });

export const Quiz: Model<IQuiz> = mongoose.model<IQuiz>("Quiz", quizSchema);
