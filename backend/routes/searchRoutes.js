// backend/routes/searchRoutes.js

import express from "express";
import { searchProjectsByTitle } from "../controllers/searchController.js";

const router = express.Router();

/**
 * Route to search projects by title.
 * @route GET /projects
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - Sends a response back to the client.
 */
router.get("/projects", searchProjectsByTitle);

export default router;
