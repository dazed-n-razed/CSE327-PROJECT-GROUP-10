import express from "express";
import request from "supertest";
import searchRoutes from "../backend/routes/searchRoutes.js";

// Create an express app for testing
const app = express();
app.use(express.json());
app.use("/", searchRoutes);

describe("GET /projects", () => {
  it("should return 400 if title query is missing", async () => {
    const response = await request(app).get("/projects");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Title query parameter is required" });
  });

  it("should return a list of projects for a valid query", async () => {
    const mockProjects = [{ title: "Test Project" }];

    // Mock the controller function
    jest.spyOn(require("../backend/controllers/searchController.js"), "searchProjectsByTitle")
      .mockImplementation((req, res) => {
        res.status(200).json(mockProjects);
      });

    const response = await request(app).get("/projects").query({ title: "test" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProjects);
  });
});
