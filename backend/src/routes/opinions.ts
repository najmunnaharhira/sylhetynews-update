import { Router } from 'express';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { query } from '../config/database.js';
import { requireDatabase } from '../middleware/requireDatabase.js';

const router = Router();

router.use(requireDatabase);

interface OpinionRow extends RowDataPacket {
  id: number;
  name: string;
  comment: string;
  rating: number;
  likes_count: number;
  liked_by: string | null;
  created_at: Date;
}

const parseLikedBy = (value: string | null): string[] => {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
};

const normalizeId = (id: string): number => Number.parseInt(id, 10);

router.get('/', async (_req, res) => {
  const rows = await query<OpinionRow[]>(
    `SELECT id, name, comment, rating, likes_count, liked_by, created_at FROM opinions ORDER BY created_at DESC`
  );
  const opinions = rows.map((row) => ({
    id: String(row.id),
    name: row.name,
    comment: row.comment,
    rating: row.rating,
    likes_count: row.likes_count,
    likedBy: parseLikedBy(row.liked_by),
    created_at: row.created_at,
  }));
  res.json({ opinions });
});

router.post('/', async (req, res) => {
  const { name, comment, rating } = req.body;
  if (!comment || !rating) {
    return res.status(400).json({ error: 'comment and rating are required' });
  }

  const result = await query<ResultSetHeader>(
    `INSERT INTO opinions (name, comment, rating, likes_count, liked_by) VALUES (?, ?, ?, 0, ?)` ,
    [name || 'Anonymous', comment, Number(rating), JSON.stringify([])]
  );

  const rows = await query<OpinionRow[]>(
    `SELECT id, name, comment, rating, likes_count, liked_by, created_at FROM opinions WHERE id = ? LIMIT 1`,
    [result.insertId]
  );
  const row = rows[0];
  res.status(201).json({
    opinion: {
      id: String(row.id),
      name: row.name,
      comment: row.comment,
      rating: row.rating,
      likes_count: row.likes_count,
      likedBy: parseLikedBy(row.liked_by),
      created_at: row.created_at,
    },
  });
});

router.post('/:id/like', async (req, res) => {
  const sessionId = req.header('x-session-id') ?? req.ip ?? 'anonymous';
  const opinionId = normalizeId(req.params.id);
  if (!Number.isInteger(opinionId)) {
    return res.status(400).json({ error: 'Invalid opinion id' });
  }

  const rows = await query<OpinionRow[]>(
    `SELECT id, likes_count, liked_by FROM opinions WHERE id = ? LIMIT 1`,
    [opinionId]
  );
  const opinion = rows[0];
  if (!opinion) {
    return res.status(404).json({ error: 'Opinion not found' });
  }

  const likedBy = new Set(parseLikedBy(opinion.liked_by));
  let likesCount = opinion.likes_count || 0;
  if (likedBy.has(sessionId)) {
    likedBy.delete(sessionId);
    likesCount = Math.max(0, likesCount - 1);
  } else {
    likedBy.add(sessionId);
    likesCount += 1;
  }

  await query<ResultSetHeader>(
    `UPDATE opinions SET likes_count = ?, liked_by = ? WHERE id = ?`,
    [likesCount, JSON.stringify(Array.from(likedBy)), opinionId]
  );
  res.json({ likes_count: likesCount });
});

export default router;
