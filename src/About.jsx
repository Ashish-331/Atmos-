import { Link } from "react-router-dom";
import "./About.css";

function About() {
  return (
    <div className="about-page">
      <div className="about-card">
        <h1>About Atmos</h1>

        <p>
          Atmos is a modern weather application built to provide
          accurate and easy-to-understand weather information
          for cities around the world.
        </p>

        <h2>Features</h2>

        <ul>
          <li>Real-time weather information</li>
          <li>Detailed weather statistics</li>
          <li>Popular city weather cards</li>
          <li>Fast city search</li>
          <li>Responsive design</li>
        </ul>

        <h2>Technology Stack</h2>

        <ul>
          <li>React</li>
          <li>React Router</li>
          <li>OpenWeather API</li>
          <li>CSS3</li>
        </ul>

        <h2>Mission</h2>

        <p>
          Atmos aims to make weather information simple,
          beautiful, and accessible for everyone.
        </p>
      </div>
    </div>
  );
}

export default About;