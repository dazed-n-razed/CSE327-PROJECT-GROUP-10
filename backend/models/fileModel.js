// models/fileModel.js

const mongoose = require('mongoose');

// Define the schema for file metadata
const fileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,  // Filename is required
  },
  path: {
    type: String,
    required: true,  // Path where the file is stored
  },
  size: {
    type: Number,
    required: true,  // File size in bytes
  },
  mimetype: {
    type: String,
    required: true,  // MIME type (e.g., image/jpeg, application/pdf)
  },
  uploadDate: {
    type: Date,
    default: Date.now,  // Date when the file was uploaded
  },
});

// Create a model from the schema
const File = mongoose.model('File', fileSchema);

module.exports = File;
