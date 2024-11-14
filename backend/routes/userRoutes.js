// backend/routes/userRoutes.js

import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

// Routes for user actions
router.post("/register", registerUser); // Register a new user
router.post("/login", loginUser); // Login user

export default router; // ***Exporting the router as the default export
