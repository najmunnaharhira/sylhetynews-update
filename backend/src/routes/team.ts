import { Router, Request, Response } from 'express';
import { Team } from '../models/Team.js';
import { requireAdmin } from '../middleware/adminAuth.js';

const router = Router();

// Public: get all team members
router.get('/', async (_req: Request, res: Response) => {
  try {
    const members = await Team.find().sort({ order: 1, name: 1 }).lean();
    const serialized = (members as Array<Record<string, unknown>>).map((m) => ({
      id: (m._id as { toString: () => string }).toString(),
      name: m.name,
      role: m.role,
      order: m.order,
      introduction: m.introduction,
      _id: undefined,
    }));
    res.json({ team: serialized });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch team' });
  }
});

// Admin: create
router.post('/', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { name, role, order, introduction } = req.body as { name?: string; role?: string; order?: number; introduction?: string };
    if (!name || !role) {
      return res.status(400).json({ error: 'name and role are required' });
    }
    const doc = await Team.create({
      name: String(name).trim(),
      role: String(role).trim(),
      order: typeof order === 'number' ? order : 0,
      introduction: introduction != null ? String(introduction) : '',
    });
    res.status(201).json({ id: doc._id.toString(), message: 'Team member created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create team member' });
  }
});

// Admin: update
router.put('/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const doc = await Team.findByIdAndUpdate(
      req.params.id,
      req.body as Record<string, unknown>,
      { new: true, runValidators: true }
    );
    if (!doc) return res.status(404).json({ error: 'Team member not found' });
    res.json({ id: doc._id.toString(), message: 'Team member updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update team member' });
  }
});

// Admin: delete
router.delete('/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const doc = await Team.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Team member not found' });
    res.json({ message: 'Team member deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete team member' });
  }
});

export default router;
