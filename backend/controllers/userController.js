// controllers/userController.js
import {
  hashPassword,
  comparePasswords,
  generateToken,
  validateEmail,
} from "../utils/helper.js"; // Import helper functions
import User from "../models/userModel.js"; // User model

// Controller to handle user registration
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email is valid
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password before saving
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to handle user login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = generateToken(user._id); // Generate token using helper function

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to delete a user
export const deleteUser = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming `req.user` contains the authenticated user
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

// Controller to get user profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming the user is authenticated and userId is in req.user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
      // Add other user fields you wish to return
    });
  } catch (error) {
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

// Controller to update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Get the user ID from the request (assuming user is authenticated)
    const { name, email } = req.body; // Extract fields to update from the request body

    // Find and update the user
    const user = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true } // Return the updated user object
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the updated user profile
    res.status(200).json({
      name: user.name,
      email: user.email,
      // Add other updated fields as necessary
    });
  } catch (error) {
    res.status(500).json({ error: "Server error, please try again later" });
  }
};
