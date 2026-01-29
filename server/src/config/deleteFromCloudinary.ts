import { v2 as cloudinary } from "cloudinary";

export const deleteFromCloudinary = async (imageUrl: string) => {
  if (!imageUrl) return;

  const publicId = imageUrl.split("/").slice(-2).join("/").split(".")[0];

  await cloudinary.uploader.destroy(publicId);
};
