// backend/middleware/uploadMiddleware.js

import multer from "multer";
import path from "path";
import { UPLOADS_DIR, ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from "../config/constants.js";

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR); // Use the configured upload directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
  },
});

// File filter (restrict file types)
const fileFilter = (req, file, cb) => {
  const extname = ALLOWED_FILE_TYPES.includes(
    path.extname(file.originalname).toLowerCase().replace(".", "")
  );
  const mimetype = ALLOWED_FILE_TYPES.includes(file.mimetype.split("/")[1]);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error(`Only the following file types are allowed: ${ALLOWED_FILE_TYPES.join(", ")}`));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE }, // Use the configured file size limit
});

export default upload;

