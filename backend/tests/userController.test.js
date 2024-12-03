// tests/userController.test.js

import request from "supertest";
import mockingoose from "mockingoose";
import app from "../index"; // Assuming you export the app from index.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Mock bcrypt and jwt to isolate testing logic
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("User Controller", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  // Test the user registration functionality
  describe("POST /api/users/register", () => {
    it("should successfully register a new user", async () => {
      const newUser = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      };

      mockingoose(User).toReturn(null, "findOne"); // Mock no existing user
      bcrypt.hash.mockResolvedValue("hashedPassword123"); // Mock bcrypt hashing
      mockingoose(User).toReturn(
        { _id: "60d2f3d7b1b8c0c524d6c8b7", ...newUser },
        "save"
      );

      const response = await request(app)
        .post("/api/users/register")
        .send(newUser);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("User registered successfully!");
    });

    it("should return 400 if user already exists", async () => {
      const newUser = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      };

      mockingoose(User).toReturn({ email: "john@example.com" }, "findOne"); // Mock user already exists

      const response = await request(app)
        .post("/api/users/register")
        .send(newUser);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("User already exists");
    });

    it("should return 500 if server error occurs", async () => {
      const newUser = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      };

      mockingoose(User).toReturn(null, "findOne");
      bcrypt.hash.mockRejectedValue(new Error("Server error"));

      const response = await request(app)
        .post("/api/users/register")
        .send(newUser);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe(
        "Server error, please try again later"
      );
    });
  });

  // Test the login functionality
  describe("POST /api/users/login", () => {
    it("should successfully login a user and return a token", async () => {
      const existingUser = {
        _id: "60d2f3d7b1b8c0c524d6c8b7",
        name: "John Doe",
        email: "john@example.com",
        password: await bcrypt.hash("password123", 10),
      };

      mockingoose(User).toReturn(existingUser, "findOne");
      bcrypt.compare.mockResolvedValue(true); // Mock password match
      jwt.sign.mockReturnValue("fake-jwt-token"); // Mock JWT token generation

      const response = await request(app).post("/api/users/login").send({
        email: "john@example.com",
        password: "password123",
      });

      expect(response.status).toBe(200);
      expect(response.body.token).toBe("fake-jwt-token");
      expect(response.body.user.name).toBe(existingUser.name);
    });

    it("should return 400 for invalid credentials", async () => {
      mockingoose(User).toReturn(null, "findOne");

      const response = await request(app).post("/api/users/login").send({
        email: "john@example.com",
        password: "wrongpassword",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid email or password");
    });

    it("should return 500 if server error occurs", async () => {
      mockingoose(User).toReturn(null, "findOne");
      bcrypt.compare.mockRejectedValue(new Error("Server error"));

      const response = await request(app).post("/api/users/login").send({
        email: "john@example.com",
        password: "password123",
      });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe(
        "Server error, please try again later"
      );
    });
  });

  // Test the user profile functionality
  describe("GET /api/users/profile", () => {
    it("should return user profile when valid token is provided", async () => {
      const userId = "60d2f3d7b1b8c0c524d6c8b7";
      const token = "fake-jwt-token";
      const existingUser = {
        _id: userId,
        name: "John Doe",
        email: "john@example.com",
        role: "user",
      };

      mockingoose(User).toReturn(existingUser, "findById");

      const response = await request(app)
        .get("/api/users/profile")
        .set("Authorization", `Bearer ${token}`); // Set Authorization header

      expect(response.status).toBe(200);
      expect(response.body.name).toBe(existingUser.name);
      expect(response.body.email).toBe(existingUser.email);
    });

    it("should return 401 if no token is provided", async () => {
      const response = await request(app).get("/api/users/profile");

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("No token, authorization denied");
    });

    it("should return 404 if user not found", async () => {
      const token = "fake-jwt-token";
      mockingoose(User).toReturn(null, "findById");

      const response = await request(app)
        .get("/api/users/profile")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("User not found");
    });

    it("should return 500 if server error occurs", async () => {
      const token = "fake-jwt-token";
      mockingoose(User).toReturn(null, "findById");

      const response = await request(app)
        .get("/api/users/profile")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Server error");
    });
  });
});
