import express from "express";
import * as discussionController from "./discussion.controller";
import {
  createDiscussionSchema,
  updateDiscussionSchema,
  createReplySchema,
  getDiscussionsQuerySchema,
  getDiscussionByIdSchema,
  replyIdSchema,
} from "./discussion.zod";
import { isAuthenticated } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";

const discussionRoutes = express.Router();

discussionRoutes.post(
  "/",
  isAuthenticated,
  validate(createDiscussionSchema),
  discussionController.createDiscussion,
);

discussionRoutes.get(
  "/",
  isAuthenticated,
  validate(getDiscussionsQuerySchema),
  discussionController.getAllDiscussions,
);

// Get course discussions
discussionRoutes.get("/course/:courseId", discussionController.getCourseDiscussions);

// Get discussion by ID
discussionRoutes.get(
  "/:id",
  validate(getDiscussionByIdSchema),
  discussionController.getDiscussionById,
);

// Update discussion
discussionRoutes.put(
  "/:id",
  isAuthenticated,
  validate(updateDiscussionSchema),
  discussionController.updateDiscussion,
);

// Delete discussion
discussionRoutes.delete(
  "/:id",
  isAuthenticated,
  validate(getDiscussionByIdSchema),
  discussionController.deleteDiscussion,
);

// Add reply
discussionRoutes.post(
  "/:id/replies",
  isAuthenticated,
  validate(createReplySchema),
  discussionController.addReply,
);

// Update reply
discussionRoutes.put(
  "/:id/replies/:replyId",
  isAuthenticated,
  validate(replyIdSchema),
  discussionController.updateReply,
);

// Delete reply
discussionRoutes.delete(
  "/:id/replies/:replyId",
  isAuthenticated,
  validate(replyIdSchema),
  discussionController.deleteReply,
);

// Upvote discussion
discussionRoutes.post(
  "/:id/upvote",
  isAuthenticated,
  validate(getDiscussionByIdSchema),
  discussionController.upvoteDiscussion,
);

// Downvote discussion
discussionRoutes.post(
  "/:id/downvote",
  isAuthenticated,
  validate(getDiscussionByIdSchema),
  discussionController.downvoteDiscussion,
);

// Upvote reply
discussionRoutes.post(
  "/:id/replies/:replyId/upvote",
  isAuthenticated,
  validate(replyIdSchema),
  discussionController.upvoteReply,
);

// Downvote reply
discussionRoutes.post(
  "/:id/replies/:replyId/downvote",
  isAuthenticated,
  validate(replyIdSchema),
  discussionController.downvoteReply,
);

// Accept answer
// discussionRoutes.post(
//   "/:id/replies/:replyId/accept",
//   isAuthenticated,
//   authorize(["instructor", "institute_admin"]),
//   validate(replyIdSchema),
//   discussionController.acceptAnswer,
// );

// Pin discussion
// discussionRoutes.patch(
//   "/:id/pin",
//   isAuthenticated,
//   authorize(["instructor", "institute_admin"]),
//   validate(getDiscussionByIdSchema),
//   discussionController.pinDiscussion,
// );

// Close discussion
// discussionRoutes.patch(
//   "/:id/close",
//   isAuthenticated,
//   authorize(["instructor", "institute_admin"]),
//   validate(getDiscussionByIdSchema),
//   discussionController.closeDiscussion,
// );

// Report discussion
discussionRoutes.post(
  "/:id/report",
  isAuthenticated,
  validate(getDiscussionByIdSchema),
  discussionController.reportDiscussion,
);

export default discussionRoutes;
