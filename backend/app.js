// routes/fileAndSearchRoutes.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Setup Multer for file upload
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');  // Specify the folder where files will be stored
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));  // Naming files with timestamps to avoid overwriting
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});

// File upload route
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.status(200).json({
    message: 'File uploaded successfully!',
    file: req.file,
  });
});

// Search route (assuming you're searching through files in the 'uploads' directory)
router.get('/search', (req, res) => {
  const searchTerm = req.query.query;

  if (!searchTerm) {
    return res.status(400).json({ error: 'Please provide a search query' });
  }

  // Read the files in the uploads folder
  fs.readdir('./uploads', (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading files' });
    }

    // Filter files based on the search query (file name contains search term)
    const filteredFiles = files.filter((file) => file.includes(searchTerm));

    if (filteredFiles.length === 0) {
      return res.status(404).json({ message: 'No files found matching the query' });
    }

    res.status(200).json({
      message: 'Search results',
      files: filteredFiles,
    });
  });
});

module.exports = router;
