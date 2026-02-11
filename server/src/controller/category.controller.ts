import { Response } from "express";
import { AuthRequest } from "../@types/auth.types";
import asyncHandler from "../utils/AsyncHandler";
import CategoryModel from "../model/category.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import cloudinary, { uploadToCloudinary } from "../config/cloudinary.config";

export const createCategory = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { categoryName } = req.body;

    if (!categoryName?.trim())
      throw new ApiError(400, "Category name is required");

    if (!req.file) throw new ApiError(400, "Category image is required");

    const cloudResult = await uploadToCloudinary(req.file.buffer, "categories");

    const existingCategory = await CategoryModel.findOne({
      categoryName: categoryName.trim(),
    });
    if (existingCategory) throw new ApiError(400, "Category already exists");

    const category = await CategoryModel.create({
      categoryName: categoryName.trim(),
      categoryImage: cloudResult.secure_url,
    });

    res
      .status(201)
      .json(new ApiResponse(201, category, "Category created successfully"));
  },
);

export const getAllCategories = asyncHandler(
  async (_req: AuthRequest, res: Response) => {
    const categories = await CategoryModel.find().sort({ createdAt: -1 });
    res
      .status(200)
      .json(
        new ApiResponse(200, categories, "All categories fetched successfully"),
      );
  },
);

export const updateCategory = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const id = req.params.id;
    const { categoryName } = req.body;

    if (!id) throw new ApiError(400, "Category ID is required");

    const category = await CategoryModel.findById(id);
    if (!category) throw new ApiError(404, "Category not found");

    if (categoryName) category.categoryName = categoryName.trim();

    if (req.file) {
      if (category.categoryImage) {
        const segments = category.categoryImage.split("/");
        const publicIdWithExt = segments[segments.length - 1];
        const publicId = publicIdWithExt.split(".")[0];
        await cloudinary.uploader.destroy(`categories/${publicId}`);
      }

      const cloudResult = await uploadToCloudinary(
        req.file.buffer,
        "categories",
      );
      category.categoryImage = cloudResult.secure_url;
    }

    await category.save();

    res
      .status(200)
      .json(new ApiResponse(200, category, "Category updated successfully"));
  },
);

export const deleteCategory = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const categoryId = req.params.id;
    if (!categoryId) throw new ApiError(400, "Category ID is required");

    const category = await CategoryModel.findById(categoryId);
    if (!category) throw new ApiError(404, "Category not found");

    await CategoryModel.findByIdAndDelete(categoryId);

    res
      .status(200)
      .json(new ApiResponse(200, null, "Category deleted successfully"));
  },
);
