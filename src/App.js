import React from 'react';
import Navbar from './components/Navbar';
import ProjectList from './components/ProjectList';
import FileUpload from './components/FileUpload';

function App() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center text-white">
      <Navbar />
      <div className="container mx-auto p-6 flex flex-col items-center">
        <FileUpload />
        <ProjectList />
      </div>
    </div>
  );
}

export default App;
