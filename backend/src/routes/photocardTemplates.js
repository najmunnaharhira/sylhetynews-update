import { Router } from "express";
import { query } from "../config/database.js";
import { requireAdmin } from "../middleware/adminAuth.js";
import { requireDatabase } from "../middleware/requireDatabase.js";

const router = Router();

router.use(requireDatabase);

const serializeTemplate = (row) => ({
  id: String(row.id),
  name: row.name,
  description: row.description ?? "",
  imageUrl: row.image_url,
  previewUrl: row.preview_url ?? "",
  category: row.category ?? "",
  isActive: Boolean(row.is_active),
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const normalizeId = (id) => Number.parseInt(id, 10);

router.get("/", async (_req, res) => {
  try {
    const rows = await query(
      `SELECT id, name, description, image_url, preview_url, category, is_active, created_at, updated_at
       FROM photocard_templates
       ORDER BY created_at DESC`
    );
    res.json({ templates: rows.map(serializeTemplate) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch photocard templates" });
  }
});

router.post("/", requireAdmin, async (req, res) => {
  try {
    const { name, description, imageUrl, previewUrl, category, isActive } = req.body;

    if (typeof name !== "string" || typeof imageUrl !== "string") {
      return res.status(400).json({ error: "name and imageUrl are required" });
    }

    const result = await query(
      `INSERT INTO photocard_templates (name, description, image_url, preview_url, category, is_active)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        name.trim(),
        typeof description === "string" ? description.trim() : "",
        imageUrl.trim(),
        typeof previewUrl === "string" && previewUrl.trim().length > 0 ? previewUrl.trim() : imageUrl.trim(),
        typeof category === "string" ? category.trim() : "",
        Boolean(isActive ?? true),
      ]
    );

    res.status(201).json({ id: String(result.insertId), message: "Photocard template created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create photocard template" });
  }
});

router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const templateId = normalizeId(req.params.id);
    if (!Number.isInteger(templateId)) {
      return res.status(400).json({ error: "Invalid template id" });
    }

    const updates = [];
    const values = [];

    if (typeof req.body.name === "string") {
      updates.push("name = ?");
      values.push(req.body.name.trim());
    }
    if (typeof req.body.description === "string") {
      updates.push("description = ?");
      values.push(req.body.description.trim());
    }
    if (typeof req.body.imageUrl === "string") {
      updates.push("image_url = ?");
      values.push(req.body.imageUrl.trim());
    }
    if (typeof req.body.previewUrl === "string") {
      updates.push("preview_url = ?");
      values.push(req.body.previewUrl.trim());
    }
    if (typeof req.body.category === "string") {
      updates.push("category = ?");
      values.push(req.body.category.trim());
    }
    if (typeof req.body.isActive === "boolean") {
      updates.push("is_active = ?");
      values.push(req.body.isActive);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: "No valid fields provided for update" });
    }

    values.push(templateId);
    const result = await query(
      `UPDATE photocard_templates SET ${updates.join(", ")} WHERE id = ?`,
      values
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Photocard template not found" });
    }

    res.json({ id: String(templateId), message: "Photocard template updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update photocard template" });
  }
});

router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const templateId = normalizeId(req.params.id);
    if (!Number.isInteger(templateId)) {
      return res.status(400).json({ error: "Invalid template id" });
    }

    const result = await query("DELETE FROM photocard_templates WHERE id = ?", [templateId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Photocard template not found" });
    }

    res.json({ message: "Photocard template deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete photocard template" });
  }
});

export default router;
