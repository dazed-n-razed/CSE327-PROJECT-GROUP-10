import React, { useState } from 'react';

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      alert(`File ${file.name} uploaded!`);
      setFile(null);
    }
  };

  return (
    <div className="w-full max-w-md bg-gray-800 p-4 rounded-lg shadow-lg mb-6 text-white">
      <h2 className="text-lg font-semibold mb-4 text-center">Upload a File</h2>
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4 border border-gray-700 rounded-lg w-full p-2 bg-gray-800 text-white focus:outline-none focus:border-blue-500"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition"
      >
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
