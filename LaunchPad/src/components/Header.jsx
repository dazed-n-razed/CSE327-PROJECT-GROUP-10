import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-500 text-white p-4">
      <nav className="flex justify-between items-center">
        <h1 className="text-xl font-bold">LAUNCH PAD</h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </li>
          <li>
            <Link to="/projects" className="hover:underline">
              Project
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
