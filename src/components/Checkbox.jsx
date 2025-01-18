import { useState } from 'react'
import './styles/Checkbox.css'
const Checkbox = (props) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div className="checkbox-container">
        {props.children}
      <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />

    </div>
  )

};

export default Checkbox;