import { Router } from "express";
import { authenticate } from "../middlewares/auth.js";
import { authorizeRole } from "../middlewares/role.js";
import { sendSuccess } from "../utils/response.js";

const router = Router();

router.get("/profile", authenticate, (req, res) => {
  return sendSuccess(res, { user: req.user }, "Profile loaded.");
});

router.get(
  "/admin/overview",
  authenticate,
  authorizeRole(["admin"]),
  (req, res) => {
    return sendSuccess(res, { stats: { users: 120 } }, "Admin overview.");
  }
);

export default router;
