const { Product } = require('../models'); // Adjust this according to your database model (e.g., Sequelize)

// Search products by query parameters
exports.searchProducts = async (req, res) => {
  try {
    const { keyword, category, priceRange, page = 1, limit = 10 } = req.query;

    const filters = {};

    if (keyword) filters.name = { $like: `%${keyword}%` }; // Keyword search
    if (category) filters.category = category; // Filter by category
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split(',').map(Number);
      filters.price = { $between: [minPrice, maxPrice] }; // Filter by price range
    }

    // Fetch products with filters and pagination
    const products = await Product.findAll({
      where: filters,
      offset: (page - 1) * limit, // Pagination offset
      limit: limit,               // Pagination limit
    });

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
