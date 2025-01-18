import { useState } from 'react'
import './styles/Box.css'
const Box = (props) => {
  return (
    <div className="checkbox-container">
        {props.children}

    </div>
  )

};

export default Box;