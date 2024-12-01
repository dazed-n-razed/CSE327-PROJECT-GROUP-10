import React, { useState } from 'react';

const Project = ({ project, projects, setProjects }) => {
  const [comment, setComment] = useState('');

  const handleAddComment = () => {
    if (comment.trim()) {
      const updatedProjects = projects.map((p) =>
        p.id === project.id
          ? { ...p, comments: [...p.comments, comment] }
          : p
      );
      setProjects(updatedProjects);
      setComment('');
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-white">
      <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
      <p className="text-gray-400 mb-2">{project.pledges} Pledges</p>
      <div className="border-t border-gray-600 pt-2">
        <h4 className="text-lg font-medium mb-2">Comments</h4>
        <ul className="space-y-2">
          {project.comments.map((comment, index) => (
            <li key={index} className="text-gray-300">{comment}</li>
          ))}
        </ul>
        <div className="flex items-center mt-2">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="p-2 border border-gray-700 rounded-lg w-full mr-2 bg-gray-800 text-white focus:outline-none focus:border-blue-500"
            placeholder="Add a comment..."
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition"
          >
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Project;
