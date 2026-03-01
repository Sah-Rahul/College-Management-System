import { HTTP_STATUS } from "../../constant/httpStatus";
import { ApiError } from "../../utils/ApiError";
import CourseModel from "../courses/course.model";
import EnrollmentModel from "../enrollments/enrollment.model";
import { REVIEW_CONSTANTS, REVIEW_MESSAGES } from "./review.constants";
import {
  CreateReviewDTO,
  UpdateReviewDTO,
  GetReviewsQueryDTO,
} from "./review.dto";
import { ReviewType } from "./review.enums";
import ReviewModel from "./review.model";

export const createReviewServices = async (
  data: CreateReviewDTO,
  userId: string,
) => {
  if (!userId) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, REVIEW_MESSAGES.UNAUTHORIZED);
  }

  if (!data.courseId) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Course ID is required");
  }

  if (
    data.comment.length < REVIEW_CONSTANTS.MIN_COMMENT_LENGTH ||
    data.comment.length > REVIEW_CONSTANTS.MAX_COMMENT_LENGTH
  ) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      `Comment must be between ${REVIEW_CONSTANTS.MIN_COMMENT_LENGTH} and ${REVIEW_CONSTANTS.MAX_COMMENT_LENGTH} characters`,
    );
  }

  const course = await CourseModel.findById(data.courseId);

  if (!course) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Course not found");
  }

  const enrolled = await EnrollmentModel.findOne({
    user: userId,
    course: data.courseId,
  });

  if (!enrolled) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, REVIEW_MESSAGES.NOT_ENROLLED);
  }

  const existingReview = await ReviewModel.findOne({
    user: userId,
    course: data.courseId,
  });

  if (existingReview) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      REVIEW_MESSAGES.ALREADY_REVIEWED,
    );
  }

  const review = await ReviewModel.create({
    userId: userId,
    type: ReviewType.COURSE,
    courseId: data.courseId,
    comment: data.comment,
    isVerifiedPurchase: true,
  });

  course.totalReviews = (course.totalReviews || 0) + 1;
  await course.save();

  return review;
};

export const getAllReviewsService = async (query: GetReviewsQueryDTO) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = query;

  const skip = (page - 1) * limit;

  const total = await ReviewModel.countDocuments();

  const reviews = await ReviewModel.find()
    .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
    .skip(skip)
    .limit(limit)
    .populate("userId", "name avatar")
    .populate("courseId", "title")
    .populate("instituteId", "name");

  return {
    data: reviews,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getReviewByIdService = async (reviewId: string) => {
  if (!reviewId) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Review ID is required");
  }

  const review = await ReviewModel.findById(reviewId)
    .populate("userId", "name avatar")
    .populate("courseId", "title")
    .populate("instituteId", "name");

  if (!review) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, REVIEW_MESSAGES.NOT_FOUND);
  }

  return review;
};

export const updateReviewService = async (
  reviewId: string,
  userId: string,
  data: UpdateReviewDTO,
) => {
  if (!userId) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized");
  }

  const review = await ReviewModel.findById(reviewId);
  if (!review) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, REVIEW_MESSAGES.NOT_FOUND);
  }

  if (review.userId.toString() !== userId) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, REVIEW_MESSAGES.UNAUTHORIZED);
  }

  if (data.comment !== undefined) review.comment = data.comment;

  await review.save();

  return review;
};

export const deleteReviewService = async (reviewId: string, userId: string) => {
  if (!userId) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, REVIEW_MESSAGES.USER);
  }

  const review = await ReviewModel.findById(reviewId);
  if (!review) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, REVIEW_MESSAGES.NOT_FOUND);
  }

  if (review.userId.toString() !== userId) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, REVIEW_MESSAGES.NOT_AUTHORIZED);
  }

  const deletedReview = await ReviewModel.findByIdAndDelete(reviewId);
  if (!deletedReview) {
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      REVIEW_MESSAGES.NOT_DELETED,
    );
  }

  return deletedReview;
};

