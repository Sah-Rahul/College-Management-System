import mongoose, { Schema, Document, Model } from "mongoose"; 
import { QuizQuestionType } from "../@types/enums";

export interface IQuestionOption {
  text: string;
}

export interface IQuestion extends Document {
  quiz: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;

  type: QuizQuestionType;

  questionText: string;

  options: IQuestionOption[];

  correctAnswer?: string;

  marks: number;

  order: number;

  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const questionSchema = new Schema<IQuestion>(
  {
    quiz: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },

    type: {
      type: String,
      enum: Object.values(QuizQuestionType),
      default: QuizQuestionType.MCQ,
    },

    questionText: { type: String, required: true, minlength: 2, maxlength: 20000 },

    options: {
      type: [{ text: { type: String, required: true, maxlength: 5000 } }],
      default: [],
    },

    correctAnswer: { type: String, maxlength: 5000 },

    marks: { type: Number, default: 1, min: 0, max: 1000 },

    order: { type: Number, default: 1, min: 1 },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

questionSchema.index({ quiz: 1, order: 1 });
questionSchema.index({ course: 1 });
questionSchema.index({ type: 1 });

export const Question: Model<IQuestion> = mongoose.model<IQuestion>(
  "Question",
  questionSchema
);
