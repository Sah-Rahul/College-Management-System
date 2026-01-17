import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

interface IUser {
  _id: string;
  name: string;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user?: IUser | null;
}

export const isAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    console.log("authHeader Missing================>", authHeader);

console.log("JWT_SECRET=========>", process.env.JWT_SECRET);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        message: "Please login to access this resource",
      });
      return;
    }

    const token = authHeader.split(" ")[1];
    console.log("token Missing======================>", token);
    if (!token) {
      res.status(401).json({
        message: "Token not provided",
      });
      return;
    }

    const decodedValue = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload & { id?: string; user?: IUser };

    console.log("decodedValue Missing=========================>", decodedValue);

    if (decodedValue.user) {
      req.user = decodedValue.user;
    } else if (decodedValue.id) {
      req.user = {
        _id: decodedValue.id,
        name: "",
        email: "",
      };
    } else {
      res.status(401).json({
        message: "Invalid token",
      });
      return;
    }

    next();
  } catch (error: any) {
    res.status(401).json({
      message:
        error.name === "TokenExpiredError" ? "Token Expired" : "Invalid Token",
    });
  }
};
