import mongoose, { Schema, Document } from "mongoose"; 
import { CategoryStatus } from "./category.enums";

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  image?: string;
  parentId?: mongoose.Types.ObjectId;
  level: number;
  order: number;
  status: CategoryStatus;
  totalCourses: number;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String },
    icon: String,
    image: String,
    parentId: { type: Schema.Types.ObjectId, ref: "Category" },
    level: { type: Number, default: 0, min: 0, max: 3 },
    order: { type: Number, default: 0 },
    status: {
      type: String,
      enum: Object.values(CategoryStatus),
      default: CategoryStatus.ACTIVE,
    },
    totalCourses: { type: Number, default: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

categorySchema.index({ slug: 1 });
categorySchema.index({ parentId: 1, status: 1 });
categorySchema.index({ level: 1, order: 1 });

const CategoryModel = mongoose.model<ICategory>("Category", categorySchema);

export default CategoryModel