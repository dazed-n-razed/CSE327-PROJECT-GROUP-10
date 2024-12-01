// backend/controllers/fileController.js

import path from "path";
import fs from "fs";

/**
 * Handles file upload.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {void}
 */
export const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  res.status(201).json({
    message: "File uploaded successfully",
    filePath: req.file.path,
    fileName: req.file.filename,
  });
};

/**
 * Retrieves a file.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {void}
 */
export const getFile = (req, res) => {
  const { fileName } = req.params;
  const filePath = path.resolve("uploads", fileName);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: "File not found" });
    }

    res.sendFile(filePath);
  });
};

