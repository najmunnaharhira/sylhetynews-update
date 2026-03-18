import { Router } from "express";
import { login, register, adminLogin } from "../controllers/authController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/admin/login", adminLogin);

export default router;
