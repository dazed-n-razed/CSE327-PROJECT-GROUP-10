// models/commentModel.js
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming a user model exists
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project", // Assuming a project model exists
      required: true,
    },
    content: {
      type: String,
      required: true,
      maxlength: 1000, // Limit the length of the comment
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
