// backend/routes/searchRoutes.js

import express from "express";
import { searchProjectsByTitle } from "../controllers/searchController.js";

const router = express.Router();

// Define route for searching projects by title
router.get("/projects", searchProjectsByTitle);

export default router;
