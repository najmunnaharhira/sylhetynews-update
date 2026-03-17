import { Router } from "express";
import { findUserByEmail } from "../models/User.js";
import { sendError } from "../utils/response.js";

const router = Router();

// List all admins
router.get("/admins", async (_req, res, next) => {
  try {
    const result = await query(
      "SELECT id, name, email, role FROM users WHERE role = 'admin'"
    );
    return res.json({ admins: result.rows });
  } catch (error) {
    next(error);
  }
});

// Add admin (mock)
router.post("/admins", async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return sendError(res, 400, "Email is required.");
    const user = await findUserByEmail(email);
    if (!user) return sendError(res, 404, "User not found.");
    await query("UPDATE users SET role = 'admin' WHERE email = $1", [email]);
    return res.json({ success: true, message: "Admin added." });
  } catch (error) {
    next(error);
  }
});

// Remove admin (mock)
router.delete("/admins/:email", async (req, res, next) => {
  try {
    const { email } = req.params;
    if (!email) return sendError(res, 400, "Email is required.");
    const user = await findUserByEmail(email);
    if (!user) return sendError(res, 404, "User not found.");
    await query("UPDATE users SET role = 'user' WHERE email = $1", [email]);
    return res.json({ success: true, message: "Admin removed." });
  } catch (error) {
    next(error);
  }
});

export default router;
