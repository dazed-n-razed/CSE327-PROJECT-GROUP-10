import express from "express";
import { createProject } from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js"; // Middleware to check user authentication

const router = express.Router();

// Route to create a new project
router.post("/", protect, createProject);

export default router;
