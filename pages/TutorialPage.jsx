import React from 'react';
import './TutorialPage.css'; // Import the CSS file

const TutorialPage = ({ onReturn }) => {
  return (
    <div className="tutorial-container">
      <h2 className="tutorial-title">Tutorial</h2>
      <p className="tutorial-intro">Welcome to the tutorial page!</p>

      <section className="tutorial-section">
        <h3 className="section-title">Introduction</h3>
        <p className="section-content">This is a Chrome extension for WPI Planner.</p>
      </section>

      <section className="tutorial-section">
        <h3 className="section-title">Usage</h3>
        <p className="section-content">Hover over the professor's name to view their rating.</p>
      </section>

      {/* Return Button */}
      <button className="return-button" onClick={onReturn}>
        Main page
      </button>
    </div>
  );
};

export default TutorialPage;
