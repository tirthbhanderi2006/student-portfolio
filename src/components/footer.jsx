import React from "react";

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-contact">
          <h3>Contact Info</h3>
          <p>
            Email: <a href="mailto:bhanderitirth94@gmail.com">bhanderitirth94@gmail.com</a>
          </p>
        </div>
        <div className="footer-socials">
          <a href="https://github.com/tirthbhanderi2006" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <span>|</span>
          <a href="https://linkedin.com/in/tirth-bhanderi-345763289" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} Tirth Bhanderi. All rights reserved.
        </div>
      </div>
    </footer>
  );
}