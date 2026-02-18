import { Router, Request, Response } from 'express';
import { News } from '../models/News.js';
import { requireAdmin } from '../middleware/adminAuth.js';

const router = Router();

// Public: get all published news
router.get('/', async (_req: Request, res: Response) => {
  try {
    const news = await News.find({ published: true })
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();
    const serialized = (news as Array<Record<string, unknown>>).map((n) => ({
      ...n,
      id: (n._id as { toString: () => string }).toString(),
      createdAt: n.createdAt,
      updatedAt: n.updatedAt,
      _id: undefined,
    }));
    res.json({ news: serialized });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Public: get featured (must be before /:id)
router.get('/featured/list', async (_req: Request, res: Response) => {
  try {
    const news = await News.find({ published: true, featured: true })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();
    const serialized = (news as Array<Record<string, unknown>>).map((n) => ({
      ...n,
      id: (n._id as { toString: () => string }).toString(),
      _id: undefined,
    }));
    res.json({ news: serialized });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch featured news' });
  }
});

// Public: get by category (must be before /:id)
router.get('/category/:category', async (req: Request, res: Response) => {
  try {
    const news = await News.find({
      published: true,
      category: req.params.category,
    })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();
    const serialized = (news as Array<Record<string, unknown>>).map((n) => ({
      ...n,
      id: (n._id as { toString: () => string }).toString(),
      _id: undefined,
    }));
    res.json({ news: serialized });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Public: get single news by id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const doc = await News.findById(req.params.id).lean();
    if (!doc) {
      return res.status(404).json({ error: 'News not found' });
    }
    const n = doc as Record<string, unknown>;
    res.json({
      ...n,
      id: (n._id as { toString: () => string }).toString(),
      _id: undefined,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Public: increment views
router.post('/:id/view', async (req: Request, res: Response) => {
  try {
    const doc = await News.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).lean();
    if (!doc) return res.status(404).json({ error: 'News not found' });
    res.json({ views: (doc as { views?: number }).views ?? 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update views' });
  }
});

// Admin: list all (including unpublished)
router.get('/admin/all', requireAdmin, async (_req: Request, res: Response) => {
  try {
    const news = await News.find().sort({ createdAt: -1 }).limit(200).lean();
    const serialized = (news as Array<Record<string, unknown>>).map((n) => ({
      ...n,
      id: (n._id as { toString: () => string }).toString(),
      _id: undefined,
    }));
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
    const doc = await News.create({
      title: String(title),
      content: String(content),
      summary: summary != null ? String(summary) : '',
      category: String(category),
      district: district != null ? String(district) : '',
      author: String(author),
      imageUrl: String(imageUrl),
      published: Boolean(published),
      featured: Boolean(featured),
      tags: Array.isArray(tags) ? tags.map(String) : [],
    });
    res.status(201).json({ id: doc._id.toString(), message: 'News created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create news' });
  }
});

// Admin: update
router.put('/admin/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const doc = await News.findByIdAndUpdate(
      req.params.id,
      req.body as Record<string, unknown>,
      { new: true, runValidators: true }
    );
    if (!doc) return res.status(404).json({ error: 'News not found' });
    res.json({ id: doc._id.toString(), message: 'News updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update news' });
  }
});

// Admin: delete
router.delete('/admin/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const doc = await News.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: 'News not found' });
    res.json({ message: 'News deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete news' });
  }
});

// Admin: toggle publish
router.patch('/admin/:id/publish', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { published } = req.body as { published?: boolean };
    const doc = await News.findByIdAndUpdate(
      req.params.id,
      { published: Boolean(published) },
      { new: true }
    );
    if (!doc) return res.status(404).json({ error: 'News not found' });
    res.json({ published: (doc as { published?: boolean }).published });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update publish status' });
  }
});

export default router;
