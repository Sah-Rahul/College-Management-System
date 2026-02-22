import {
  CreateReviewDTO,
  UpdateReviewDTO,
  GetReviewsQueryDTO,
} from "./review.dto";

export const createReview = async (data: CreateReviewDTO, userId: string) => {
  // TODO: Create review
};

export const getAllReviews = async (query: GetReviewsQueryDTO) => {
  // TODO: Get all reviews
};

export const getReviewById = async (reviewId: string) => {
  // TODO: Get review by ID
};

export const updateReview = async (
  reviewId: string,
  data: UpdateReviewDTO,
  userId: string,
) => {
  // TODO: Update review
};

export const deleteReview = async (reviewId: string, userId: string) => {
  // TODO: Delete review
};

export const markHelpful = async (reviewId: string, userId: string) => {
  // TODO: Mark review as helpful
};

export const markNotHelpful = async (reviewId: string, userId: string) => {
  // TODO: Mark review as not helpful
};

export const reportReview = async (
  reviewId: string,
  reason: string,
  userId: string,
) => {
  // TODO: Report review
};

export const approveReview = async (reviewId: string, moderatorId: string) => {
  // TODO: Approve review
};

export const rejectReview = async (
  reviewId: string,
  moderatorId: string,
  reason: string,
) => {
  // TODO: Reject review
};

export const addReply = async (
  reviewId: string,
  comment: string,
  userId: string,
) => {
  // TODO: Add reply to review
};
