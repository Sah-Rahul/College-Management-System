 
import express from 'express';
import * as reviewController from './review.controller'; 
import {
  createReviewSchema,
  updateReviewSchema,
  getReviewsQuerySchema,
} from './review.zod';
import { isAuthenticated } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validate.middleware';
import { authorize } from '../../middleware/authorized.middleware';
import { UserRole } from '../users/user.enums';

const reviewRoutes = express.Router();

reviewRoutes.post(
  '/',
  isAuthenticated,
  validate(createReviewSchema),
  reviewController.createReview
);

reviewRoutes.get(
  '/',
  validate(getReviewsQuerySchema),
  reviewController.getAllReviews
);

reviewRoutes.get(
  '/:id',
  reviewController.getReviewById
);

reviewRoutes.put(
  '/:id',
  isAuthenticated,
  validate(updateReviewSchema),
  reviewController.updateReview
);

reviewRoutes.delete(
  '/:id',
  isAuthenticated,
  reviewController.deleteReview
);

reviewRoutes.post(
  '/:id/helpful',
  isAuthenticated,
  reviewController.markHelpful
);

reviewRoutes.post(
  '/:id/not-helpful',
  isAuthenticated,
  reviewController.markNotHelpful
);

reviewRoutes.post(
  '/:id/report',
  isAuthenticated,
  reviewController.reportReview
);

// reviewRoutes.post(
//   '/:id/approve',
//   isAuthenticated,
//   authorize(['instructor', 'institute_admin', 'super_admin']),
//   reviewController.approveReview
// );

// reviewRoutes.post(
//   '/:id/reject',
//   isAuthenticated,
//   authorize(['instructor', 'institute_admin', 'super_admin']),
//   reviewController.rejectReview
// );

reviewRoutes.post(
  '/:id/reply',
  isAuthenticated,
  authorize(UserRole.INSTRUCTOR, UserRole.INSTITUTE_ADMIN),
  reviewController.addReply
);

export default reviewRoutes;