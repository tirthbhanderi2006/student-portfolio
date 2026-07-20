import React from "react";
import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <header className="hero-header">
      <h1>Hi, I'm {props.name || "Tirth Bhanderi"}</h1>
      <p className="tagline">
        I am an AI & ML Engineering student specializing in {props.branch || "Artificial Intelligence & Machine Learning"}.
      </p>
      <p>
        <Link to="/about" className="hero-cta">
          Learn more about me &rarr;
        </Link>
      </p>
    </header>
  );
}
