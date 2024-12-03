// frontend/pages/ProfilePage.js
import React, { useState, useEffect } from "react";
import { getProfile } from "../services/api"; // Assuming getProfile function is defined in api.js
import Header from "../components/Header"; // Assuming you have a Header component
import Footer from "../components/Footer"; // Assuming you have a Footer component

/**
 * The ProfilePage component displays the user's profile including their name, email, and role.
 * It also displays the user's profile picture.
 *
 * @component
 * @example
 * return (
 *   <ProfilePage />
 * )
 */
const ProfilePage = () => {
  /** @type {Object} - User data */
  const [user, setUser] = useState(null);

  /** @type {boolean} - Loading state for fetching user data */
  const [loading, setLoading] = useState(true);

  /** @type {string} - Error message if there's an issue fetching user data */
  const [error, setError] = useState("");

  /**
   * Fetch the user's profile data when the component mounts.
   *
   * @async
   * @function
   * @returns {Promise<void>} - Fetches user data from the API
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
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex justify-center items-center mt-10">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm text-center">
          <div className="mb-6">
            <img
              src={user?.profilePicture || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mx-auto border-2 border-gray-200"
            />
          </div>
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">Profile</h1>
          <div className="space-y-3 text-lg text-gray-600">
            <p>
              <span className="font-bold">Name:</span> {user?.name}
            </p>
            <p>
              <span className="font-bold">Email:</span> {user?.email}
            </p>
            <p>
              <span className="font-bold">Role:</span> {user?.role}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
