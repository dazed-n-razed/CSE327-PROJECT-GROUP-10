const express = require('express');
const router = express.Router();
const { upload, uploadFile } = require('../controllers/uploadController');

// POST endpoint for file upload
router.post('/upload', upload, uploadFile);

module.exports = router;
