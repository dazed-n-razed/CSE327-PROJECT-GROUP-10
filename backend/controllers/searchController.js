// backend/controllers/searchController.js


export const searchProjects = async (req, res) => {
  const { query } = req.query;  // Getting the search query from the query parameters

  try {
    // Perform the search on title or description
    const projects = await Project.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },  // Case-insensitive search for title
        { description: { $regex: query, $options: 'i' } }  // Case-insensitive search for description
      ]
    });

    if (projects.length === 0) {
      return res.status(404).json({ error: "No projects found matching your search" });
    }

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Error searching projects", details: error.message });
  }
};
