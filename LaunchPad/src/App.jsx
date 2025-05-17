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
import ProjectPage from "./pages/ProjectPage";
import NewRegistrationPage from "./pages/NewRegistrationPage";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // Dynamically check token presence

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<NewRegistrationPage />} />
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
      </Routes>
    </Router>
  );
};

export default App;
