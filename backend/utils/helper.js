// utils/helper.js

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Project from "../models/projectModel.js"; // Import Project model
import Comment from "../models/commentModel.js"; // Assuming the comment model is named `commentModel.js`

// Function to validate comment data (e.g., content, projectId)
export const validateCommentData = ({ content, projectId, userId }) => {
  if (!content || content.trim() === "") {
    return false; // Validation failed if content is empty or just spaces
  }
  if (!projectId || !userId) {
    return false; // Validation failed if projectId or userId are missing
  }
  return true; // Validation passed
};

// Function to find a comment by ID
export const findCommentById = async (commentId) => {
  return await Comment.findById(commentId).populate("user", "name");
};

// Function to extract token from the Authorization header
export const extractToken = (req) => {
  const token = req.headers.authorization?.split(" ")[1];
  return token;
};

// Function to verify the JWT token
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

// Function to validate email format
export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};

// Function to hash password
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Function to compare passwords
export const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Function to generate JWT token
export const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Transaction-related helper functions

// Function to validate transaction amount
export const validateTransactionAmount = (amount) => {
  return amount > 0;
};

// Function to check if a project exists
export const checkProjectExists = async (projectId, ProjectModel) => {
  return await ProjectModel.findById(projectId);
};

// Function to validate project data (e.g., title, description, etc.)
export const validateProjectData = ({
  title,
  description,
  goalAmount,
  creator,
  image,
}) => {
  if (!title || !description || !goalAmount || !creator) {
    return false; // Validation failed, return false if any required field is missing
  }
  if (goalAmount <= 0) {
    return false; // Goal amount must be greater than zero
  }
  return true; // Validation passed
};

// Function to find a project by ID with error handling
export const findProjectById = async (projectId) => {
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      throw new Error("Project not found");
    }
    return project;
  } catch (error) {
    throw new Error(error.message || "Error fetching project");
  }
};
