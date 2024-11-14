// backend/controllers/projectController.js

import Project from "../models/projectModel.js";

// Create a new project
export const createProject = async (req, res) => {
  const { title, description, goalAmount, creator, image } = req.body;

  try {
    const newProject = new Project({
      title,
      description,
      goalAmount,
      creator,
      image,
    });

    await newProject.save();
    res
      .status(201)
      .json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    res.status(500).json({ error: "Error creating project" });
  }
};

// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("creator", "username");
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Error fetching projects" });
  }
};

// Get project by ID
export const getProjectById = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id).populate("creator", "username");
    if (!project) return res.status(404).json({ error: "Project not found" });

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: "Error fetching project" });
  }
};
