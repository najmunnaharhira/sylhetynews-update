import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import { ResultSetHeader } from 'mysql2';
import { query } from '../config/database.js';
import { findUserByEmail } from '../models/User.js';

export const requestPasswordReset = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body as { email?: string };
    if (typeof email !== 'string' || email.trim().length === 0) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    const user = await findUserByEmail(email.trim().toLowerCase());
    if (!user) {
      return res.status(404).json({ error: 'No user found with that email.' });
    }

    return res.json({ success: true, message: 'Password reset link sent (mock).' });
  } catch (error) {
    return next(error);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, newPassword } = req.body as { email?: string; newPassword?: string };
    if (typeof email !== 'string' || typeof newPassword !== 'string') {
      return res.status(400).json({ error: 'Email and new password are required.' });
    }

    const user = await findUserByEmail(email.trim().toLowerCase());
    if (!user) {
      return res.status(404).json({ error: 'No user found with that email.' });
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await query<ResultSetHeader>(`UPDATE users SET password_hash = ? WHERE id = ?`, [
      passwordHash,
      user.id,
    ]);

    return res.json({ success: true, message: 'Password reset successful.' });
  } catch (error) {
    return next(error);
  }
};
