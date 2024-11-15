import Pledge from "../models/pledgeModel.js";
import Project from "../models/projectModel.js";

// Create a pledge
export const createPledge = async (req, res) => {
  const { amount, projectId } = req.body;
  const userId = req.user._id; // Assuming the user is authenticated and userId is in req.user

  try {
    // Check if the project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Create the pledge
    const newPledge = new Pledge({
      amount,
      project: projectId,
      user: userId,
    });

    await newPledge.save();

    // Update the project goal progress
    project.pledgedAmount += amount;
    await project.save();

    res
      .status(201)
      .json({ message: "Pledge created successfully", pledge: newPledge });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create pledge", details: error.message });
  }
};

// Get all pledges for a specific project
export const getPledgesByProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    // Fetch all pledges for the given project
    const pledges = await Pledge.find({ project: projectId }).populate(
      "user",
      "name"
    );
    if (!pledges) {
      return res
        .status(404)
        .json({ error: "No pledges found for this project" });
    }

    res.status(200).json(pledges);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch pledges", details: error.message });
  }
};

// Delete a pledge
export const deletePledge = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the pledge by ID
    const pledge = await Pledge.findById(id);
    if (!pledge) {
      return res.status(404).json({ error: "Pledge not found" });
    }

    // Remove the pledge from the database
    await pledge.remove();

    // Update the project pledgedAmount (decrement)
    const project = await Project.findById(pledge.project);
    if (project) {
      project.pledgedAmount -= pledge.amount;
      await project.save();
    }

    res.status(200).json({ message: "Pledge deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete pledge", details: error.message });
  }
};

// Get all pledges by a specific user
export const getPledgesByUser = async (req, res) => {
  const userId = req.user._id; // Assuming the user is authenticated and userId is in req.user

  try {
    // Fetch all pledges by the authenticated user
    const pledges = await Pledge.find({ user: userId }).populate(
      "project",
      "title"
    );
    if (!pledges) {
      return res.status(404).json({ error: "No pledges found for this user" });
    }

    res.status(200).json(pledges);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch pledges", details: error.message });
  }
};
