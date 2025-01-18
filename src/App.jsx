import { useState } from 'react';
import './App.css';
import Checkbox from './components/Checkbox';
import TutorialPage from '../pages/TutorialPage';

function App() {
  const [showTutorial, setShowTutorial] = useState(false);

  return showTutorial ? (
    <TutorialPage onReturn={() => setShowTutorial(false)} />
  ) : (
    <>
      <h2>WPI Planner + Oscar</h2>

      <div className="option-container">
        <Checkbox>
          <p>Display professor rating</p>
        </Checkbox>
        <Checkbox>
          <p>Display course and professor rating</p>
        </Checkbox>
      </div>
      <br />
      <button onClick={() => setShowTutorial(true)}>Show Tutorial</button>
    </>
  );
}

export default App;
