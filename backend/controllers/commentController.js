// backend/controllers/commentController.js
import Comment from "../models/commentModel.js";
import { validateCommentData, findCommentById } from "../utils/helper.js"; // Import helper functions

// Create a new comment
export const createComment = async (req, res) => {
  const { content, projectId } = req.body;
  const userId = req.user.id; // Assuming `req.user.id` contains the authenticated user's ID

  // Validate comment data using the helper function
  if (!validateCommentData({ content, projectId, userId })) {
    return res.status(400).json({ error: "Invalid comment data" });
  }

  try {
    // Create a new comment
    const newComment = new Comment({
      content,
      projectId,
      user: userId, // Associate the comment with the authenticated user
    });

    await newComment.save();
    res
      .status(201)
      .json({ message: "Comment created successfully", comment: newComment });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating comment", details: error.message });
  }
};

// Get all comments for a specific project
export const getCommentsByProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const comments = await Comment.find({ projectId }).populate("user", "name");
    res.status(200).json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching comments", details: error.message });
  }
};

// Get a comment by ID
export const getCommentById = async (req, res) => {
  const { id } = req.params;

  try {
    // Use the helper function to find the comment by ID
    const comment = await findCommentById(id);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    res.status(200).json(comment);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching comment", details: error.message });
  }
};

// Update a comment
export const updateComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    // Find the comment by ID
    const comment = await findCommentById(id);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    // Ensure the user is the one who created the comment
    if (comment.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You can only update your own comments" });
    }

    // Update the comment content
    comment.content = content || comment.content;
    await comment.save();

    res.status(200).json({ message: "Comment updated successfully", comment });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating comment", details: error.message });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the comment by ID
    const comment = await findCommentById(id);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    // Ensure the user is the one who created the comment
    if (comment.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You can only delete your own comments" });
    }

    // Delete the comment
    await comment.delete();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting comment", details: error.message });
  }
};
