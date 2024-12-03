import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { createProject } from "../services/api";

const ProjectPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goalAmount: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null); // To store the user ID
  const navigate = useNavigate();

  useEffect(() => {
    // Decode user ID from token
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.id || "Unknown User"); // Assumes `id` is part of the token payload
      } catch (err) {
        console.error("Failed to decode token:", err);
        setUserId("Unknown User");
      }
    } else {
      setUserId("Guest"); // Fallback if no token is present
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error
    setLoading(true); // Start loading

    try {
      const project = await createProject(formData); // Use the current formData state
      console.log("Project successfully created:", project);
      setLoading(false); // Stop loading
      navigate(`/projects/${project._id}`); // Navigate to the project details page
    } catch (err) {
      setLoading(false); // Stop loading
      setError(err.response?.data?.error || "Failed to create project"); // Show error
      console.error("Failed to create project:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-8">
      {/* Header Section */}
      <header className="w-full bg-blue-500 text-white py-4 px-6 shadow-md">
        <h1 className="text-xl font-bold">Welcome, {userId}</h1>
      </header>

      {/* Main Content */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full mt-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create New Project
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Project Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Goal Amount
            </label>
            <input
              type="number"
              name="goalAmount"
              value={formData.goalAmount}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Image URL (Optional)
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectPage;
