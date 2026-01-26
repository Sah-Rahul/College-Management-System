import mongoose, { Schema, Document, Model } from "mongoose";
import { BookStatus } from "../enums/enums";

interface IIssueHistory {
  issuedTo: mongoose.Types.ObjectId;
  issuedDate: Date;
  dueDate: Date;
  returnDate?: Date;
  fine?: number;
  status: "issued" | "returned" | "overdue";
}

export interface ILibraryBook extends Document {
  title: string;
  author: string;
  isbn: string;
  category: string;
  publisher?: string;
  publishedYear?: number;
  edition?: string;
  totalCopies: number;
  availableCopies: number;
  shelfLocation?: string;
  description?: string;
  coverImage?: string;
  price?: number;
  status: BookStatus;
  issueHistory: IIssueHistory[];
  currentHolder?: mongoose.Types.ObjectId;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const IssueHistorySchema = new Schema<IIssueHistory>(
  {
    issuedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    issuedDate: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    returnDate: Date,
    fine: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ["issued", "returned", "overdue"],
      default: "issued",
    },
  },
  { _id: true },
);

const LibraryBookSchema = new Schema<ILibraryBook>(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
      maxlength: 300,
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
      maxlength: 200,
    },
    isbn: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    publisher: {
      type: String,
      trim: true,
    },
    publishedYear: {
      type: Number,
      min: 1000,
      max: new Date().getFullYear() + 1,
    },
    edition: String,
    totalCopies: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    availableCopies: {
      type: Number,
      required: true,
      min: 0,
      default: 1,
    },
    shelfLocation: String,
    description: {
      type: String,
      maxlength: 1000,
    },
    coverImage: String,
    price: {
      type: Number,
      min: 0,
    },
    status: {
      type: String,
      enum: Object.values(BookStatus),
      default: BookStatus.AVAILABLE,
    },
    issueHistory: [IssueHistorySchema],
    currentHolder: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    dueDate: Date,
  },
  {
    timestamps: true,
  },
);

// Indexes
LibraryBookSchema.index({ title: "text", author: "text", isbn: "text" });
LibraryBookSchema.index({ category: 1 });
LibraryBookSchema.index({ status: 1 });
LibraryBookSchema.index({ currentHolder: 1 });

LibraryBookSchema.pre("save", function () {
  if (this.availableCopies > this.totalCopies) {
    throw new Error("Available copies cannot exceed total copies");
  }
});

export const LibraryBook: Model<ILibraryBook> = mongoose.model<ILibraryBook>(
  "LibraryBook",
  LibraryBookSchema,
);
