import logo from './logo.svg';
import './App.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import './resources/transition.css'
import About from './componente/about';
import Stopwatch from './componente/shorts/Stopwatch';
import Lapper from './componente/shorts/Lapper';

function App() {
  const navigate=useNavigate();

  function handleProjects() {
    console.log("Going to About Section");
    navigate('/about');
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Visitor, I'm Prajwal Vernekar, a React and ASP.Net Developer.</p>
        <p>
          Welcome to my Portfolio, a glimpse of my professional life and how my skills may prove to be of value.
        </p>
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        <button onClick={()=>handleProjects()} style={{ backgroundColor: '#4EC5F1', borderRadius: 20, zIndex: 40 }}>
          <p>Press to know about my projects</p>
        </button>
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

function AppWrapper() {
  const location= useLocation();
  return (
     <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
          <Route path="/Stopwatch" element={<Stopwatch/>}/>
          <Route path="/Lapper" element={<Lapper/>}/>

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