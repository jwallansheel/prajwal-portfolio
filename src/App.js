import React from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import About from "./componente/about";
import Stopwatch from "./componente/shorts/Stopwatch";
import Lapper from "./componente/shorts/Lapper";
import Shopper from "./componente/shorts/Shopper";
import Grid from "./componente/shorts/CGOL";
import Turret from "./componente/shorts/turreteer";
import ResumeViewer from "./componente/pages/resume";
import logo from "./logo.svg";
import bgi from "./resources/background.jpeg"; // Updated path for clarity
import "./App.css";

function App() {
  const navigate = useNavigate();

  function handleProjects() {
    console.log("Navigating to About Section");
    navigate("/about");
  }

  return (
    <div className="App w-screen h-screen relative overflow-hidden">
      {/* Background image */}
      <img
        src={bgi}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-100"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Centered Content */}
      <header className="App-header flex flex-col justify-center items-center h-full text-white relative z-10">
        <img
          src={logo}
          className="App-logo w-24 h-24 animate-spin duration-[100000ms]"
          alt="logo"
        />
        <div className="text-center mt-6 px-6">
          <p className="text-2xl font-semibold">
            Welcome! I'm Prajjwal Vernekar, <br /> And this is my Portfolio
          </p>
          <p className="text-l mt-2">
            Explore my portfolio to see how my skills in web development,
            design, project management, and curiosity to improve life can drive
            impactful projects and provide value.
          </p>
        </div>
        <button
          onClick={handleProjects}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 mt-6 rounded-full transition-all duration-300 ease-in-out"
        >
          Explore My Projects
        </button>
      </header>

      {/* Floating Tabs - Vertically aligned on both sides */}
      <div className="absolute inset-y-0 left-10 flex flex-col justify-center gap-6 z-10">
        {["Resume", "What's the point?", "My Vision"].map((tab, idx) => (
          <div
            key={idx}
            onClick={() => navigate(`/${tab} `)}
            className="floating-tab group relative bg-white w-60 h-60 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-110"
          >
            <img
              src={`path_to_image_${idx}.jpg`} // Replace with actual image paths
              alt={`Preview of ${tab}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-sm">{tab}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-y-0 right-10 flex flex-col justify-center gap-6 z-10">
        {["Education", "Hobbies", "Skills"].map((tab, idx) => (
          <div
            key={idx}
            className="floating-tab group relative bg-white w-60 h-60 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-110"
          >
            <img
              src={`path_to_image_${idx + 3}.jpg`} // Replace with actual image paths
              alt={`Preview of ${tab}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-sm">{tab}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AppWrapper() {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route path="/prajwal-portfolio" element={<App />} />
          <Route path="/about" element={<About />} />
          <Route path="/Stopwatch" element={<Stopwatch />} />
          <Route path="/Lapper" element={<Lapper />} />
          <Route path="/Shopper" element={<Shopper />} />
          <Route path="/GOL" element={<Grid />} />
          <Route path="/Turret" element={<Turret />} />
          <Route path="/resume" element={<ResumeViewer />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

function Main() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default Main;
