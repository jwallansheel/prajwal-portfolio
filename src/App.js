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

function App() {
  const navigate = useNavigate();

  function handleProjects() {
    console.log("Going to About Section");
    navigate("/about");
  }

  return (
    <div className="App w-screen">
      <header className="App-header flex flex-col justify-center items-center h-screen w-full bg-gray-900 text-white">
        <img
          src={logo}
          className="App-logo w-24 h-24 animate-spin duration-[100000ms]"
          alt="logo"
        />
        <p className="text-lg mt-4">
          Hello Visitor, I'm Prajwal Vernekar, a React and ASP.Net Developer.
        </p>
        <p className="text-base mt-2 text-center px-4">
          Welcome to my Portfolio, a glimpse of my professional life and how my
          skills may prove to be of value.
        </p>

        <button
          onClick={handleProjects}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 mt-8 rounded-full z-40 transition-all duration-300 ease-in-out"
        >
          Press to know about my projects
        </button>
      </header>
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
