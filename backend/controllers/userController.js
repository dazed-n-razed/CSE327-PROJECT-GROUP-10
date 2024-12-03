import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

/**
 * Helper function to hash a user's password.
 * This function generates a salt and hashes the password using bcrypt.
 *
 * @param {string} password - The plaintext password that needs to be hashed.
 * @returns {Promise<string>} The hashed password.
 *
 * @throws {Error} - If there is an error during the hashing process.
 */
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/**
 * Helper function to compare a plaintext password with a hashed password.
 * This function checks if the entered password matches the stored hashed password.
 *
 * @param {string} password - The plaintext password entered by the user.
 * @param {string} hashedPassword - The hashed password stored in the database.
 * @returns {Promise<boolean>} A boolean indicating if the passwords match.
 *
 * @throws {Error} - If there is an error during the comparison process.
 */
const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

/**
 * Helper function to generate a JWT (JSON Web Token) for the user.
 * This function signs a token with the user's ID and the JWT secret key,
 * and sets an expiration time for the token.
 *
 * @param {string} userId - The ID of the user to be included in the token payload.
 * @returns {string} The generated JWT.
 *
 * @throws {Error} - If there is an error during the token generation process.
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

/**
 * Controller function to register a new user.
 * This function checks if a user already exists with the provided email, hashes the password,
 * and then creates a new user in the database if the email is unique.
 *
 * @param {Object} req - The request object containing user data in the body.
 * @param {string} req.body.name - The name of the user.
 * @param {string} req.body.email - The email address of the user.
 * @param {string} req.body.password - The password chosen by the user.
 * @param {Object} res - The response object to send the result back to the client.
 * @returns {void} Sends a response with either a success message or an error message.
 *
 * @throws {Object} - If an error occurs while handling the request, a 500 status code is sent with an error message.
 */
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if a user already exists with the provided email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await hashPassword(password);

    // Create and save the new user in the database
    const user = await User.create({ name, email, password: hashedPassword });

    // Respond with a success message indicating successful registration
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    // Handle errors (e.g., server or database errors)
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

/**
 * Controller function to log in a user.
 * This function checks the user's credentials, compares the provided password
 * with the stored password hash, and generates a JWT if the login is successful.
 *
 * @param {Object} req - The request object containing the user's credentials in the body.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.password - The password entered by the user.
 * @param {Object} res - The response object to send the result back to the client.
 * @returns {void} Sends a response with either a success message, a token, and user details, or an error message.
 *
 * @throws {Object} - If an error occurs while handling the request, a 500 status code is sent with an error message.
 */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the entered password with the hashed password in the database
    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token if the password matches
    const token = generateToken(user._id);

    // Respond with the token and user details (excluding password)
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

/**
 * Controller to get the user's profile.
 * This function retrieves the user's data from the database based on the user's ID
 * from the decoded JWT token. It excludes the password field for security reasons.
 *
 * @param {Object} req - The request object containing the user's ID from the JWT token.
 * @param {Object} res - The response object used to send the user data or an error message.
 *
 * @returns {void} Sends a JSON response with the user's profile data or an error message.
 *
 * @throws {Error} - Throws an error if there is an issue while fetching the profile.
 */
export const getProfile = async (req, res) => {
  try {
    // Retrieve user from the database using the decoded user ID
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user); // Return the user data excluding the password field
  } catch (err) {
    res.status(500).json({ message: "Server error" }); // Handle any server errors
  }
};
