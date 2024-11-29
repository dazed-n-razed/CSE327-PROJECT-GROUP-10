// middlewares/errorMiddleware.js
// this is for search middle ware
import { searchAll } from "../utils/searchHelper.js";

// Middleware to handle search request and return results
export const searchMiddleware = async (req, res, next) => {
  const searchTerm = req.query.q; // Assumes the query parameter is 'q'

  if (!searchTerm || searchTerm.trim().length === 0) {
    return res.status(400).json({ message: "Search term cannot be empty" });
  }

  try {
    // Use the search helper to fetch search results from various models
    const results = await searchAll(searchTerm);

    // Attach the search results to the request object, so that it can be used downstream
    req.searchResults = results;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    // If there's an error, pass it to the error handler
    next(error);
  }
};
