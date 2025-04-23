// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; 2025 MyEvents. All rights reserved.
        </p>
        <p className="text-sm">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Visit my GitHub
          </a>
          <p>
          <a
            href="https://Facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            You can find me in Facebook.
          </a>
          </p>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
