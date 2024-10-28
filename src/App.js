import logo from "./logo.svg";
import "./App.css";
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
import Flapper from "./componente/shorts/flapper";

function App() {
  const navigate = useNavigate();

  function handleProjects() {
    console.log("Going to About Section");
    navigate("/about");
  }

  return (
    <div className="App w-screen h-screen relative overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      >
        {/* <source src={backgroundVideo} type="video/mp4" /> */}
      </video>

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
            Welcome! I'm Prajjwal Vernekar, <br />a React and ASP.Net Developer
          </p>
          <p className="text-sm mt-2">
            Explore my portfolio to see how my skills in web development and
            design can drive impactful projects.
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
        {["My Resume'", "What's the point?", "My Vision"].map((tab, idx) => (
          <div
            key={idx}
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
        {["Education", "hobbies", "Skills"].map((tab, idx) => (
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
        <div>
          <Routes location={location}>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<About />} />
            <Route path="/Stopwatch" element={<Stopwatch />} />
            <Route path="/Lapper" element={<Lapper />} />
            <Route path="/Shopper" element={<Shopper />} />
            <Route path="/GOL" element={<Grid />} />
            <Route path="/flapper" element={<Flapper />} />
          </Routes>
        </div>
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
