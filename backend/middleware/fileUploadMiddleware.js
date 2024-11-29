// middlewares/fileUploadMiddleware.js

import multer from "multer";
import path from "path";

// Define storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder where files will be saved
  },
  filename: (req, file, cb) => {
    // Use current timestamp + file extension as the filename
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Filter to allow only specific file types (e.g., images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

// Initialize multer with the storage and fileFilter configurations
const upload = multer({ storage, fileFilter });

// Middleware to handle file upload
export const uploadSingleImage = upload.single("image"); // "image" is the name field in the form
