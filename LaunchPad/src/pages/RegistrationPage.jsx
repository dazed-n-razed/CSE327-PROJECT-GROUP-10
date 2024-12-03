import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api"; // Import the register API function

/**
 * RegistrationPage component
 * @description This component handles user registration by collecting user input and interacting with the backend.
 * @returns {JSX.Element} The rendered registration form component.
 */
const RegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /**
   * Handles changes in form fields and updates state.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event triggered by input change.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /**
   * Handles form submission by validating input and calling the backend API.
   * @param {React.FormEvent<HTMLFormElement>} e - The event triggered by form submission.
   * @returns {void}
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      // Call the register API
      const response = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setSuccess("Registration successful! You can now log in.");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(err.message || "Registration failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full min-h-screen items-center justify-center">
      <style jsx global>{`
        body {
          background-image: url("https://firebasestorage.googleapis.com/v0/b/ratuls-projects.appspot.com/o/299%20final%20presentation.pptx.png?alt=media&token=eb16b380-f923-4ad1-a55f-ad2701c649ac");
          background-size: cover;
          background-position: center;
        }
      `}</style>

      <div className="flex justify-center w-full max-w-screen-lg h-full">
        <div className="flex flex-col md:flex-row w-full h-auto justify-center items-center bg-white rounded-lg lg:rounded-l-box shadow-lg">
          <div className="md:w-1/2 h-full bg-blue-400 md:rounded-l-lg md:rounded-none hidden lg:block">
            <div className="flex flex-col justify-between h-full p-10 text-white rounded-lg">
              <div>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/ratuls-projects.appspot.com/o/pngegg.png?alt=media&token=668bb27a-44be-4da3-9919-40d767f10821"
                  alt=""
                  className="w-full mb-5"
                />
                <p
                  className="text-3xl cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  LaunchPad a Crowdfunding Project
                </p>
                <ul className="mt-5">
                  <li>&#10003; Crowdfund Your Project</li>
                  <li>&#10003; Find the Best Investment</li>
                  <li>&#10003; Expand Your Network</li>
                  <li>&#10003; Help Businesses Grow</li>
                </ul>
              </div>
              <p className="text-xs text-center">
                &copy; 2024 LaunchPad. All rights reserved.
              </p>
            </div>
          </div>

          <div className="md:w-1/2 h-full p-10">
            <p className="text-2xl text-gray-700">Create an Account</p>
            <div className={error ? "mt-1" : "mt-8"}>
              {error && <p className="text-red-600 font-bold">*{error}*</p>}
              {success && (
                <p className="text-green-600 font-bold">*{success}*</p>
              )}

              <div>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full border-2 border-gray-300 rounded-xl p-4 mt-1 bg-transparent"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Your Name"
                  required
                />
              </div>

              <div className="mt-4">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full border-2 border-gray-300 rounded-xl p-4 mt-1 bg-transparent"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email"
                  required
                />
              </div>

              <div className="mt-4">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="w-full border-2 border-gray-300 rounded-xl p-4 mt-1 bg-transparent"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Your Password"
                  required
                />
              </div>

              <div className="mt-4">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="w-full border-2 border-gray-300 rounded-xl p-4 mt-1 bg-transparent"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Your Password"
                  required
                />
              </div>

              <div className="mt-8 flex flex-col gap-y-4">
                {!loading ? (
                  <button
                    type="submit"
                    className="py-3 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-600 transition-all"
                    onClick={handleSubmit}
                  >
                    Register
                  </button>
                ) : (
                  <button className="my-2.5 rounded-xl bg-transparent text-white font-bold">
                    <span className="loading loading-spinner text-neutral"></span>
                  </button>
                )}

                <div className="flex items-center">
                  <div className="w-full h-px bg-gray-300"></div>
                  <div className="text-sm text-gray-500 mx-2">Or</div>
                  <div className="w-full h-px bg-gray-300"></div>
                </div>

                <button
                  className="flex items-center justify-center gap-2 border-2 border-gray-100 py-3 rounded-xl hover:scale-105 transition-all"
                  onClick={() =>
                    (window.location.href = `${process.env.REACT_APP_API_URL}/auth/google/callback`)
                  }
                >
                  Register with Google
                </button>

                <div className="mt-5 flex justify-center items-center">
                  <p className="font-medium text-base">
                    Already have an account?
                  </p>
                  <button
                    className="text-blue-500 text-base font-medium ml-2"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
