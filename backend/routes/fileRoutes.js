// backend/routes/fileRoutes.js

import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadFile, getFile } from "../controllers/fileController.js";

const router = express.Router();

/**
 * Route to upload a file.
 */
router.post("/upload", upload.single("file"), uploadFile);

/**
 * Route to retrieve a file.
 */
router.get("/:fileName", getFile);

export default router;
