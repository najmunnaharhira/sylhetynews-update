import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

interface AdminTokenPayload extends jwt.JwtPayload {
  email: string;
  role: 'admin';
}

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization') || '';
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice('Bearer '.length)
    : '';

  if (!token) {
    return res.status(401).json({ error: 'Missing authorization token' });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: 'JWT secret not configured' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET) as AdminTokenPayload;
    if (payload.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    req.adminUser = { email: payload.email, role: payload.role };
    return next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
