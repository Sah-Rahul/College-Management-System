import { Schema, model, Types } from "mongoose";
import slugify from "slugify";
import { CourseLevel, CourseStatus, UserRole } from "../@types/enums";

export interface ICourse {
  courseTitle: string;
  slug: string;

  description: string;
  LearningOutcomes: string;
  thumbnail?: string;

  category: Types.ObjectId;

  createdBy: Types.ObjectId;
  createdByRole: UserRole;

  price: number;
  discountPercentage?: number;
  finalPrice: number;

  level: CourseLevel;
  language: string;

  tags: string[];

  totalDuration: number;
  totalLectures: number;

  enrolledCount: number;

  averageRating: number;
  ratingCount: number;

  startDate?: Date;
  endDate?: Date;

  status: CourseStatus;
  isActive: boolean;
}

const courseSchema = new Schema<ICourse>(
  {
    courseTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
    LearningOutcomes: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      default: "",
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    createdByRole: {
      type: String,
      enum: [UserRole.INSTRUCTOR, UserRole.INSTITUTE, UserRole.ADMIN],
      required: true,
    },

    price: {
      type: Number,
      default: 0,
      min: 0,
    },
    discountPercentage: {
      type: Number,
      default: 0,
      min: 0,
    },
    finalPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
    level: {
      type: String,
      enum: Object.values(CourseLevel),
      default: CourseLevel.BEGINNER,
    },

    language: {
      type: String,
      default: "Hindi",
      trim: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    totalDuration: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalLectures: {
      type: Number,
      default: 0,
      min: 0,
    },

    enrolledCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    ratingCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    startDate: { type: Date },
    endDate: { type: Date },

    status: {
      type: String,
      enum: Object.values(CourseStatus),
      default: CourseStatus.DRAFT,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

courseSchema.pre("validate", function (next) {
  if (this.courseTitle) {
    this.slug = slugify(this.courseTitle, { lower: true, strict: true });
  }
});

export const CourseModel = model<ICourse>("Course", courseSchema);
