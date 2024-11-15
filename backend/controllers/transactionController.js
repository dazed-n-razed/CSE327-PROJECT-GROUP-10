// controllers/transactionController.js

import Transaction from "../models/transactionModel.js";
import Project from "../models/projectModel.js";
import {
  validateTransactionAmount,
  checkProjectExists,
} from "../utils/helper.js"; // Import helper functions

export const createTransaction = async (req, res) => {
  const { amount, projectId } = req.body;

  try {
    // Validate transaction amount
    if (!validateTransactionAmount(amount)) {
      return res.status(400).json({ error: "Amount must be greater than 0" });
    }

    // Check if the project exists using helper function
    const project = await checkProjectExists(projectId, Project);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Create a new transaction
    const transaction = new Transaction({
      amount,
      user: req.user.id, // Assuming authMiddleware adds the `user` object to `req`
      project: projectId,
    });

    await transaction.save();

    res.status(201).json(transaction);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create transaction", details: error.message });
  }
};

export const getTransactionsByUser = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).populate(
      "project",
      "title"
    ); // Populate project title

    res.status(200).json(transactions);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch transactions", details: error.message });
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("user", "name") // Populate user name
      .populate("project", "title"); // Populate project title

    res.status(200).json(transactions);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch transactions", details: error.message });
  }
};

// Define the auditTransactions function
export const auditTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find(); // Or other logic to fetch transactions
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions" });
  }
};

// Function to refund a transaction
export const refundTransaction = (req, res) => {
  const transactionId = req.params.id;

  // Logic to process the refund (dummy logic for now)
  if (!transactionId) {
    return res.status(400).json({ error: "Transaction ID is required." });
  }

  // Simulate a successful refund
  res.status(200).json({
    message: `Transaction with ID ${transactionId} has been refunded successfully.`,
  });
};
