import { Request, Response, NextFunction } from "express";
import * as service from "./instituteRequest.service";
import { ApiResponse } from "../../utils/ApiResponse";
import { HTTP_STATUS } from "../../constant/httpStatus";
import {
  INSTITUTE_REQUEST_CONSTANTS,
  INSTITUTE_REQUEST_MESSAGES,
} from "./instituteRequest.constants";
import {
  CreateInstituteRequestDTO,
  UpdateInstituteRequestDTO,
  ReviewInstituteRequestDTO,
} from "./instituteRequest.dto";
import { createInstituteRequestSchema } from "./instituteRequest.zod";

export const createInstituteRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId)
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: INSTITUTE_REQUEST_MESSAGES.UNAUTHORIZED });

    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0)
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: INSTITUTE_REQUEST_MESSAGES.INSUFFICIENT_DOCUMENTS });

    const parseResult = createInstituteRequestSchema.safeParse(req.body);
    if (!parseResult.success)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: parseResult.error.issues.map((i) => i.message).join(", "),
      });

    const request = await service.createInstituteRequestService(
      parseResult.data,
      userId,
      files,
    );
    res
      .status(HTTP_STATUS.CREATED)
      .json(
        new ApiResponse(
          HTTP_STATUS.CREATED,
          request,
          INSTITUTE_REQUEST_MESSAGES.SUBMITTED,
        ),
      );
  } catch (error) {
    next(error);
  }
};

export const getAllInstituteRequests = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const requests = await service.getAllInstituteRequests();
    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          requests,
          INSTITUTE_REQUEST_MESSAGES.ALLINSSTITUTEREQUESTS,
        ),
      );
  } catch (error) {
    next(error);
  }
};

export const getInstituteRequestById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const requestId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;
    const request = await service.getInstituteRequestById(requestId);
    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          request,
          INSTITUTE_REQUEST_MESSAGES.FETCHED,
        ),
      );
  } catch (error) {
    next(error);
  }
};

export const getMyInstituteRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user?.userId;
    const requests = await service.getMyInstituteRequest(userId);
    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          requests,
          "My institute requests fetched",
        ),
      );
  } catch (error) {
    next(error);
  }
};

export const updateInstituteRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user?.userId;
    const requestId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;
    const files = req.files as Express.Multer.File[];
    const data: UpdateInstituteRequestDTO = req.body;

    const request = await service.updateInstituteRequestService(
      requestId,
      data,
      userId,
      files,
    );
    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          request,
          INSTITUTE_REQUEST_MESSAGES.UPDATED,
        ),
      );
  } catch (error) {
    next(error);
  }
};

export const deleteInstituteRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user?.userId;
    const requestId = req.params.id as string;
    await service.deleteInstituteRequestService(requestId, userId);
    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          null,
          INSTITUTE_REQUEST_MESSAGES.DELETED,
        ),
      );
  } catch (error) {
    next(error);
  }
};

export const reviewInstituteRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reviewerId = (req as any).user?.userId;
    const requestId = req.params.id as string;
    const data: ReviewInstituteRequestDTO = req.body;

    const request = await service.reviewInstituteRequestService(
      requestId,
      data,
      reviewerId,
    );
    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          request,
          INSTITUTE_REQUEST_MESSAGES.REVIEWED,
        ),
      );
  } catch (error) {
    next(error);
  }
};

export const acceptOrRejectInstituteRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reviewerId = (req as any).user?.userId;
    if (!reviewerId)
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: INSTITUTE_REQUEST_MESSAGES.UNAUTHORIZED });

    const requestId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;
    const data: ReviewInstituteRequestDTO = req.body;

    if (!["approved", "rejected"].includes(data.status))
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "Invalid status. Must be 'approved' or 'rejected'" });

    const request = await service.acceptOrRejectInstituteRequestService(
      requestId,
      data,
      reviewerId,
    );
    const message =
      data.status === "approved"
        ? INSTITUTE_REQUEST_MESSAGES.APPROVED
        : INSTITUTE_REQUEST_MESSAGES.REJECTED;

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, request, message));
  } catch (error) {
    next(error);
  }
};
