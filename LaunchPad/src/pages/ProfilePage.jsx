// frontend/pages/ProfilePage.js
import React, { useState, useEffect } from "react";
import { getProfile } from "../services/api"; // Assuming getProfile function is defined in api.js
import Header from "../components/Header"; // Assuming you have a Header component
import Footer from "../components/Footer"; // Assuming you have a Footer component

/**
 * The ProfilePage component displays the user's profile, including their name, email, role, and profile picture.
 * It also displays information about a project, such as its name, description, goal amount, raised amount, and deadline.
 * The data is fetched from the API upon component mount.
 *
 * @component
 * @example
 * return (
 *   <ProfilePage />
 * )
 */
const ProfilePage = () => {
  /**
   * @type {Object|null} user - The user data fetched from the API.
   * Initially null until the user data is fetched.
   */
  const [user, setUser] = useState(null);

  /**
   * @type {boolean} loading - The loading state for the profile data fetching.
   * Initially true to indicate data is being loaded.
   */
  const [loading, setLoading] = useState(true);

  /**
   * @type {string} error - Error message if there is an issue fetching the profile.
   * Initially an empty string.
   */
  const [error, setError] = useState("");

  // Dummy project data
  const projectData = {
    name: "Project X",
    description: "A groundbreaking crowdfunding project to change the world.",
    goalAmount: 50000,
    raisedAmount: 25000,
    deadline: "2024-12-31",
  };

  /**
   * useEffect hook that fetches the user's profile data from the API when the component mounts.
   * Sets the user data and handles loading and error states.
   *
   * @async
   * @function
   * @returns {Promise<void>} - Fetches user data and updates the state accordingly.
   */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await getProfile(); // Call API to fetch profile data
        setUser(userData);
      } catch (err) {
        setError("Failed to fetch user profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Loading state
  if (loading) return <p className="text-center text-lg">Loading...</p>;

  // Error state
  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex justify-center items-center mt-10 flex-grow gap-10 px-4">
        {/* Left Column - Profile Info */}
        <div className="bg-blue-500 shadow-lg rounded-lg p-8 w-full max-w-md text-center border-4  flex flex-col justify-between">
          {/* Profile Picture */}
          <div className="mb-6">
            <img
              src={user?.profilePicture || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover mx-auto border-4 border-white"
            />
          </div>

          {/* Profile Information */}
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome, {user?.name}
          </h1>
          <div className="space-y-3 text-lg text-white">
            <p>
              <span className="font-semibold text-gray-200">Name:</span>{" "}
              {user?.name}
            </p>
            <p>
              <span className="font-semibold text-gray-200">Email:</span>{" "}
              {user?.email}
            </p>
            <p>
              <span className="font-semibold text-gray-200">Role:</span>{" "}
              {user?.role}
            </p>
          </div>
        </div>

        {/* Right Column - Project Info */}
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center border-4 border-gray-300 flex flex-col justify-between">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            Project Information
          </h1>
          <div className="space-y-3 text-lg text-gray-600">
            <p>
              <span className="font-semibold text-gray-800">Project Name:</span>{" "}
              {projectData.name}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Description:</span>{" "}
              {projectData.description}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Goal Amount:</span>{" "}
              ${projectData.goalAmount.toLocaleString()}
            </p>
            <p>
              <span className="font-semibold text-gray-800">
                Amount Raised:
              </span>{" "}
              ${projectData.raisedAmount.toLocaleString()}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Deadline:</span>{" "}
              {projectData.deadline}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProfilePage;
