// backend/routes/projectRoutes.js

import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
} from "../controllers/projectController.js";

const router = express.Router();

// Routes for projects
router.post("/", createProject); // Create a new project
router.get("/", getAllProjects); // Get all projects
router.get("/:id", getProjectById); // Get a specific project by ID

export default router; // Make sure this is a default export
