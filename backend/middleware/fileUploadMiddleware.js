// middleware/fileUploadMiddleware.js

const fileUploadMiddleware = (req, res, next) => {
  const file = req.file;

  // Check if a file is uploaded
  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Check the file type (example: only allow images)
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (!allowedTypes.includes(file.mimetype)) {
    return res.status(400).json({ message: 'Invalid file type. Only JPG, PNG, and PDF are allowed.' });
  }

  // Check file size (example: max 5MB)
  const maxSize = 5 * 1024 * 1024;  // 5MB
  if (file.size > maxSize) {
    return res.status(400).json({ message: 'File size exceeds the 5MB limit' });
  }

  // If everything is okay, move to the next middleware
  next();
};

module.exports = fileUploadMiddleware;
