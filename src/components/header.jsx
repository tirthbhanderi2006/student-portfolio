import React from "react";

export default function Header(props) {
  return (
    <header id="hero">
      <h1>Hi, I'm {props.name || "Tirth"}</h1>
      <p>
        I am a student specializing in {props.branch || "AIML"}.
      </p>
      <p>
        <a href="#about">Learn more about me</a>
      </p>
    </header>
  );
}
