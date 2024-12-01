import React, { useState } from 'react';
import Project from './Project';

const ProjectList = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: 'Project A', pledges: 10, comments: [] },
    { id: 2, name: 'Project B', pledges: 20, comments: [] },
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="w-full max-w-lg mt-6">
      <input
        type="text"
        placeholder="Search projects..."
        onChange={handleSearch}
        className="p-2 border border-gray-700 rounded-lg w-full mb-6 bg-gray-800 text-white focus:outline-none focus:border-blue-500"
      />
      <div className="space-y-4">
        {filteredProjects.map((project) => (
          <Project
            key={project.id}
            project={project}
            projects={projects}
            setProjects={setProjects}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
