import express from "express";
import authMiddleware, {
  adminMiddleware,
} from "../middleware/authMiddleware.js";
import {
  createProject,
  getProjects,
  deleteProject,
  approveProject,
} from "../controllers/projectController.js";

const router = express.Router();

router.post("/", authMiddleware, createProject); // Users can create projects
router.get("/", getProjects); // Public access
router.delete("/:id", authMiddleware, adminMiddleware, deleteProject); // Admin-only
router.put("/:id/approve", authMiddleware, adminMiddleware, approveProject); // Admin-only

export default router;
