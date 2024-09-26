import { AccessDeniedError } from "../utils/appErrors.js";

export const authMiddleware = (req, res, next) => {
  const isAdmin = req.user && req.user.role === "admin";
  if (!isAdmin) {
    return new AccessDeniedError("Forbidden, admin access only");
  }
  next();
};
