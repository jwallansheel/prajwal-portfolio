import React from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css'; // Import the CSS file

const About = () => {
  const navigate = useNavigate();

  const enterProjects = () => {
    navigate('/Stopwatch');
  };

  return (
    <section id="about">
      <div className="about-container">
        <div className="about-content">
          <h2>About Me</h2>
          <p>Hey!!</p>
          <p>I am Prajwal, A Developer</p>
          <p>
            Being a Developer, I have a knack to 'Develop' or engineer stuff for fun and for purpose.
            Following this is the cascade of my projects which is in continuous development.
          </p>
          <div>
            <button className="enter-button" onClick={enterProjects}>
              Enter
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;