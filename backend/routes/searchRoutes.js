// routes/searchRoutes.js
import express from 'express';
import { createProject, getAllProjects, getProjectById, searchProjects } from "../controllers/projectController.js";

const router = express.Router();

// Other routes for projects
router.post("/projects", createProject);
router.get("/projects", getAllProjects);
router.get("/projects/:id", getProjectById);

// Search route
router.get("/projects/search", searchProjects); // The search route

export default router;
