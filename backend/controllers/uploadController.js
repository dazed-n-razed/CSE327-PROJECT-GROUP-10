
import upload from "../utils/multer.js"; 
// Create a new project with file upload
export const createProject = async (req, res) => {
  const { title, description, goalAmount, creator } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: "Image file is required" });  // Handle missing file
  }

  const image = req.file.path;  // Get the file path of the uploaded image

  // Validate project data using a helper function
  if (!validateProjectData({ title, description, goalAmount, creator, image })) {
    return res.status(400).json({ error: "Invalid project data" });
  }

  try {
    const newProject = new Project({
      title,
      description,
      goalAmount,
      creator,
      image,  // Store the image path in the project
    });

    await newProject.save();
    res.status(201).json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    res.status(500).json({ error: "Error creating project", details: error.message });
  }
};

