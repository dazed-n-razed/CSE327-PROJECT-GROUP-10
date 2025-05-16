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

  const [activeTab, setActiveTab] = useState("created");

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

  useEffect(() => {
    // Logout functionality
    const handleLogout = () => {
      if (window.confirm("Are you sure you want to logout?")) {
        alert("You have been logged out successfully!");
        // Redirect to login page logic here
      }
    };

    // Attach event listeners
    document
      .getElementById("logout-btn")
      ?.addEventListener("click", handleLogout);

    return () => {
      // Cleanup event listeners
      document
        .getElementById("logout-btn")
        ?.removeEventListener("click", handleLogout);
    };
  }, []);

  // Loading state
  if (loading) return <p className="text-center text-lg">Loading...</p>;

  // Error state
  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Profile Header */}
      <div className="bg-teal-600 py-8 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="relative">
              <div className="h-32 w-32 rounded-full bg-white p-1 shadow-lg">
                <div className="h-full w-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </div>
            <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
              <h1 className="text-2xl font-bold text-white">Sarah Johnson</h1>
              <p className="text-teal-100">@sarahjcreates</p>
              <div className="flex flex-wrap justify-center md:justify-start mt-2 space-x-2">
                <span className="badge bg-teal-800 text-teal-100 text-xs px-2 py-1 rounded-full">
                  Superbacker
                </span>
                <span className="badge bg-teal-800 text-teal-100 text-xs px-2 py-1 rounded-full">
                  Creator
                </span>
                <span className="badge bg-teal-800 text-teal-100 text-xs px-2 py-1 rounded-full">
                  Top Funded
                </span>
              </div>
            </div>
            <div className="md:ml-auto mt-4 md:mt-0 flex items-center space-x-2">
              <button
                id="logout-btn"
                className="bg-white text-teal-600 hover:bg-teal-50 px-4 py-2 rounded-md font-medium shadow-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Profile Completion
              </h2>
              <div className="flex items-center justify-center mb-4">
                <div className="relative h-32 w-32">
                  <svg className="progress-ring" width="120" height="120">
                    <circle
                      className="text-gray-200"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="50"
                      cx="60"
                      cy="60"
                    />
                    <circle
                      className="text-teal-500"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="50"
                      cx="60"
                      cy="60"
                      strokeDasharray="314"
                      strokeDashoffset="78"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-800">
                      75%
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-600 text-center">
                <p class="text-gray-600 mb-4">
                  Product designer and creative entrepreneur passionate about
                  sustainable design and innovative solutions. I've been
                  creating and backing projects on Kickstarter since 2015.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Tabs Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  <button
                    className={`tab-btn w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                      activeTab === "created"
                        ? "border-teal-500 text-teal-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab("created")}
                  >
                    Created Projects
                  </button>
                  <button
                    className={`tab-btn w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                      activeTab === "backed"
                        ? "border-teal-500 text-teal-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab("backed")}
                  >
                    Backed Projects
                  </button>
                  <button
                    className={`tab-btn w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                      activeTab === "settings"
                        ? "border-teal-500 text-teal-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab("settings")}
                  >
                    Account Settings
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "created" && (
                  <div id="created" className="tab-content active p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-semibold text-gray-800">
                        Your Created Projects
                      </h2>
                      <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                        Create New Project
                      </button>
                    </div>

                    <div className="space-y-6">
                      {/* Project 1 */}
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-4">
                            <svg
                              className="h-24 w-24 text-teal-500"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                            </svg>
                          </div>
                          <div className="md:w-2/3 p-4">
                            <div className="flex justify-between items-start">
                              <h3 className="text-lg font-semibold text-gray-800">
                                EcoDesign Notebook
                              </h3>
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                                Funded
                              </span>
                            </div>
                            <div className="mt-2">
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                  className="bg-green-500 h-2.5 rounded-full"
                                  style={{ width: "125%" }}
                                ></div>
                              </div>
                              <div className="flex justify-between mt-1 text-sm">
                                <span className="text-gray-600">
                                  $25,430 raised
                                </span>
                                <span className="text-gray-600">
                                  $20,000 goal
                                </span>
                              </div>
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                              <a
                                href="#"
                                className="text-teal-600 hover:text-teal-700 font-medium text-sm"
                              >
                                View Project
                              </a>
                              <span className="text-sm text-gray-500">
                                Ended on May 15, 2023
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Project 2 */}
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-4">
                            <svg
                              className="h-24 w-24 text-teal-500"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z" />
                            </svg>
                          </div>
                          <div className="md:w-2/3 p-4">
                            <div className="flex justify-between items-start">
                              <h3 className="text-lg font-semibold text-gray-800">
                                Sustainable Coffee Maker
                              </h3>
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                                Live
                              </span>
                            </div>
                            <div className="mt-2">
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                  className="bg-blue-500 h-2.5 rounded-full"
                                  style={{ width: "65%" }}
                                ></div>
                              </div>
                              <div className="flex justify-between mt-1 text-sm">
                                <span className="text-gray-600">
                                  $19,500 raised
                                </span>
                                <span className="text-gray-600">
                                  $30,000 goal
                                </span>
                              </div>
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                              <a
                                href="#"
                                className="text-teal-600 hover:text-teal-700 font-medium text-sm"
                              >
                                View Project
                              </a>
                              <span className="text-sm text-gray-500">
                                15 days remaining
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Project 3 */}
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-4">
                            <svg
                              className="h-24 w-24 text-gray-400"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                              <path d="M14 17H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                            </svg>
                          </div>
                          <div className="md:w-2/3 p-4">
                            <div className="flex justify-between items-start">
                              <h3 className="text-lg font-semibold text-gray-800">
                                Eco-Friendly Travel Bag
                              </h3>
                              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
                                Draft
                              </span>
                            </div>
                            <p className="mt-2 text-sm text-gray-600">
                              Complete your project details and launch when
                              you're ready.
                            </p>
                            <div className="mt-4 flex justify-between items-center">
                              <a
                                href="#"
                                className="text-teal-600 hover:text-teal-700 font-medium text-sm"
                              >
                                Edit Project
                              </a>
                              <button className="bg-teal-100 text-teal-700 hover:bg-teal-200 px-3 py-1 rounded text-sm">
                                Launch
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "backed" && (
                  <div id="backed" className="tab-content p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-6">
                      Projects You've Backed
                    </h2>

                    <div className="space-y-6">
                      {/* Backed Project 1 */}
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-4">
                            <svg
                              className="h-24 w-24 text-purple-500"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
                            </svg>
                          </div>
                          <div className="md:w-2/3 p-4">
                            <div className="flex justify-between items-start">
                              <h3 className="text-lg font-semibold text-gray-800">
                                Educational Board Game
                              </h3>
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                                Funded
                              </span>
                            </div>
                            <div className="mt-2 flex flex-col sm:flex-row sm:justify-between">
                              <div className="mb-2 sm:mb-0">
                                <span className="text-sm font-medium text-gray-500">
                                  You pledged:
                                </span>
                                <span className="ml-1 text-sm font-semibold text-gray-800">
                                  $75
                                </span>
                              </div>
                              <div>
                                <span className="text-sm font-medium text-gray-500">
                                  Reward status:
                                </span>
                                <span className="ml-1 text-sm font-semibold text-green-600">
                                  Delivered
                                </span>
                              </div>
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                              <a
                                href="#"
                                className="text-teal-600 hover:text-teal-700 font-medium text-sm"
                              >
                                View Project
                              </a>
                              <span className="text-sm text-gray-500">
                                Delivered on Jan 10, 2023
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Backed Project 2 */}
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-4">
                            <svg
                              className="h-24 w-24 text-amber-500"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.5 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1 0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66z" />
                            </svg>
                          </div>
                          <div className="md:w-2/3 p-4">
                            <div className="flex justify-between items-start">
                              <h3 className="text-lg font-semibold text-gray-800">
                                Smart Home Gadget
                              </h3>
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                                In Production
                              </span>
                            </div>
                            <div className="mt-2 flex flex-col sm:flex-row sm:justify-between">
                              <div className="mb-2 sm:mb-0">
                                <span className="text-sm font-medium text-gray-500">
                                  You pledged:
                                </span>
                                <span className="ml-1 text-sm font-semibold text-gray-800">
                                  $120
                                </span>
                              </div>
                              <div>
                                <span className="text-sm font-medium text-gray-500">
                                  Reward status:
                                </span>
                                <span className="ml-1 text-sm font-semibold text-amber-600">
                                  Not Shipped
                                </span>
                              </div>
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                              <a
                                href="#"
                                className="text-teal-600 hover:text-teal-700 font-medium text-sm"
                              >
                                View Project
                              </a>
                              <span className="text-sm text-gray-500">
                                Est. delivery: June 2023
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Backed Project 3 */}
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-4">
                            <svg
                              className="h-24 w-24 text-indigo-500"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M20 4v12H8V4h12m0-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 9.67l1.69 2.26 2.48-3.1L19 15H9zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z" />
                            </svg>
                          </div>
                          <div className="md:w-2/3 p-4">
                            <div className="flex justify-between items-start">
                              <h3 className="text-lg font-semibold text-gray-800">
                                Photography Art Book
                              </h3>
                              <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full font-medium">
                                Shipped
                              </span>
                            </div>
                            <div className="mt-2 flex flex-col sm:flex-row sm:justify-between">
                              <div className="mb-2 sm:mb-0">
                                <span className="text-sm font-medium text-gray-500">
                                  You pledged:
                                </span>
                                <span className="ml-1 text-sm font-semibold text-gray-800">
                                  $45
                                </span>
                              </div>
                              <div>
                                <span className="text-sm font-medium text-gray-500">
                                  Reward status:
                                </span>
                                <span className="ml-1 text-sm font-semibold text-indigo-600">
                                  Shipped
                                </span>
                              </div>
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                              <a
                                href="#"
                                className="text-teal-600 hover:text-teal-700 font-medium text-sm"
                              >
                                View Project
                              </a>
                              <span className="text-sm text-gray-500">
                                Shipped on Apr 22, 2023
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "settings" && (
                  <div id="settings" className="tab-content p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-6">
                      Account Settings
                    </h2>

                    <div className="space-y-6">
                      {/* Profile Information */}
                      <div className="bg-white">
                        <h3 className="text-md font-medium text-gray-700 mb-4">
                          Profile Information
                        </h3>
                        <form className="space-y-4">
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label
                                htmlFor="fullName"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Full Name
                              </label>
                              <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value="Sarah Johnson"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-2 border"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Username
                              </label>
                              <input
                                type="text"
                                id="username"
                                name="username"
                                value="sarahjcreates"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-2 border"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value="sarah.johnson@example.com"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-2 border"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="location"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Location
                              </label>
                              <input
                                type="text"
                                id="location"
                                name="location"
                                value="Portland, OR"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-2 border"
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="bio"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Bio
                            </label>
                            <textarea
                              id="bio"
                              name="bio"
                              rows="3"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-2 border"
                            >
                              Product designer and creative entrepreneur
                              passionate about sustainable design and innovative
                              solutions. I've been creating and backing projects
                              on Kickstarter since 2015.
                            </textarea>
                          </div>
                          <div className="flex justify-end">
                            <button
                              type="button"
                              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                            >
                              Save Profile
                            </button>
                          </div>
                        </form>
                      </div>

                      {/* Change Password */}
                      <div className="pt-6 border-t border-gray-200">
                        <h3 className="text-md font-medium text-gray-700 mb-4">
                          Change Password
                        </h3>
                        <form className="space-y-4">
                          <div>
                            <label
                              htmlFor="currentPassword"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Current Password
                            </label>
                            <input
                              type="password"
                              id="currentPassword"
                              name="currentPassword"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-2 border"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="newPassword"
                              className="block text-sm font-medium text-gray-700"
                            >
                              New Password
                            </label>
                            <input
                              type="password"
                              id="newPassword"
                              name="newPassword"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-2 border"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="confirmPassword"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Confirm New Password
                            </label>
                            <input
                              type="password"
                              id="confirmPassword"
                              name="confirmPassword"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-2 border"
                            />
                          </div>
                          <div className="flex justify-end">
                            <button
                              type="button"
                              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                            >
                              Update Password
                            </button>
                          </div>
                        </form>
                      </div>

                      {/* Notification Preferences */}
                      <div className="pt-6 border-t border-gray-200">
                        <h3 className="text-md font-medium text-gray-700 mb-4">
                          Notification Preferences
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="project_updates"
                                name="project_updates"
                                type="checkbox"
                                defaultChecked
                                className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor="project_updates"
                                className="font-medium text-gray-700"
                              >
                                Project Updates
                              </label>
                              <p className="text-gray-500">
                                Receive updates about projects you've backed
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="new_projects"
                                name="new_projects"
                                type="checkbox"
                                defaultChecked
                                className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor="new_projects"
                                className="font-medium text-gray-700"
                              >
                                New Projects
                              </label>
                              <p className="text-gray-500">
                                Get notified about new projects that match your
                                interests
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="comments"
                                name="comments"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor="comments"
                                className="font-medium text-gray-700"
                              >
                                Comments
                              </label>
                              <p className="text-gray-500">
                                Receive notifications when someone comments on
                                your projects
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="marketing"
                                name="marketing"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor="marketing"
                                className="font-medium text-gray-700"
                              >
                                Marketing
                              </label>
                              <p className="text-gray-500">
                                Receive marketing communications from
                                Kickstarter
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <button
                            type="button"
                            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                          >
                            Save Preferences
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
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
          <div class="bg-teal-600 py-8">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex flex-col md:flex-row items-center md:items-start">
                <div class="relative">
                  <div class="h-32 w-32 rounded-full bg-white p-1 shadow-lg">
                    <div class="h-full w-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-16 w-16 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <button class="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md hover:bg-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                </div>
                <div class="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                  <h1 class="text-2xl font-bold text-white">Sarah Johnson</h1>
                  <p class="text-teal-100">@sarahjcreates</p>
                  <div class="flex flex-wrap justify-center md:justify-start mt-2 space-x-2">
                    <span class="badge bg-teal-800 text-teal-100 text-xs px-2 py-1 rounded-full">
                      Superbacker
                    </span>
                    <span class="badge bg-teal-800 text-teal-100 text-xs px-2 py-1 rounded-full">
                      Creator
                    </span>
                    <span class="badge bg-teal-800 text-teal-100 text-xs px-2 py-1 rounded-full">
                      Top Funded
                    </span>
                  </div>
                </div>
                <div class="md:ml-auto mt-4 md:mt-0 flex items-center space-x-2">
                  <button
                    id="logout-btn"
                    class="bg-white text-teal-600 hover:bg-teal-50 px-4 py-2 rounded-md font-medium shadow-sm"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Project Info */}
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center border-4 border-gray-300 flex flex-col justify-between">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
              Project Information
            </h1>
            <div className="space-y-3 text-lg text-gray-600">
              <p>
                <span className="font-semibold text-gray-800">
                  Project Name:
                </span>{" "}
                {projectData.name}
              </p>
              <p>
                <span className="font-semibold text-gray-800">
                  Description:
                </span>{" "}
                {projectData.description}
              </p>
              <p>
                <span className="font-semibold text-gray-800">
                  Goal Amount:
                </span>{" "}
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
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProfilePage;
