import { Schema, model } from "mongoose";
import slugify from "slugify";

export interface ICategory {
  categoryName: string;
  categoryImage: string;
  courseInCategory: number;
  slug: string;
}

const categorySchema = new Schema<ICategory>(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
    },
    categoryImage: {
      type: String,
      required: true,
      trim: true,
    },
    courseInCategory: {
      type: Number,
      default: 0,
      required: false,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true },
);

categorySchema.pre("validate", function (next) {
  if (this.categoryName) {
    this.slug = slugify(this.categoryName, {
      lower: true,
      strict: true,
    });
  }
});

const CategoryModel = model<ICategory>("Category", categorySchema);

export default CategoryModel;
