import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const { verify } = jwt;

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ").at(1);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. Please log in into your account.",
    });
  }

  try {
    const decodedCodeInfo = verify(token, process.env.JWT_SECRET_KEY!);

    req.userInfo = decodedCodeInfo;
    next();
  } catch (error) {
    console.error("Something went wrong ->", error);
    res.status(500).json({
      success: false,
      message: "Could not access this page. Please try again.",
    });
  }
}

export default authMiddleware;
