import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { query } from '../config/database.js';
import { requireAdmin } from '../middleware/adminAuth.js';
import { requireDatabase } from '../middleware/requireDatabase.js';

const router = Router();

interface SettingsRow extends RowDataPacket {
  site_name: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string | null;
  ad_rate_per_1000_views: number;
}

interface RevenueRow extends RowDataPacket {
  totalNews: number;
  publishedNews: number;
  unpublishedNews: number;
  totalViews: number;
}


router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isString().notEmpty().withMessage('Password is required'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    const { email, password } = req.body as { email?: string; password?: string };
    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    if (!adminEmail || (!adminPassword && !adminPasswordHash)) {
      return res.status(500).json({ error: 'Admin credentials not configured' });
    }

    if (normalizedEmail !== adminEmail.toLowerCase()) {
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
  }
);

router.get('/status', requireAdmin, (req, res) => {
  res.json({ status: 'admin ok', user: req.adminUser });
});

router.get('/business-settings', requireAdmin, requireDatabase, async (_req, res) => {
  try {
    const rows = await query<SettingsRow[]>(
      `SELECT site_name, contact_email, contact_phone, contact_address, ad_rate_per_1000_views
       FROM business_settings
       WHERE id = 1
       LIMIT 1`
    );
    const row = rows[0];
    if (!row) {
      return res.status(404).json({ error: 'Settings not found' });
    }
    res.json({
      siteName: row.site_name,
      contactEmail: row.contact_email,
      contactPhone: row.contact_phone,
      contactAddress: row.contact_address ?? '',
      adRatePer1000Views: Number(row.ad_rate_per_1000_views ?? 0),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to load business settings' });
  }
});

router.put('/business-settings', requireAdmin, requireDatabase, async (req, res) => {
  try {
    const { siteName, contactEmail, contactPhone, contactAddress, adRatePer1000Views } = req.body as {
      siteName?: string;
      contactEmail?: string;
      contactPhone?: string;
      contactAddress?: string;
      adRatePer1000Views?: number;
    };

    await query<ResultSetHeader>(
      `UPDATE business_settings
       SET site_name = ?,
           contact_email = ?,
           contact_phone = ?,
           contact_address = ?,
           ad_rate_per_1000_views = ?
       WHERE id = 1`,
      [
        siteName?.trim() || 'Sylhety News',
        contactEmail?.trim() || '',
        contactPhone?.trim() || '',
        contactAddress?.trim() || '',
        Number(adRatePer1000Views ?? 0),
      ]
    );

    res.json({ message: 'Business settings updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update business settings' });
  }
});

router.get('/revenue-summary', requireAdmin, requireDatabase, async (_req, res) => {
  try {
    const statsRows = await query<RevenueRow[]>(
      `SELECT
          COUNT(*) AS totalNews,
          SUM(CASE WHEN published = 1 THEN 1 ELSE 0 END) AS publishedNews,
          SUM(CASE WHEN published = 0 THEN 1 ELSE 0 END) AS unpublishedNews,
          COALESCE(SUM(views), 0) AS totalViews
       FROM news`
    );

    const settingsRows = await query<SettingsRow[]>(
      `SELECT ad_rate_per_1000_views FROM business_settings WHERE id = 1 LIMIT 1`
    );

    const stats = statsRows[0];
    const adRate = Number(settingsRows[0]?.ad_rate_per_1000_views ?? 0);
    const totalViews = Number(stats?.totalViews ?? 0);
    const estimatedRevenue = (totalViews / 1000) * adRate;

    res.json({
      totalNews: Number(stats?.totalNews ?? 0),
      publishedNews: Number(stats?.publishedNews ?? 0),
      unpublishedNews: Number(stats?.unpublishedNews ?? 0),
      totalViews,
      adRatePer1000Views: adRate,
      estimatedRevenue,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to load revenue summary' });
  }
});

export default router;
