// middleware/authMiddleware.js
import { extractToken, verifyToken } from "../utils/helper.js"; // Import helper functions

// Authentication middleware to check if the user is authenticated
export default function authMiddleware(req, res, next) {
  try {
    // Extract token using the helper function
    const token = extractToken(req);

    // If token is missing, return an error response
    if (!token) {
      return res.status(401).json({ error: "Access denied, token missing" });
    }

    // Verify the token using the helper function
    const decoded = verifyToken(token);

    // If token is invalid or expired, return an error response
    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Attach decoded user information to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If an error occurs, return an error response
    res.status(401).json({ error: "Invalid token" });
  }
}

// Admin middleware to ensure that the user has an admin role
export const adminMiddleware = (req, res, next) => {
  // Check if the user is authenticated and has an 'admin' role
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied, admin only" });
  }

  // If user is an admin, proceed to the next middleware/route handler
  next();
};
