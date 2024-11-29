const express = require('express');
const router = express.Router();
const { searchProducts } = require('../controllers/searchController');

// Search products
router.get('/search', searchProducts);

module.exports = router;
