// tests/searchController.test.js

import request from "supertest";
import app from "../index.js"; // Import your app entry point
import Project from "../models/projectModel.js";

// Mock the Project model
jest.mock("../models/projectModel.js");

describe("Search Projects Controller", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls and instances
  });

  test("should return projects matching the title", async () => {
    const mockProjects = [
      { title: "Test Project 1", description: "Description 1" },
      { title: "Test Project 2", description: "Description 2" },
    ];

    // Mock the find method
    Project.find.mockResolvedValue(mockProjects);

    const response = await request(app).get("/api/search/projects?title=Test");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProjects);
    expect(Project.find).toHaveBeenCalledWith({
      title: { $regex: "Test", $options: "i" },
    });
  });

  test("should return 400 if title query parameter is missing", async () => {
    const response = await request(app).get("/api/search/projects");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Title query parameter is required" });
  });

  test("should return 500 if there is a server error", async () => {
    Project.find.mockRejectedValue(new Error("Database error"));

    const response = await request(app).get("/api/search/projects?title=Test");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: "Error searching projects",
      details: "Database error",
    });
  });
});
