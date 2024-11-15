// backend/models/userModel.js

import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" }, // Add role field
});

// Create the user model from the schema
const User = mongoose.model("User", userSchema);

export default User; // Ensure the default export is used
