import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const enterProjects = () => {
    navigate("/Stopwatch");
  };

  return (
    <section
      id="about"
      className="bg-gray-900 text-white min-h-screen flex justify-center items-center"
    >
      <div className="about-container p-8 w-screen mx-auto text-center">
        <div className="about-content space-y-6">
          <h2 className="text-4xl font-bold">About Me</h2>
          <p className="text-lg">Hey!!</p>
          <p className="text-lg">I am Prajwal, A Developer</p>
          <p className="text-base leading-relaxed">
            Being a Developer, I have a knack to 'Develop' or engineer stuff for
            fun and for purpose. Following this is the cascade of my projects
            which is in continuous development.
          </p>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full mt-6 transition-all duration-300 ease-in-out"
              onClick={enterProjects}
            >
              Enter
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
