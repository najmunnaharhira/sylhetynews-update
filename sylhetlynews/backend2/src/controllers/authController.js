import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "../models/User.js";
import { signToken } from "../services/tokenService.js";
import { sendError } from "../utils/response.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existing = await findUserByEmail(email);
    if (existing) {
      return sendError(res, 400, "Email already registered.");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser({
      name,
      email,
      passwordHash,
      role: "user",
    });
    return res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
      return sendError(res, 401, "Invalid credentials.");
    }
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return sendError(res, 401, "Invalid credentials.");
    }
    const token = signToken({ id: user.id, role: user.role });
    return res.json({ success: true, token });
  } catch (error) {
    next(error);
  }
};

export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user || user.role !== "admin") {
      return sendError(res, 403, "Admin access required.");
    }
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return sendError(res, 401, "Invalid credentials.");
    }
    const token = signToken({ id: user.id, role: user.role });
    return res.json({ success: true, token });
  } catch (error) {
    next(error);
  }
};
