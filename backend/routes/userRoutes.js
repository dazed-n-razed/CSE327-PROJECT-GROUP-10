import express from "express";
import authMiddleware, {
  adminMiddleware,
} from "../middleware/authMiddleware.js";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// User routes
router.post("/register", registerUser); // Register a new user
router.post("/login", loginUser); // Login user
router.get("/profile", authMiddleware, getUserProfile); // Auth required
router.put("/profile", authMiddleware, updateUserProfile); // Auth required
router.delete("/profile", authMiddleware, deleteUser); // Auth required

export default router;
