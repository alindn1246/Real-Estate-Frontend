import React, { useState } from 'react';
import './BtnPropertyType.css';

const BtnPropertyType = ({ OptionChange }) => {
  const [selectedOption, setSelectedOption] = useState('');


  const handleOptionChange = (option) => {
    setSelectedOption(option);
    OptionChange(option); 
    console.log(option);
  };

  return (
    <div className="PropertyType">
      <div className="PropertyType-container">

        <label className="PropertyType-label">
          <input
            type="radio"
            name="radio"
            value="Buy" // Change value to "Buy"
            checked={selectedOption === 'Buy'}
            onChange={() => handleOptionChange('Buy')}
          />
          <span className="PropertyType-span">Buy</span>
        </label>

        <label className="PropertyType-label">
          <input
            type="radio"
            name="radio"
            value="Rent"
            checked={selectedOption === 'Rent'}
            onChange={() => handleOptionChange('Rent')}
          />
          <span className="PropertyType-span">Rent</span>
        </label>

        <label className="PropertyType-label">
          <input
            type="radio"
            name="radio"
            value="HouseLand" // Change value to "Land"
            checked={selectedOption === 'HouseLand'}
            onChange={() => handleOptionChange('HouseLand')}
          />
          <span className="PropertyType-span"> House & Land</span>
        </label>
        <label className="PropertyType-label">
          <input
            type="radio"
            name="radio"
            value="NewHomes" // Change value to "Land"
            checked={selectedOption === 'Apartment'}
            onChange={() => handleOptionChange('Apartment')}
          />
          <span className="PropertyType-span">Apartment</span>
        </label>

        <label className="PropertyType-label">
          <input
            type="radio"
            name="radio"
            value="Rural" // Change value to "Land"
            checked={selectedOption === 'Rural'}
            onChange={() => handleOptionChange('Rural')}
          />
          <span className="PropertyType-span">Rural</span>
        </label>

      </div>
    </div>
  );
}

export default BtnPropertyType;
