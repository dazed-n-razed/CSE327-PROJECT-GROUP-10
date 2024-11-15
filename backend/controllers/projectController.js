// backend/controllers/projectController.js
import Project from "../models/projectModel.js";
import { validateProjectData, findProjectById } from "../utils/helper.js"; // Import helper functions

// Create a new project
export const createProject = async (req, res) => {
  const { title, description, goalAmount, creator, image } = req.body;

  // Validate project data using the helper function
  if (
    !validateProjectData({ title, description, goalAmount, creator, image })
  ) {
    return res.status(400).json({ error: "Invalid project data" });
  }

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
    // Use the helper function to find the project by ID
    const project = await findProjectById(id);
    if (!project) return res.status(404).json({ error: "Project not found" });

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: "Error fetching project" });
  }
};

// Approve project
export const approveProject = async (req, res) => {
  const projectId = req.params.id;

  try {
    // Use the helper function to find the project by ID
    const project = await findProjectById(projectId);
    if (!project) return res.status(404).json({ error: "Project not found" });

    // Update project status to 'approved'
    project.status = "approved";
    await project.save();

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  const projectId = req.params.id;

  try {
    // Use the helper function to find the project by ID
    const project = await findProjectById(projectId);
    if (!project) return res.status(404).json({ error: "Project not found" });

    await project.delete();
    res.status(200).json({ message: "Project successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

// Get all projects (repeated, can be removed if not needed)
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    if (!projects) {
      return res.status(404).json({ error: "No projects found" });
    }

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Server error, please try again later" });
  }
};
