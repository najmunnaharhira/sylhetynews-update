import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { requireAdmin } from '../middleware/adminAuth.js';

const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminEmail || (!adminPassword && !adminPasswordHash)) {
    return res.status(500).json({ error: 'Admin credentials not configured' });
  }

  if (email.toLowerCase() !== adminEmail.toLowerCase()) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  let passwordMatches = false;
  if (adminPasswordHash) {
    passwordMatches = await bcrypt.compare(password, adminPasswordHash);
  } else if (adminPassword) {
    passwordMatches = password === adminPassword;
  }

  if (!passwordMatches) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: 'JWT secret not configured' });
  }

  const token = jwt.sign(
    { email: adminEmail, role: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return res.json({
    token,
    user: {
      email: adminEmail,
      role: 'admin',
    },
  });
});

router.get('/status', requireAdmin, (req, res) => {
  res.json({ status: 'admin ok', user: req.adminUser });
});

export default router;
