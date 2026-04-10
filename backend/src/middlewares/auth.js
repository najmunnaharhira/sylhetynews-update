import jwt from "jsonwebtoken";
import { sendError } from "../utils/response.js";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.substring(7)
    : null;

  if (!token) {
    return sendError(res, 401, "Authentication required.");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    return sendError(res, 401, "Invalid token.");
  }
};
