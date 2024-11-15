// routes/transactionRoutes.js

import express from "express";
import authMiddleware, {
  adminMiddleware,
} from "../middleware/authMiddleware.js";
import {
  createTransaction,
  getTransactionsByUser,
  getAllTransactions,
} from "../controllers/transactionController.js";

const router = express.Router();

// Route to create a transaction (requires authentication)
router.post("/", authMiddleware, createTransaction);

// Route to fetch all transactions for a user (requires authentication)
router.get("/my-transactions", authMiddleware, getTransactionsByUser);

// Route to fetch all transactions (admin-only route)
router.get("/", authMiddleware, adminMiddleware, getAllTransactions);

export default router;
