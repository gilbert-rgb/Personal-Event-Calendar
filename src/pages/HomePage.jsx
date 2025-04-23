// src/pages/HomePage.jsx
import React from "react";
import Footer from "../components/Footer"; 

const HomePage = () => {
  return (
    <div className="text-center p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to MyEvents</h1>
      <p className="text-lg">Manage personal events with ease</p>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
