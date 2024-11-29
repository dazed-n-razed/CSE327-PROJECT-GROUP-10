// utils/fileUpload.js

import multer from "multer";
import path from "path";

// Define the storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the "uploads" directory
  },
  filename: (req, file, cb) => {
    // Generate unique filenames using timestamp and original filename
    cb(
      null,
      Date.now() + path.extname(file.originalname) // e.g., "1650932768956.jpg"
    );
  },
});

// Filter to allow only image file types (you can customize based on your needs)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
