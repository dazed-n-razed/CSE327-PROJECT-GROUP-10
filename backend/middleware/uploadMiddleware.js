// backend/middleware/uploadMiddleware.js

import multer from "multer";
import path from "path";
import { UPLOADS_DIR, ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from "../config/constants.js";

/**
 * Sets up the storage engine for file uploads.
 * Files are stored in the configured upload directory with unique names.
 */
const storage = multer.diskStorage({
  /**
   * Defines the destination for uploaded files.
   * @param {Object} req - The request object.
   * @param {Object} file - The file being uploaded.
   * @param {Function} cb - Callback to specify the upload destination.
   */
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR); // Use the configured upload directory
  },
  /**
   * Generates a unique filename for the uploaded file.
   * @param {Object} req - The request object.
   * @param {Object} file - The file being uploaded.
   * @param {Function} cb - Callback to specify the file name.
   */
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
  },
});

/**
 * Filters files based on allowed file types.
 * @param {Object} req - The request object.
 * @param {Object} file - The file being uploaded.
 * @param {Function} cb - Callback to accept or reject the file.
 */
const fileFilter = (req, file, cb) => {
  const extname = ALLOWED_FILE_TYPES.includes(
    path.extname(file.originalname).toLowerCase().replace(".", "")
  );
  const mimetype = ALLOWED_FILE_TYPES.includes(file.mimetype.split("/")[1]);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(
      new Error(`Only the following file types are allowed: ${ALLOWED_FILE_TYPES.join(", ")}`)
    );
  }
};

/**
 * Configures the Multer middleware for file uploads.
 * - Storage: Configures the destination and file naming.
 * - FileFilter: Validates file types.
 * - Limits: Enforces a maximum file size.
 */
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE }, // Use the configured file size limit
});

export default upload;
