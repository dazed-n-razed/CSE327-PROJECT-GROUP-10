import axios from "axios";

// Set up the base URL for your backend
const BASE_URL = "http://localhost:3000/api"; // Make sure this matches your backend API route

/**
 * Function to log in a user.
 * Sends a POST request to the backend login endpoint.
 * @param {Object} userData - Contains email and password.
 * @returns {Object} Response from the backend.
 */
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, userData);
    return response.data; // Returns token or error message from backend
  } catch (error) {
    console.error("Error during login:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

/**
 * Function to register a new user.
 * Sends a POST request to the backend register endpoint.
 * @param {Object} userData - Contains name, email, and password.
 * @returns {Object} Response from the backend.
 */
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/register`, userData);
    return response.data; // Returns success message or user data
  } catch (error) {
    console.error(
      "Error during registration:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

/**
 * Function to fetch the user's profile data from the backend.
 * This function retrieves the token from local storage and sends it in the Authorization header
 * to authenticate the request. It then fetches the user's profile from the backend.
 *
 * @returns {Promise<Object>} The response data containing the user's profile.
 *
 * @throws {Error} - Throws an error if no token is found in localStorage or if the request fails.
 */
export const getProfile = async () => {
  const token = localStorage.getItem("token");

  // Check if a token exists in local storage
  if (!token) {
    throw new Error("No token found");
  }

  try {
    // Make a GET request to fetch the user profile from the backend
    const response = await axios.get(`${BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return the profile data from the response
  } catch (err) {
    // Handle errors if the request fails
    throw new Error("Failed to fetch user profile");
  }
};

export const createProject = async (projectData, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/projects`, projectData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data; // Returns success message and project data
  } catch (error) {
    console.error(
      "Error during project creation:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.error || "Failed to create project");
  }
};
