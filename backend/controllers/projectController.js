import Project from "../models/projectModel.js";
import jwt from "jsonwebtoken";

export const createProject = async (req, res) => {
  try {
    const { title, description, goalAmount, image } = req.body;

    // Use req.user._id directly (populated by the protect middleware)
    const project = new Project({
      title,
      description,
      goalAmount,
      image,
      creator: req.user._id, // This should now be populated by the middleware
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Server error, please try again" });
  }
};
