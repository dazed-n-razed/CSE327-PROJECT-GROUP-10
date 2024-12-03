export const createProject = async (req, res) => {
  const { title, description, goalAmount, image } = req.body;

  console.log("Received Data:", req.body); // Log the incoming data

  try {
    // Validate required fields
    if (!title || !description || !goalAmount) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Ensure goalAmount is a number
    if (isNaN(goalAmount)) {
      return res.status(400).json({ error: "Goal amount must be a number" });
    }

    // Proceed to create the project if validation passes
    const newProject = new Project({
      title,
      description,
      goalAmount: Number(goalAmount), // Ensure goalAmount is stored as a number
      image,
      creator: req.user._id, // Use the logged-in user's ID
    });

    const savedProject = await newProject.save();
    res
      .status(201)
      .json({ message: "Project created successfully", project: savedProject });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Server error while creating project" });
  }
};
