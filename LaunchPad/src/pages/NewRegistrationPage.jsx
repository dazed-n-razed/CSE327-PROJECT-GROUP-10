import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CircleUser, Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";
import { registerUser } from "../services/api";

const NewRegistrationPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response) {
        // Registration successful
        navigate("/login");
      }
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <style jsx global>{`
        .blob {
          position: absolute;
          filter: blur(40px);
          transition: all 0.5s ease;
          border-radius: 50%;
          z-index: 1;
        }
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .form-group input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          border: 2px solid #e5e7eb;
          border-radius: 0.75rem;
          background: transparent;
          transition: all 0.3s ease;
        }
        .form-group input:focus {
          border-color: #10b981;
          outline: none;
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
        }
        .form-group label {
          position: absolute;
          transition: all 0.3s ease;
          pointer-events: none;
        }
      `}</style>{" "}
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
      <div className="min-h-screen w-full bg-white p-4 md:p-6 lg:p-8 overflow-hidden relative flex items-center justify-center pt-16">
        {/* Animated Background Blobs */}
        <div
          className="blob"
          style={{
            width: "400px",
            height: "400px",
            top: "10%",
            left: "5%",
            background: "rgba(16, 185, 129, 0.2)",
            transform: `translate(${mousePosition.x * 0.01}px, ${
              mousePosition.y * 0.01
            }px)`,
            animationDelay: "0s",
          }}
        />
        <div
          className="blob"
          style={{
            width: "350px",
            height: "350px",
            bottom: "5%",
            right: "10%",
            background: "rgba(5, 150, 105, 0.15)",
            transform: `translate(${-mousePosition.x * 0.01}px, ${
              -mousePosition.y * 0.01
            }px)`,
            animationDelay: "5s",
          }}
        />

        <div className="mx-auto w-full max-w-md relative z-10">
          {/* Logo */}
          <div className="mb-10 flex items-center justify-center">
            <div
              className="relative flex h-20 w-20 items-center justify-center"
              style={{ animation: "pulse 3s infinite ease-in-out" }}
            >
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="40"
                  cy="40"
                  r="38"
                  stroke="url(#paint0_linear)"
                  strokeWidth="4"
                />
                <path
                  d="M28 40L36 48L52 32"
                  stroke="url(#paint0_linear)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1="20"
                    y1="20"
                    x2="60"
                    y2="60"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#10b981" />
                    <stop offset="1" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Registration Form */}
          <div className="w-full rounded-2xl bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all duration-300">
            <h1
              className="mb-8 text-center text-3xl font-bold text-gray-800"
              style={{
                background: "linear-gradient(90deg, #10b981, #059669)",
                backgroundSize: "200% 200%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                animation: "gradient-shift 3s ease infinite",
              }}
            >
              Join Us
            </h1>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name Input */}
              <div className="form-group relative">
                <label
                  htmlFor="name"
                  className={`left-12 text-gray-500 ${
                    focusedInput === "name" || formData.name
                      ? "top-3 text-xs text-emerald-600"
                      : "top-5"
                  }`}
                ></label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput("name")}
                  onBlur={(e) => !e.target.value && setFocusedInput(null)}
                  placeholder="Your full name"
                  required
                />
                <CircleUser className="absolute left-4 top-5 h-5 w-5 text-emerald-500" />
              </div>

              {/* Email Input */}
              <div className="form-group relative">
                <label
                  htmlFor="email"
                  className={`left-12 text-gray-500 ${
                    focusedInput === "email" || formData.email
                      ? "top-3 text-xs text-emerald-600"
                      : "top-5"
                  }`}
                ></label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput("email")}
                  onBlur={(e) => !e.target.value && setFocusedInput(null)}
                  placeholder="Your email address"
                  required
                />
                <Mail className="absolute left-4 top-5 h-5 w-5 text-emerald-500" />
              </div>

              {/* Password Input */}
              <div className="form-group relative">
                <label
                  htmlFor="password"
                  className={`left-12 text-gray-500 ${
                    focusedInput === "password" || formData.password
                      ? "top-0 text-xs text-emerald-600"
                      : "top-5"
                  }`}
                ></label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput("password")}
                  onBlur={(e) => !e.target.value && setFocusedInput(null)}
                  placeholder="Your password"
                  required
                />
                <Lock className="absolute left-4 top-5 h-5 w-5 text-emerald-500" />
                <button
                  type="button"
                  className="absolute right-4 top-5 text-gray-400 hover:text-emerald-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Confirm Password Input */}
              <div className="form-group relative">
                <label
                  htmlFor="confirmPassword"
                  className={`left-12 text-gray-500 ${
                    focusedInput === "confirmPassword" ||
                    formData.confirmPassword
                      ? "top-3 text-xs text-emerald-600"
                      : "top-5"
                  }`}
                ></label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput("confirmPassword")}
                  onBlur={(e) => !e.target.value && setFocusedInput(null)}
                  placeholder="Confirm your password"
                  required
                />
                <Lock className="absolute left-4 top-5 h-5 w-5 text-emerald-500" />
                <button
                  type="button"
                  className="absolute right-4 top-5 text-gray-400 hover:text-emerald-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Submit Button */}
              <div className="form-group">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center bg-emerald-500 text-white py-3 text-lg rounded-xl hover:bg-emerald-600 transition-colors duration-300 disabled:opacity-50"
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                  {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
                </button>
              </div>

              {/* Login Link */}
              <p className="text-center text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Login here
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewRegistrationPage;
