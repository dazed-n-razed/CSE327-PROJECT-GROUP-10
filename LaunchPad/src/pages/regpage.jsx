// file: RegistrationPage.tsx
"use client";

import { useState, useEffect } from "react";
import { CircleUser, Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";

export default function RegistrationPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedInput, setFocusedInput] = (useState < string) | (null > null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* ... [STYLE TAG OMITTED FOR BREVITY, KEEP YOURS AS IS] ... */}

      <div className="min-h-screen w-full bg-white p-4 md:p-6 lg:p-8 overflow-hidden relative flex items-center justify-center">
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
        ></div>
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
        ></div>

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

            <form className="space-y-6">
              {/* Name Input */}
              <div className="form-group relative">
                <label
                  htmlFor="name"
                  className={`left-12 text-gray-500 ${
                    focusedInput === "name"
                      ? "top-3 text-xs text-emerald-600"
                      : "top-5"
                  }`}
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  onFocus={() => setFocusedInput("name")}
                  onBlur={(e) => e.target.value === "" && setFocusedInput(null)}
                />
                <CircleUser className="absolute left-4 top-5 h-5 w-5 text-emerald-500" />
              </div>

              {/* Email Input */}
              <div className="form-group relative">
                <label
                  htmlFor="email"
                  className={`left-12 text-gray-500 ${
                    focusedInput === "email"
                      ? "top-3 text-xs text-emerald-600"
                      : "top-5"
                  }`}
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Your email address"
                  onFocus={() => setFocusedInput("email")}
                  onBlur={(e) => e.target.value === "" && setFocusedInput(null)}
                />
                <Mail className="absolute left-4 top-5 h-5 w-5 text-emerald-500" />
              </div>

              {/* Password Input */}
              <div className="form-group relative">
                <label
                  htmlFor="password"
                  className={`left-12 text-gray-500 ${
                    focusedInput === "password"
                      ? "top-3 text-xs text-emerald-600"
                      : "top-5"
                  }`}
                >
                  Password
                </label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  onFocus={() => setFocusedInput("password")}
                  onBlur={(e) => e.target.value === "" && setFocusedInput(null)}
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
                    focusedInput === "confirmPassword"
                      ? "top-3 text-xs text-emerald-600"
                      : "top-5"
                  }`}
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  onFocus={() => setFocusedInput("confirmPassword")}
                  onBlur={(e) => e.target.value === "" && setFocusedInput(null)}
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
                  className="flex w-full items-center justify-center bg-emerald-500 text-white py-3 text-lg rounded-xl hover:bg-emerald-600 transition-colors duration-300"
                >
                  Sign Up
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
