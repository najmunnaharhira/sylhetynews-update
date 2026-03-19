import { Router, Request, Response } from 'express';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { query } from '../config/database.js';
import { requireAdmin } from '../middleware/adminAuth.js';

const router = Router();

interface NewsRow extends RowDataPacket {
  id: number;
  title: string;
  content: string;
  summary: string | null;
  category: string;
  district: string;
  author: string;
  image_url: string;
  published: number;
  featured: number;
  views: number;
  tags: string | null;
  created_at: Date;
  updated_at: Date;
}

const parseTags = (value: string | null): string[] => {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
};

const serializeNews = (row: NewsRow) => ({
  id: String(row.id),
  title: row.title,
  content: row.content,
  summary: row.summary ?? '',
  category: row.category,
  district: row.district ?? '',
  author: row.author,
  imageUrl: row.image_url,
  published: Boolean(row.published),
  featured: Boolean(row.featured),
  views: row.views,
  tags: parseTags(row.tags),
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const normalizeId = (id: string): number => Number.parseInt(id, 10);

// Public: get all published news
router.get('/', async (_req: Request, res: Response) => {
  try {
    const rows = await query<NewsRow[]>(
      `SELECT * FROM news WHERE published = 1 ORDER BY created_at DESC LIMIT 100`
    );
    const serialized = rows.map(serializeNews);
    res.json({ news: serialized });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Public: get featured (must be before /:id)
router.get('/featured/list', async (_req: Request, res: Response) => {
  try {
    const rows = await query<NewsRow[]>(
      `SELECT * FROM news WHERE published = 1 AND featured = 1 ORDER BY created_at DESC LIMIT 10`
    );
    const serialized = rows.map(serializeNews);
    res.json({ news: serialized });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch featured news' });
  }
});

// Public: get by category (must be before /:id)
router.get('/category/:category', async (req: Request, res: Response) => {
  try {
    const rows = await query<NewsRow[]>(
      `SELECT * FROM news WHERE published = 1 AND category = ? ORDER BY created_at DESC LIMIT 50`,
      [req.params.category]
    );
    const serialized = rows.map(serializeNews);
    res.json({ news: serialized });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Public: get single news by id
router.get('/:id(\\d+)', async (req: Request, res: Response) => {
  try {
    const newsId = normalizeId(req.params.id);
    if (!Number.isInteger(newsId)) {
      return res.status(400).json({ error: 'Invalid news id' });
    }
    const rows = await query<NewsRow[]>(
      `SELECT * FROM news WHERE id = ? AND published = 1 LIMIT 1`,
      [newsId]
    );
    if (!rows[0]) {
      return res.status(404).json({ error: 'News not found' });
    }
    res.json(serializeNews(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Public: increment views
router.post('/:id(\\d+)/view', async (req: Request, res: Response) => {
  try {
    const newsId = normalizeId(req.params.id);
    if (!Number.isInteger(newsId)) {
      return res.status(400).json({ error: 'Invalid news id' });
    }
    await query<ResultSetHeader>(`UPDATE news SET views = views + 1 WHERE id = ?`, [newsId]);
    const rows = await query<NewsRow[]>(`SELECT views FROM news WHERE id = ? LIMIT 1`, [newsId]);
    if (!rows[0]) return res.status(404).json({ error: 'News not found' });
    res.json({ views: rows[0].views ?? 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update views' });
  }
});

// Admin: list all (including unpublished)
router.get('/admin/all', requireAdmin, async (_req: Request, res: Response) => {
  try {
    const rows = await query<NewsRow[]>(
      `SELECT * FROM news ORDER BY created_at DESC LIMIT 200`
    );
    const serialized = rows.map(serializeNews);
    res.json({ news: serialized });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Admin: create
router.post('/admin', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { title, content, summary, category, district, author, imageUrl, published, featured, tags } = req.body as Record<string, unknown>;
    if (!title || !content || !author || !imageUrl || !category) {
      return res.status(400).json({ error: 'title, content, author, imageUrl, category are required' });
    }
    const result = await query<ResultSetHeader>(
      `INSERT INTO news (title, content, summary, category, district, author, image_url, published, featured, tags)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        String(title).trim(),
        String(content).trim(),
        summary != null ? String(summary).trim() : '',
        String(category).trim(),
        district != null ? String(district).trim() : '',
        String(author).trim(),
        String(imageUrl).trim(),
        Boolean(published),
        Boolean(featured),
        JSON.stringify(Array.isArray(tags) ? tags.map(String) : []),
      ]
    );
    res.status(201).json({ id: String(result.insertId), message: 'News created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create news' });
  }
});

// Admin: update
router.put('/admin/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const newsId = normalizeId(req.params.id);
    if (!Number.isInteger(newsId)) {
      return res.status(400).json({ error: 'Invalid news id' });
    }

    const body = req.body as Record<string, unknown>;
    const updates: string[] = [];
    const values: unknown[] = [];
    const fieldMap: Record<string, string> = {
      title: 'title',
      content: 'content',
      summary: 'summary',
      category: 'category',
      district: 'district',
      author: 'author',
      imageUrl: 'image_url',
      published: 'published',
      featured: 'featured',
      views: 'views',
      tags: 'tags',
    };

    for (const [key, value] of Object.entries(body)) {
      const column = fieldMap[key];
      if (!column) continue;
      updates.push(`${column} = ?`);
      values.push(key === 'tags' ? JSON.stringify(Array.isArray(value) ? value.map(String) : []) : value);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No valid fields provided for update' });
    }

    values.push(newsId);
    const result = await query<ResultSetHeader>(
      `UPDATE news SET ${updates.join(', ')} WHERE id = ?`,
      values
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'News not found' });
    res.json({ id: String(newsId), message: 'News updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update news' });
  }
});

// Admin: delete
router.delete('/admin/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const newsId = normalizeId(req.params.id);
    if (!Number.isInteger(newsId)) {
      return res.status(400).json({ error: 'Invalid news id' });
    }
    const result = await query<ResultSetHeader>(`DELETE FROM news WHERE id = ?`, [newsId]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'News not found' });
    res.json({ message: 'News deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete news' });
  }
});

// Admin: delete all news
router.delete('/admin/all/delete', requireAdmin, async (_req: Request, res: Response) => {
  try {
    const result = await query<ResultSetHeader>(`DELETE FROM news`);
    res.json({ message: 'All news deleted', deletedCount: result.affectedRows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete all news' });
  }
});

// Admin: delete demo/test news
router.delete('/admin/demo/delete', requireAdmin, async (_req: Request, res: Response) => {
  try {
    const result = await query<ResultSetHeader>(
      `DELETE FROM news
       WHERE LOWER(author) LIKE '%demo%'
          OR LOWER(author) LIKE '%test%'
          OR LOWER(title) LIKE '%demo%'
          OR LOWER(title) LIKE '%test%'
          OR LOWER(title) LIKE '%sample%'`
    );
    res.json({ message: 'Demo news deleted', deletedCount: result.affectedRows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete demo news' });
  }
});

// Admin: toggle publish
router.patch('/admin/:id/publish', requireAdmin, async (req: Request, res: Response) => {
  try {
    const newsId = normalizeId(req.params.id);
    if (!Number.isInteger(newsId)) {
      return res.status(400).json({ error: 'Invalid news id' });
    }
    const { published } = req.body as { published?: boolean };
    const result = await query<ResultSetHeader>(`UPDATE news SET published = ? WHERE id = ?`, [Boolean(published), newsId]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'News not found' });
    res.json({ published: Boolean(published) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update publish status' });
  }
});

export default router;
