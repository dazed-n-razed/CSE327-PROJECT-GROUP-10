// routes/commentRoutes.js
import express from "express";
import {
  createComment,
  getCommentsByProject,
  deleteComment,
} from "../controllers/commentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a comment (requires authentication)
router.post("/", authMiddleware, createComment);

// Get comments by project (public or authenticated access, adjust as needed)
router.get("/:projectId", getCommentsByProject);

// Delete a comment (requires authentication and ownership of the comment)
router.delete("/:commentId", authMiddleware, deleteComment);

export default router;
