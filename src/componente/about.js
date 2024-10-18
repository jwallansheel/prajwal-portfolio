import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const [showProjects, setShowProjects] = useState(false);

  const enterProjects = () => {
    setShowProjects(true); // Show the projects grid when "Enter" is clicked
  };

  const projectList = [
    {
      title: "Stopwatch",
      image:
        "https://imgs.search.brave.com/9_6ex4w8IG4K8UcLZXeNhRdYj2iTNXkCT1PSiD2Gex8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy85/LzllL0Nhc2lvX1ct/ODZfZGlnaXRhbF93/YXRjaF9lbGVjdHJv/bHVtaW5lc2NlbnRf/YmFja2xpZ2h0Xyhp/KS5qcGc",
      route: "/Stopwatch",
    },
    {
      title: "Lapper : A Racetrack Simulation",
      image:
        "https://imgs.search.brave.com/rGhhWuTeKpc69k7eEuQTk6NaKFO8N5q4gZSHR371LHo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9y/YWNlLWZvcm11bGEt/dHJhY2stc3Vuc2V0/LWZyb250LXZpZXdf/OTAyMjAtMTcwNy5q/cGc_c2l6ZT02MjYm/ZXh0PWpwZw",
      route: "/lapper",
    },
    {
      title: "Shopper : A shop cart demonstration",
      image:
        "https://imgs.search.brave.com/yzMk-UfqWvc-jd53Ju7H-luWuntyAEd7sKmX6T73Ac4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM4/NjAxMDAyMi9waG90/by9jaGVja2luZy10/aGUtYmlsbC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9dTFZ/ZjdlSGw5cHllRmF1/NDdXSi1hY2JlMGZN/YndBZzVvZUJCY3BG/MDFVOD0",
      route: "/Shopper",
    },
    {
      title: "Conway's Game of Life",
      image:
        "https://imgs.search.brave.com/4Fq2TwOscXVhl4cczQucMzsu2ymtJSbF9jROx6T30dc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy85/Lzk5L0dhbWVfb2Zf/bGlmZV9kaWVoYXJk/LnN2Zw",
      route: "/GOL",
    },
    {
      title: "Angry flapper",
      image:
        "https://imgs.search.brave.com/4Fq2TwOscXVhl4cczQucMzsu2ymtJSbF9jROx6T30dc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy85/Lzk5L0dhbWVfb2Zf/bGlmZV9kaWVoYXJk/LnN2Zw",
      route: "/Flapper",
    },
    // Add more projects as needed
  ];

  return (
    <section
      id="about"
      className="bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center"
    >
      <div className="about-container p-8 w-full text-center">
        <div className="about-content space-y-6">
          <h2 className="text-4xl font-bold">About Me</h2>
          <p className="text-lg">Hey!!</p>
          <p className="text-lg">I am Prajwal, A Developer</p>
          <p className="text-base leading-relaxed">
            Being a Developer, I have a knack to 'Develop' or engineer stuff for
            fun and for purpose. Following this is a cascade of my projects,
            which are in continuous development.
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full mt-6 transition-all duration-300 ease-in-out"
            onClick={enterProjects}
          >
            Enter
          </button>
        </div>
      </div>

      {/* Conditionally render the project grid */}
      {showProjects && (
        <div className="projects-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12 p-8 w-full">
          {projectList.map((project, index) => (
            <div
              key={index}
              className="project-card bg-gray-800 hover:bg-gray-700 transition-all duration-300 ease-in-out p-4 rounded-lg cursor-pointer"
              onClick={() => navigate(project.route)}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-xl font-semibold mt-4">{project.title}</h3>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default About;
