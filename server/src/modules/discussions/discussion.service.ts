import {
  CreateDiscussionDTO,
  UpdateDiscussionDTO,
  CreateReplyDTO,
  GetDiscussionsQueryDTO,
} from "./discussion.dto";

export const createDiscussion = async (
  data: CreateDiscussionDTO,
  userId: string,
) => {
  // TODO: Create discussion
};

export const getAllDiscussions = async (query: GetDiscussionsQueryDTO) => {
  // TODO: Get all discussions with filters
};

export const getDiscussionById = async (discussionId: string) => {
  // TODO: Get discussion by ID and increment views
};

export const getCourseDiscussions = async (courseId: string, query: any) => {
  // TODO: Get discussions for specific course
};

export const updateDiscussion = async (
  discussionId: string,
  data: UpdateDiscussionDTO,
  userId: string,
) => {
  // TODO: Update discussion
};

export const deleteDiscussion = async (
  discussionId: string,
  userId: string,
) => {
  // TODO: Delete discussion
};

export const addReply = async (
  discussionId: string,
  data: CreateReplyDTO,
  userId: string,
) => {
  // TODO: Add reply to discussion
};

export const updateReply = async (
  discussionId: string,
  replyId: string,
  content: string,
  userId: string,
) => {
  // TODO: Update reply
};

export const deleteReply = async (
  discussionId: string,
  replyId: string,
  userId: string,
) => {
  // TODO: Delete reply
};

export const upvoteDiscussion = async (
  discussionId: string,
  userId: string,
) => {
  // TODO: Upvote discussion
};

export const downvoteDiscussion = async (
  discussionId: string,
  userId: string,
) => {
  // TODO: Downvote discussion
};

export const upvoteReply = async (
  discussionId: string,
  replyId: string,
  userId: string,
) => {
  // TODO: Upvote reply
};

export const downvoteReply = async (
  discussionId: string,
  replyId: string,
  userId: string,
) => {
  // TODO: Downvote reply
};

export const acceptAnswer = async (
  discussionId: string,
  replyId: string,
  userId: string,
) => {
  // TODO: Mark reply as accepted answer
};

export const pinDiscussion = async (discussionId: string, userId: string) => {
  // TODO: Pin discussion
};

export const closeDiscussion = async (
  discussionId: string,
  reason: string,
  userId: string,
) => {
  // TODO: Close discussion
};

export const reportDiscussion = async (
  discussionId: string,
  reason: string,
  userId: string,
) => {
  // TODO: Report discussion
};
