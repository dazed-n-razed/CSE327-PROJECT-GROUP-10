import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

    const userData = { email, password };

    try {
      const response = await loginUser(userData); // Call the login API
      if (response && response.token) {
        localStorage.setItem("token", response.token); // Store the token in localStorage
        navigate("/profile"); // Navigate to the profile page after successful login
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Login failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full min-h-screen items-center justify-center ">
      <style jsx global>{`
        body {
          background-image: url("https://firebasestorage.googleapis.com/v0/b/ratuls-projects.appspot.com/o/299%20final%20presentation.pptx.png?alt=media&token=eb16b380-f923-4ad1-a55f-ad2701c649ac");
          background-size: cover;
          background-position: center;
        }
      `}</style>

      <div className="flex justify-center w-full max-w-screen-lg h-full ">
        <div className="flex flex-col md:flex-row w-full h-auto justify-center items-center bg-white rounded-lg lg:rounded-l-box shadow-lg">
          <div className="md:w-1/2 h-full bg-blue-400 md:rounded-l-lg md:rounded-none hidden lg:block ">
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
                    className="py-3 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-600 transition-all"
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
