import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized User",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET!);

    if (!decode) {
      return res.status(401).json({
        message: "Unauthorized User",
      });
    }

    if (typeof decode !== "string" && "email" in decode) {
      req.userEmail = decode.email as string;
    } else {
      return res.status(401).json({
        message: "Unauthorized User",
      });
    }
    next();
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
