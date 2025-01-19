import { useState } from 'react';
import './App.css';
import Box from './components/Box';
import TutorialPage from '../pages/TutorialPage';

function App() {
  const [showTutorial, setShowTutorial] = useState(false);

  return showTutorial ? (
    <TutorialPage onReturn={() => setShowTutorial(false)} />
  ) : (
    <>
      <img src="../public/logo.png" />
      <h2>Rate My Planner</h2>

      <div className="option-container">
        <Box>
          <p>This project is made to expand upon WPI Planner. Having to jump between multiple sites to see course and instructor information can be time consuming, and we hope to improve that by making the information available right in WPI Planner.</p>
        </Box>
      </div>
      <br />
      <button onClick={() => setShowTutorial(true)}>Show Tutorial</button>
    </>
  );
}

export default App;
