// backend/index.js

// Load environment variables
import dotenv from "dotenv";
dotenv.config();

// Import necessary modules
import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";

// Import Routes
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(json()); // Parse incoming JSON data

// Connect to MongoDB
connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Routes
app.use("/api/users", userRoutes); // User-related routes
app.use("/api/projects", projectRoutes); // Project-related routes

// Define the port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
