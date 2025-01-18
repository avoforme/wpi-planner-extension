import React from 'react';
import './styles/Popover.css'; // Optional: for styling

const ProfessorPopover = () => {
  const data = {
    quality: 2.9,
    ratings: 170,
    name: "Glynis Hamel",
    department: "Computer Science",
    wouldTakeAgain: 36,
    difficulty: 3.5,
  };

  return (
    <div className="popover">
      <h3>{data.name}</h3>
      <p><strong>Department:</strong> {data.department}</p>
      <div className="popover-stats">
        <div>
        <p style={{ fontWeight: 'bold' }}>Quality:</p>
        <p>{data.quality}</p>
        </div>
        <div>
        <p style={{ fontWeight: 'bold' }}>Ratings:</p>
        <p>{data.ratings}</p>
        </div>
        <div>
        <p style={{ fontWeight: 'bold' }}>Woukd take again:</p>
        <p>{data.wouldTakeAgain}%</p>
        </div>
        <div>
        <p style={{ fontWeight: 'bold' }}>Difficulty: </p>
        <p>{data.difficulty}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfessorPopover;
