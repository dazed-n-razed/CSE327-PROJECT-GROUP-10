import express from "express";
import authMiddleware, {
  adminMiddleware,
} from "../middleware/authMiddleware.js";
import {
  createPledge,
  deletePledge,
  getPledgesByProject,
  getPledgesByUser,
} from "../controllers/pledgeController.js";

const router = express.Router();

// Route to create a pledge (accessible by authenticated users)
router.post("/", authMiddleware, createPledge);

// Route to delete a pledge (only accessible by admins)
router.delete("/:id", authMiddleware, adminMiddleware, deletePledge);

// Route to get all pledges for a specific project (accessible by everyone)
router.get("/project/:projectId", getPledgesByProject);

// Route to get all pledges made by the logged-in user (accessible by authenticated users)
router.get("/user", authMiddleware, getPledgesByUser);

export default router;
