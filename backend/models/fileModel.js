// backend/models/fileModel.js

import mongoose from "mongoose";

/**
 * File Schema definition.
 */
const fileSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true }, // Name of the file
    filePath: { type: String, required: true }, // Path where the file is stored
    fileType: { type: String, required: true }, // MIME type (e.g., image/png, application/pdf)
    fileSize: { type: Number, required: true }, // File size in bytes
    uploadedAt: { type: Date, default: Date.now }, // Timestamp of when the file was uploaded
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Create and export the File model
const File = mongoose.model("File", fileSchema);
export default File;

