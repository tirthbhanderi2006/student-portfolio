import React from "react";

export default function Footer() {
  return (
    <footer id="footer">
      <hr />
      <h3>Contact Information</h3>
      <p>
        Email: <a href="mailto:tirth@example.com">tirth@example.com</a>
      </p>
      <p>
        Links:{" "}
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a> |{" "}
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </p>
      <p>
        &copy; {new Date().getFullYear()} Tirth. All rights reserved.
      </p>
    </footer>
  );
}