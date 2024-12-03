import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  registerUser,
  loginUser,
  getProfile,
} from "../controllers/userController.js";

const router = express.Router();

// Public route for user registration
router.post("/register", registerUser);

// Public route for user login
router.post("/login", loginUser);

// Protected route for fetching user profile
router.get("/profile", authMiddleware, getProfile);

export default router;
