import mongoose, { Schema, Document, Model } from "mongoose";

export interface IQuizAnswer {
  question: mongoose.Types.ObjectId;

  // for MCQ
  selectedOption?: string;

  // for descriptive
  textAnswer?: string;

  marksObtained?: number;
}

export interface IQuizSubmission extends Document {
  quiz: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;

  student: mongoose.Types.ObjectId;

  answers: IQuizAnswer[];

  score: number;
  submittedAt?: Date;

  startedAt?: Date;

  isEvaluated: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const quizSubmissionSchema = new Schema<IQuizSubmission>(
  {
    quiz: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },

    student: { type: Schema.Types.ObjectId, ref: "User", required: true },

    answers: {
      type: [
        {
          question: {
            type: Schema.Types.ObjectId,
            ref: "Question",
            required: true,
          },
          selectedOption: { type: String, maxlength: 5000 },
          textAnswer: { type: String, maxlength: 20000 },
          marksObtained: { type: Number, min: 0, max: 1000 },
        },
      ],
      default: [],
    },

    score: { type: Number, default: 0, min: 0, max: 100000 },

    startedAt: { type: Date },
    submittedAt: { type: Date },

    isEvaluated: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// one submission per student per quiz
quizSubmissionSchema.index({ quiz: 1, student: 1 }, { unique: true });

quizSubmissionSchema.index({ course: 1 });
quizSubmissionSchema.index({ student: 1 });
quizSubmissionSchema.index({ submittedAt: -1 });

export const QuizSubmission: Model<IQuizSubmission> =
  mongoose.model<IQuizSubmission>("QuizSubmission", quizSubmissionSchema);
