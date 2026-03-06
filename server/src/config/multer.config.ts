import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import path from "path";

const storage = multer.memoryStorage();

const ALLOWED_IMAGE_TYPES = [".jpg", ".jpeg", ".png", ".webp"];
const ALLOWED_VIDEO_TYPES = [".mp4", ".mov", ".avi", ".mkv", ".webm"];

const courseFileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (file.fieldname === "thumbnail") {
    if (!ALLOWED_IMAGE_TYPES.includes(ext)) {
      return cb(new Error("Thumbnail must be an image (jpg, jpeg, png, webp)"));
    }
  }

  if (file.fieldname === "previewVideo") {
    if (!ALLOWED_VIDEO_TYPES.includes(ext)) {
      return cb(new Error("Preview must be a video (mp4, mov, avi, mkv, webm)"));
    }
  }

  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter: courseFileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB (video ke liye)
  },
});