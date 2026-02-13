import { Response } from "express";
import fs from "fs/promises";

import asyncHandler from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

import { AuthRequest } from "../@types/auth.types";
import { CourseModel } from "../model/course.model";
import CategoryModel from "../model/category.model";

import { uploadToCloudinary } from "../config/cloudinary.config";
import { CourseStatus, UserRole } from "../@types/enums";

export const createCourse = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const {
      courseTitle,
      description,
      LearningOutcomes,
      category,
      price,
      discountPercentage,
      level,
      language,
      tags,
      startDate,
      endDate,
    } = req.body;

    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    const categoryExists = await CategoryModel.findById(category);
    if (!categoryExists) {
      throw new ApiError(404, "Category not found");
    }

    let thumbnailUrl = "";
    if (req.file?.buffer) {
      const cloudResult = await uploadToCloudinary(req.file.buffer, "courses");
      thumbnailUrl = cloudResult.secure_url;
    }

    const originalPrice = Number(price) || 0;
    if (originalPrice < 0) {
      throw new ApiError(400, "Price cannot be negative");
    }

    let formattedDiscountPercentage = Number(discountPercentage || 0);

    if (
      isNaN(formattedDiscountPercentage) ||
      formattedDiscountPercentage < 0 ||
      formattedDiscountPercentage > 100
    ) {
      throw new ApiError(400, "Discount percentage must be between 0 and 100");
    }

    const discountAmount = (originalPrice * formattedDiscountPercentage) / 100;

    const finalPrice = Math.max(0, originalPrice - discountAmount);

    const formattedTags: string[] = tags
      ? Array.isArray(tags)
        ? tags.map((t: any) => String(t).trim()).filter(Boolean)
        : [String(tags).trim()].filter(Boolean)
      : [];

    const course = await CourseModel.create({
      courseTitle,
      description,
      LearningOutcomes,
      category,

      createdBy: req.user._id,
      createdByRole: req.user.role,

      price: originalPrice,
      discountPercentage: formattedDiscountPercentage,
      finalPrice,

      level,
      language: language ?? "Nepali",

      tags: formattedTags,

      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,

      thumbnail: thumbnailUrl,

      status: CourseStatus.DRAFT,
      isActive: true,
    });

    await CategoryModel.findByIdAndUpdate(category, {
      $inc: { courseInCategory: 1 },
    });

    res
      .status(201)
      .json(new ApiResponse(201, course, "Course created successfully"));
  },
);

export const updateCourse = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const courseId = req.params.id;

    if (!req.user) throw new ApiError(401, "Unauthorized");

    const course = await CourseModel.findById(courseId);
    if (!course) throw new ApiError(404, "Course not found");

    if (course.createdBy.toString() !== req.user._id) {
      throw new ApiError(403, "You are not allowed to update this course");
    }

    const {
      courseTitle,
      description,
      category,
      price,
      discountPrice,
      level,
      language,
      tags,
      startDate,
      endDate,
      status,
      isActive,
    } = req.body;

    if (category) {
      const catExists = await CategoryModel.findById(category);
      if (!catExists) throw new ApiError(404, "Category not found");
      course.category = category;
    }

    if (courseTitle) course.courseTitle = courseTitle;
    if (description) course.description = description;

    if (price !== undefined) course.price = price;
    if (discountPrice !== undefined) course.discountPercentage = discountPrice;

    if (level) course.level = level;
    if (language) course.language = language;
    if (tags) course.tags = tags;

    if (startDate) course.startDate = new Date(startDate);
    if (endDate) course.endDate = new Date(endDate);

    if (status) course.status = status;

    if (isActive !== undefined) course.isActive = isActive;

    if (req.file) {
      const buffer = req.file.buffer;
      const cloudResult = await uploadToCloudinary(buffer, "courses");
      course.thumbnail = cloudResult.secure_url;
    }

    if (course.discountPercentage && course.discountPercentage > course.price) {
      throw new ApiError(400, "Discount price cannot be greater than price");
    }

    await course.save();

    res
      .status(200)
      .json(new ApiResponse(200, course, "Course updated successfully"));
  },
);

export const deleteCourse = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const courseId = req.params.id;

    if (!req.user) throw new ApiError(401, "Unauthorized");

    const course = await CourseModel.findById(courseId);
    if (!course) throw new ApiError(404, "Course not found");

    if (course.createdBy.toString() !== req.user._id) {
      throw new ApiError(403, "You are not allowed to delete this course");
    }

    await CourseModel.findByIdAndDelete(courseId);

    res.status(200).json(new ApiResponse(200, null, "Course deleted"));
  },
);

export const getAllCourses = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const allCourses = await CourseModel.find()
      .populate("category", "categoryName slug")
      .sort({ createdAt: -1 });

    res
      .status(200)
      .json(new ApiResponse(200, allCourses, "Courses fetched successfully"));
  },
);

export const publishCourse = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const courseId = req.params.id;

    if (!req.user) throw new ApiError(401, "Unauthorized");

    const course = await CourseModel.findById(courseId);
    if (!course) throw new ApiError(404, "Course not found");

    const isOwner = course.createdBy.toString() === req.user._id;
    if (!isOwner && req.user.role !== UserRole.ADMIN) {
      throw new ApiError(403, "You are not allowed to publish this course");
    }

    if (course.status === CourseStatus.PUBLISHED) {
      throw new ApiError(400, "Course is already published");
    }

    course.status = CourseStatus.PUBLISHED;
    course.isActive = true;

    await course.save();

    res
      .status(200)
      .json(new ApiResponse(200, course, "Course published successfully"));
  },
);

export const unpublishCourse = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const courseId = req.params.id;

    if (!req.user) throw new ApiError(401, "Unauthorized");

    const course = await CourseModel.findById(courseId);
    if (!course) throw new ApiError(404, "Course not found");

    const isOwner = course.createdBy.toString() === req.user._id;
    if (!isOwner && req.user.role !== UserRole.ADMIN) {
      throw new ApiError(403, "You are not allowed to unpublish this course");
    }

    if (course.status === CourseStatus.DRAFT) {
      throw new ApiError(400, "Course is already in draft");
    }

    course.status = CourseStatus.DRAFT;
    course.isActive = false;

    await course.save();

    res
      .status(200)
      .json(new ApiResponse(200, course, "Course unpublished successfully"));
  },
);
