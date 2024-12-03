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

/**
 * Creates a new project.
 *
 * Sends a POST request to the backend API to create a new project.
 * Requires a valid authentication token stored in `localStorage`.
 *
 * @async
 * @function createProject
 * @param {Object} data - The data for the new project.
 * @param {string} data.name - The name of the project.
 * @param {string} data.description - The description of the project.
 * @param {number} data.goalAmount - The goal amount for the project.
 * @param {string} data.deadline - The deadline for the project in ISO 8601 format.
 * @returns {Promise<Object>} The created project data returned by the API.
 * @throws {Object} If the request fails, throws an error object with details.
 */
export const createProject = async (data) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token available");

    const response = await axios.post(
      "http://localhost:3000/api/projects",
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error.response?.data || { error: "Unknown API error occurred" };
  }
};
