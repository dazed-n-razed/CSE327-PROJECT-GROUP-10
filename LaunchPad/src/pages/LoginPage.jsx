import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api"; // Assuming loginUser API is in your services

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    const userData = { email, password };

    try {
      console.log("Attempting login with userData:", userData);
      const response = await loginUser(userData); // Call the login API
      console.log("Login response:", response);
      if (response && response.token) {
        console.log("Login successful, token received:", response.token);
        // Store token
        localStorage.setItem("token", response.token);

        // Store user data
        const user = response.user || {
          email: email,
          name: response.name || email.split("@")[0],
        };
        localStorage.setItem("user", JSON.stringify(user));

        // Navigate to profile page
        navigate("/profile");
      } else {
        console.error("Invalid credentials response:", response);
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login failed with error:", err);
      setError(err.message || "Login failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex w-full min-h-screen items-center justify-center bg-gray-100">
      <style jsx global>{`
        body {
          background-image:
          background-size: cover;
          background-position: center;
        }
      `}</style>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <svg
              className="h-8 w-8 text-emerald-500"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="ml-2 text-xl font-bold text-gray-900 tracking-tight">
              LaunchPad
            </span>
          </Link>
        </div>
      </nav>

      <div className="flex justify-center w-full max-w-screen-lg h-full pt-16">
        <div className="flex flex-col md:flex-row w-full h-auto justify-center items-center bg-white rounded-lg lg:rounded-l-box shadow-lg">
          <div className="md:w-1/2 h-full bg-emerald-500 md:rounded-l-lg md:rounded-none hidden lg:block ">
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
                  <li>&#10003; Find the Best Invesment</li>
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
            <p className="text-2xl text-gray-700">
              Welcome back! Please enter your details
            </p>
            <div className={error ? "mt-1" : "mt-8"}>
              {error && <p className="text-red-600 font-bold">*{error}*</p>}

              <div>
                <label>Email</label>
                <input
                  type="email"
                  className="w-full border-2 border-gray-300 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.trim())}
                  required
                />
              </div>

              <div className="relative mt-4">
                <label>Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border-2 border-gray-300 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-4 transform -translate-y-1/2"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <div className="mt-8 flex justify-between items-center">
                <div>
                  <input type="checkbox" id="remember" />
                  <label
                    className="ml-2 font-medium text-base"
                    htmlFor="remember"
                  >
                    Remember for 30 days
                  </label>
                </div>
                <button className="font-medium text-base text-blue-500">
                  Forgot password?
                </button>
              </div>

              <div className="mt-8 flex flex-col gap-y-4">
                {!loading ? (
                  <button
                    type="submit"
                    className="py-3 rounded-xl bg-emerald-500 text-white font-bold hover:bg-blue-600 transition-all"
                    onClick={handleLogin}
                  >
                    Sign in
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
                  Sign in with Google
                </button>

                <div className="mt-5 flex justify-center items-center">
                  <p className="font-medium text-base">
                    Don't have an account?
                  </p>
                  <button
                    className="text-blue-500 text-base font-medium ml-2"
                    onClick={() => navigate("/register")}
                  >
                    Register
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

export default LoginPage;
