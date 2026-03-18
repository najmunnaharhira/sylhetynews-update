import { Router, Request, Response } from 'express';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { query } from '../config/database.js';
import { requireAdmin } from '../middleware/adminAuth.js';

const router = Router();

interface CategoryRow extends RowDataPacket {
  id: number;
  name: string;
  slug: string;
  icon: string;
}

const normalizeId = (id: string): number => Number.parseInt(id, 10);

// Public: get all categories
router.get('/', async (_req: Request, res: Response) => {
  try {
    const categories = await query<CategoryRow[]>(`SELECT id, name, slug, icon FROM categories ORDER BY name ASC`);
    const serialized = categories.map((c) => ({
      id: String(c.id),
      name: c.name,
      slug: c.slug,
      icon: c.icon,
    }));
    res.json({ categories: serialized });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Admin: create
router.post('/', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { name, slug, icon } = req.body as { name?: string; slug?: string; icon?: string };
    if (!name || !slug) {
      return res.status(400).json({ error: 'name and slug are required' });
    }
    const result = await query<ResultSetHeader>(
      `INSERT INTO categories (name, slug, icon) VALUES (?, ?, ?)`,
      [
        String(name).trim(),
        String(slug).trim().toLowerCase().replace(/\s+/g, '-'),
        icon != null ? String(icon) : '',
      ]
    );
    res.status(201).json({ id: String(result.insertId), message: 'Category created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// Admin: update
router.put('/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const categoryId = normalizeId(req.params.id);
    if (!Number.isInteger(categoryId)) {
      return res.status(400).json({ error: 'Invalid category id' });
    }

    const body = req.body as Record<string, unknown>;
    const updates: string[] = [];
    const values: unknown[] = [];

    if (typeof body.name === 'string') {
      updates.push('name = ?');
      values.push(body.name.trim());
    }
    if (typeof body.slug === 'string') {
      updates.push('slug = ?');
      values.push(body.slug.trim().toLowerCase().replace(/\s+/g, '-'));
    }
    if (typeof body.icon === 'string') {
      updates.push('icon = ?');
      values.push(body.icon);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No valid fields provided for update' });
    }

    values.push(categoryId);
    const result = await query<ResultSetHeader>(
      `UPDATE categories SET ${updates.join(', ')} WHERE id = ?`,
      values
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Category not found' });
    res.json({ id: String(categoryId), message: 'Category updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update category' });
  }
});

// Admin: delete
router.delete('/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const categoryId = normalizeId(req.params.id);
    if (!Number.isInteger(categoryId)) {
      return res.status(400).json({ error: 'Invalid category id' });
    }
    const result = await query<ResultSetHeader>(`DELETE FROM categories WHERE id = ?`, [categoryId]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Category not found' });
    res.json({ message: 'Category deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

export default router;
