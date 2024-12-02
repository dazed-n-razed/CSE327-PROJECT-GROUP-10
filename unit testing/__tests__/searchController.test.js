import { jest } from "@jest/globals";
import { searchProjectsByTitle } from "../backend/controllers/searchController.js";
import Project from "../backend/models/projectModel.js";

// Mock the Project model
jest.mock("../backend/models/projectModel.js");

describe("searchProjectsByTitle", () => {
  let req, res;

  beforeEach(() => {
    req = { query: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return 400 if title is not provided", async () => {
    req.query.title = "";
    await searchProjectsByTitle(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Title query parameter is required" });
  });

  it("should return a list of projects if title is provided", async () => {
    req.query.title = "test";
    const mockProjects = [{ title: "Test Project" }];
    Project.find.mockResolvedValue(mockProjects);

    await searchProjectsByTitle(req, res);

    expect(Project.find).toHaveBeenCalledWith({ title: { $regex: "test", $options: "i" } });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockProjects);
  });

  it("should handle errors gracefully", async () => {
    req.query.title = "test";
    const mockError = new Error("Database error");
    Project.find.mockRejectedValue(mockError);

    await searchProjectsByTitle(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error searching projects",
      details: mockError.message,
    });
  });
});
