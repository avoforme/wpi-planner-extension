import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Checkbox from './components/Checkbox'

function App() {
  const [count, setCount] = useState(0);
  return (
    <>

      <h2>
        WPI Planner + Oscar 
      </h2>

      <div className='option-container'>
        <Checkbox>
          <p>Display professor rating</p>
        </Checkbox>
        <Checkbox>
          <p>Display course and professor rating</p>
        </Checkbox>
      </div>
    </>
  )
}

export default App
