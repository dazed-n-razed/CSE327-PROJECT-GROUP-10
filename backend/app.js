const express = require('express');
const path = require('path');
const uploadRoutes = require('./routes/uploadRoutes');
const app = express();

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use the upload route
app.use('/api', uploadRoutes);

// Other routes and middleware...
