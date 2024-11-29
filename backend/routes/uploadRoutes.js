// backend/routes/uploadRoutes.js
import express from 'express';
import { createProject, searchProjects } from "../controllers/projectController.js";
import upload from "../utils/multer.js";  // multer middleware for file upload

const router = express.Router();

// Route to create a new project with file upload
router.post('/projects', upload.single('image'), createProject);

// Route to search projects by title or description
router.get('/projects/search', searchProjects);

export default router;
