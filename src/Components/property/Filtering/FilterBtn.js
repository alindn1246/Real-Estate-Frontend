import React, {  useState } from 'react';
import './FilterBtn.css';

const FilterBtn = ({name, handleOptionChange, selectedOption}) => {
  return (
    <div className={`FilterBtn ${name}`}>
      <div className="FilterBtn-container">
        
        {['Any', '1', '2', '3', '4', '5+'].map((value, index) => (
          <label key={index} className="FilterBtn-label">
            <input
              type="radio"
              name={name}
              value={index.toString()}
              checked={selectedOption === index.toString()}
              onChange={() => handleOptionChange(name, index.toString())}
            />
            <span className="FilterBtn-span">{value}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default FilterBtn;