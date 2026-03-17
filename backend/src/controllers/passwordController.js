import { findUserByEmail } from "../models/User.js";
import { sendError } from "../utils/response.js";
import bcrypt from "bcryptjs";

export const requestPasswordReset = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return sendError(res, 400, "Email is required.");
    const user = await findUserByEmail(email);
    if (!user) return sendError(res, 404, "No user found with that email.");
    // TODO: Generate token, save to DB, send email (for now, just return success)
    // In production, generate a secure token and send via email
    return res.json({ success: true, message: "Password reset link sent (mock)." });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) return sendError(res, 400, "Email and new password are required.");
    const user = await findUserByEmail(email);
    if (!user) return sendError(res, 404, "No user found with that email.");
    // TODO: Validate token, update password in DB
    const passwordHash = await bcrypt.hash(newPassword, 10);
    // For now, just return success (mock)
    return res.json({ success: true, message: "Password reset successful (mock)." });
  } catch (error) {
    next(error);
  }
};
