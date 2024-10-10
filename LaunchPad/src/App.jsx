import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <div className="bg-gradient-to-r from-indigo-500 w-full h-full flex flex-row md:flex-row items-center justify-center ">
          <div className="bg-white h-full w-full md:w-1/2 flex flex-col items-center justify-center p-3 ">
            <p className="pb-4 text-black text-sm md:text-5xl text-center md:text-left md:m-5 md:w-1/2">
              All Set For Your asdasdasdadasdasdadsProject To Reach Sky High
            </p>
            <button
              className="w-full md:w-1/2 bg-white text-sm md:text-lg text-blue-400 mb-2 md:mb-3 p-2 md:p-3 border-2 rounded-full font-semibold"
              onClick={() => (window.location.href = "/job-board")}
            >
              <p className="text-center ">Apply For Jobs</p>
            </button>
            <button
              className="w-full md:w-1/2 bg-white text-sm md:text-lg text-blue-400 mb-2 md:mb-3 p-2 md:p-3 border-2 rounded-full font-semibold"
              onClick={() => (window.location.href = "/postCV")}
            >
              <p className="text-center ">Generate Your CV</p>
            </button>
            <button
              className="w-full md:w-1/2 bg-white text-sm md:text-lg text-blue-400 mb-2 md:mb-3 p-2 md:p-3 border-2 rounded-full font-semibold"
              onClick={() => (window.location.href = "/user-register")}
            >
              <p className="text-center ">Sign Up Today</p>
            </button>
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/ratuls-projects.appspot.com/o/web-development-services.gif?alt=media&token=b4f03329-e9f1-45a8-9ba3-7bad55ffb748"
              alt=""
              className="w-3/4"
            />
          </div>
        </div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
