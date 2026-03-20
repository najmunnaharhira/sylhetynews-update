import type { NextFunction, Request, Response } from 'express';
import {
  connectDB,
  getDatabaseUnavailablePayload,
  isDbConnected,
} from '../config/database.js';

export const requireDatabase = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!isDbConnected()) {
      await connectDB();
    }

    if (!isDbConnected()) {
      return res.status(503).json(getDatabaseUnavailablePayload());
    }

    return next();
  } catch (error) {
    return next(error);
  }
};
