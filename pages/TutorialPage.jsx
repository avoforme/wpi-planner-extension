import React from 'react';
import './TutorialPage.css'; 
import Box from '../src/components/Box';
const TutorialPage = ({ onReturn }) => {
  return (
    <div className="tutorial-container">
      <h2 className="tutorial-title">Let's get started!</h2>
      <p className="tutorial-intro">Know how to make your way through</p>

      <div className="option-container">
      <Box className="tutorial-section">
        <h3 className="section-title">Welcome</h3>
        <p className="section-content"> Check out our <a href='https://better-wpi-planner.github.io/Rate-my-Planner-Site/index.html'  target="_blank">Website</a> for more information!</p>
      </Box>
      
      <br/>

      <Box className="tutorial-section">
        <h3 className="section-title">User Guide</h3>
        <p className="section-content">Our quick <a href='https://better-wpi-planner.github.io/Rate-my-Planner-Site/tuto.html' target="_blank">Start Guide</a> for first time users!</p>

      </Box>
      </div>
      <br/>

      {/* Return Button */}
      <button className="return-button" onClick={onReturn}>
        Main page
      </button>
    </div>
  );
};

export default TutorialPage;
