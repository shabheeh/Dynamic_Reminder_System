import logger from "@/configs/logger";
import { NextFunction, Request, Response } from "express";
import { AppError } from "@/utils/error";

export const errorHandler = (
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const status = error instanceof AppError ? error.status : 500;
  const message =
    process.env.NODE_ENV === "development"
      ? error.message || "Internal server error"
      : "Internal server error";

  logger.error("Unhandled error:", {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
  });
  

  res.status(status).json({
    success: false,
    error: message,
    timestamp: new Date().toISOString(),
  });
};

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    error: `Route ${req.method} ${req.path} not found`,
    timestamp: new Date().toISOString(),
  });
};
