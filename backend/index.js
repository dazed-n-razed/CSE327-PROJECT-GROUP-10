// backend/index.js

import dotenv from "dotenv";
import express, { json } from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import searchRoutes from "./routes/searchRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/search", searchRoutes); // Search routes
app.use("/api/files", fileRoutes); // File upload routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
