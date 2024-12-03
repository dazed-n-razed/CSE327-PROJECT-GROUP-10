import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; // Import Navigate
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ProfilePage from "./pages/ProfilePage"; // Import ProfilePage
import { useEffect, useState } from "react";
import ProjectPage from "./pages/ProjectPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is authenticated by checking if the token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* If the user is authenticated, they can access the ProfilePage */}
        <Route
          path="/profile"
          element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />}
        />
        {/* Default route that redirects to login if the user is not authenticated */}
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/profile" : "/login"} />}
        />
        <Route
          path="/projects"
          element={isAuthenticated ? <ProjectPage /> : <Navigate to="/login" />}
        />
        {/* Project creation page */}
      </Routes>
    </Router>
  );
};

export default App;
