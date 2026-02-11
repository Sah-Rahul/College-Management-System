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
      category,
      price,
      discountPrice,
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

    if (req.file && req.file.buffer) {
      const cloudResult = await uploadToCloudinary(req.file.buffer, "courses");
      thumbnailUrl = cloudResult.secure_url;
    }

    if (discountPrice && price && discountPrice > price) {
      throw new ApiError(400, "Discount price cannot be greater than price");
    }

    let formattedTags: string[] = [];

    if (tags) {
      formattedTags = Array.isArray(tags) ? tags : [tags];
    }

    const course = await CourseModel.create({
      courseTitle,
      description,
      category,

      createdBy: req.user._id,
      createdByRole: req.user.role,

      price: price ?? 0,
      discountPrice: discountPrice ?? 0,

      level,
      language: language ?? "Hindi",
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
    if (discountPrice !== undefined) course.discountPrice = discountPrice;

    if (level) course.level = level;
    if (language) course.language = language;
    if (tags) course.tags = tags;

    if (startDate) course.startDate = new Date(startDate);
    if (endDate) course.endDate = new Date(endDate);

    if (status) course.status = status;

    if (isActive !== undefined) course.isActive = isActive;

    if (req.file) {
      const buffer = await fs.readFile(req.file.path);
      const cloudResult = await uploadToCloudinary(buffer, "courses");
      await fs.unlink(req.file.path);

      course.thumbnail = cloudResult.secure_url;
    }

    if (course.discountPrice && course.discountPrice > course.price) {
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