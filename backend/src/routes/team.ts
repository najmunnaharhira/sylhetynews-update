import { Router, Request, Response } from 'express';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { query } from '../config/database.js';
import { requireAdmin } from '../middleware/adminAuth.js';
import { requireDatabase } from '../middleware/requireDatabase.js';

const router = Router();

router.use(requireDatabase);

interface TeamRow extends RowDataPacket {
  id: number;
  name: string;
  role: string;
  display_order: number;
  introduction: string | null;
}

const normalizeId = (id: string): number => Number.parseInt(id, 10);

// Public: get all team members
router.get('/', async (_req: Request, res: Response) => {
  try {
    const members = await query<TeamRow[]>(
      `SELECT id, name, role, display_order, introduction FROM team_members ORDER BY display_order ASC, name ASC`
    );
    const serialized = members.map((m) => ({
      id: String(m.id),
      name: m.name,
      role: m.role,
      order: m.display_order,
      introduction: m.introduction ?? '',
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
    const result = await query<ResultSetHeader>(
      `INSERT INTO team_members (name, role, display_order, introduction) VALUES (?, ?, ?, ?)`,
      [
        String(name).trim(),
        String(role).trim(),
        typeof order === 'number' ? order : 0,
        introduction != null ? String(introduction) : '',
      ]
    );
    res.status(201).json({ id: String(result.insertId), message: 'Team member created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create team member' });
  }
});

// Admin: update
router.put('/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const memberId = normalizeId(req.params.id);
    if (!Number.isInteger(memberId)) {
      return res.status(400).json({ error: 'Invalid team member id' });
    }

    const body = req.body as Record<string, unknown>;
    const updates: string[] = [];
    const values: unknown[] = [];

    if (typeof body.name === 'string') {
      updates.push('name = ?');
      values.push(body.name.trim());
    }
    if (typeof body.role === 'string') {
      updates.push('role = ?');
      values.push(body.role.trim());
    }
    if (typeof body.order === 'number') {
      updates.push('display_order = ?');
      values.push(body.order);
    }
    if (typeof body.introduction === 'string') {
      updates.push('introduction = ?');
      values.push(body.introduction);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No valid fields provided for update' });
    }

    values.push(memberId);
    const result = await query<ResultSetHeader>(
      `UPDATE team_members SET ${updates.join(', ')} WHERE id = ?`,
      values
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Team member not found' });
    res.json({ id: String(memberId), message: 'Team member updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update team member' });
  }
});

// Admin: delete
router.delete('/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const memberId = normalizeId(req.params.id);
    if (!Number.isInteger(memberId)) {
      return res.status(400).json({ error: 'Invalid team member id' });
    }
    const result = await query<ResultSetHeader>(`DELETE FROM team_members WHERE id = ?`, [memberId]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Team member not found' });
    res.json({ message: 'Team member deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete team member' });
  }
});

export default router;
