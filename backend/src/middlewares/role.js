import { sendError } from "../utils/response.js";

export const authorizeRole = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return sendError(res, 403, "Insufficient permissions.");
    }
    next();
  };
};
