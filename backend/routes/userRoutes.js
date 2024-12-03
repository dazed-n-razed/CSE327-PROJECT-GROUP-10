import express from "express";
import { protect } from "../middleware/authMiddleware.js"; // Correctly import the protect middleware
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
router.get("/profile", protect, getProfile); // Use the 'protect' middleware here

export default router;
