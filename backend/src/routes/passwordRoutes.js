import { Router } from "express";
import { requestPasswordReset, resetPassword } from "../controllers/passwordController.js";
import { requireDatabase } from "../middleware/requireDatabase.js";

const router = Router();

router.use(requireDatabase);

router.post("/request-reset", requestPasswordReset);
router.post("/reset", resetPassword);

export default router;
