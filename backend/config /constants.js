// backend/config/constants.js

import path from "path";

// Define the directory for file uploads
export const UPLOADS_DIR = path.resolve("uploads/");

// Allowed file types for uploads
export const ALLOWED_FILE_TYPES = ["jpeg", "jpg", "png", "gif", "pdf"];

// Maximum file size (in bytes)
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
