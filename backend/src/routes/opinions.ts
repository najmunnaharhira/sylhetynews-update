import { Router } from 'express';
import { Opinion } from '../models/Opinion.js';

const router = Router();

router.get('/', async (_req, res) => {
  const opinions = await Opinion.find().sort({ created_at: -1 });
  res.json({ opinions });
});

router.post('/', async (req, res) => {
  const { name, comment, rating } = req.body;
  if (!comment || !rating) {
    return res.status(400).json({ error: 'comment and rating are required' });
  }
  const opinion = await Opinion.create({
    name: name || 'Anonymous',
    comment,
    rating,
  });
  res.status(201).json({ opinion });
});

router.post('/:id/like', async (req, res) => {
  const sessionId = req.header('x-session-id') || req.ip;
  const opinion = await Opinion.findById(req.params.id);
  if (!opinion) {
    return res.status(404).json({ error: 'Opinion not found' });
  }
  const likedBy = new Set(opinion.likedBy || []);
  if (likedBy.has(sessionId)) {
    likedBy.delete(sessionId);
    opinion.likes_count = Math.max(0, (opinion.likes_count || 0) - 1);
  } else {
    likedBy.add(sessionId);
    opinion.likes_count = (opinion.likes_count || 0) + 1;
  }
  opinion.likedBy = Array.from(likedBy);
  await opinion.save();
  res.json({ likes_count: opinion.likes_count });
});

export default router;
