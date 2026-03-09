import { Response } from "express";
import jwt from "jsonwebtoken";

interface SendTokenOptions {
  user: {
    _id: any;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
  statusCode: number;
  res: Response;
  message?: string;
}

export const sendToken = ({
  user,
  statusCode,
  res,
  message = "Logged in successfully",
}: SendTokenOptions): void => {
  const secret = process.env.JWT_SECRET_KEY!;

  // Ek hi token — cookie mein save hoga
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    secret,
    { expiresIn: "7d" },
  );

  const cookieExpiresInDays = Number(process.env.COOKIES_EXPIRES_IN) || 7;

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,                                    // JS se access nahi hoga
      secure: process.env.NODE_ENV === "production",    // HTTPS only in prod
      sameSite: "strict",
      expires: new Date(Date.now() + cookieExpiresInDays * 24 * 60 * 60 * 1000),
    })
    .json({
      success: true,
      message,
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
};