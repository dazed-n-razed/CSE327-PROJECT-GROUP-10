// routes/projectRoutes.js

import express from "express";
import { protect } from "../middleware/authMiddleware.js"; // Import protect as named import
import { createProject } from "../controllers/projectController.js";

const router = express.Router();

// Protect the project creation route
router.post("/", protect, createProject);

export default router;
