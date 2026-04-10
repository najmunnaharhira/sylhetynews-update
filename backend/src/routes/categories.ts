import { Router, Request, Response } from 'express';
import { Category } from '../models/Category.js';
import { requireAdmin } from '../middleware/adminAuth.js';

const router = Router();

// Public: get all categories
router.get('/', async (_req: Request, res: Response) => {
  try {
    const categories = await Category.find().sort({ name: 1 }).lean();
    const serialized = (categories as Array<Record<string, unknown>>).map((c) => ({
      id: (c._id as { toString: () => string }).toString(),
      name: c.name,
      slug: c.slug,
      icon: c.icon,
      _id: undefined,
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
    const doc = await Category.create({
      name: String(name).trim(),
      slug: String(slug).trim().toLowerCase().replace(/\s+/g, '-'),
      icon: icon != null ? String(icon) : '',
    });
    res.status(201).json({ id: doc._id.toString(), message: 'Category created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// Admin: update
router.put('/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const doc = await Category.findByIdAndUpdate(
      req.params.id,
      req.body as Record<string, unknown>,
      { new: true, runValidators: true }
    );
    if (!doc) return res.status(404).json({ error: 'Category not found' });
    res.json({ id: doc._id.toString(), message: 'Category updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update category' });
  }
});

// Admin: delete
router.delete('/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const doc = await Category.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Category not found' });
    res.json({ message: 'Category deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

export default router;
