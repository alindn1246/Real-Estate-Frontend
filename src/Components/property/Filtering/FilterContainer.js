import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterBtn from './FilterBtn';
import RangePriceSlider from './RangePriceSlider';
import FeaturesCheckbox from './FeaturesCheckbox'; 
import { usePropertyContext } from '../PropertyContext'; 
import axios from 'axios';
import './FilterContainer.css';


const FilterContainer = () => {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState({
    nbofBedrooms: '0',
    nbofBathrooms: '0',
    nbofParkings: '0',
    minPrice: 100000,
    maxPrice: 5000000,
    featureIds: [],
  });

  const handleSearch = (address) => {
    // Do something with the address value in FilterContainer
    console.log('Address:', address);
  };

  const handlePropertyTypeChange = (propertyType) => {
    // Do something with the propertyType value in FilterContainer
    console.log('Property Type:', propertyType);
  };

  const [properties, setProperties] = useState([]);
  const { setPropertyIds } = usePropertyContext();

  const handleOptionChange = (name, option) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [name]: option,
    }));
  };

  const handlePriceChange = (minPrice, maxPrice) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      minPrice,
      maxPrice,
    }));
  };

  const handleFeaturesChange = (featureIds) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      featureIds,
    }));
  };

  const applyFilter = () => {
    const { minPrice, maxPrice, nbofBedrooms, nbofBathrooms, nbofParkings, featureIds } = selectedOptions;
    const featureQueryString = featureIds.length > 0 ? `&featureIds=${featureIds.join(',')}` : '';

    axios
      .get(
        `https://localhost:7088/api/Properties/Filter?minPrice=${minPrice}&maxPrice=${maxPrice}&numberOfBeds=${nbofBedrooms}&numberOfBathrooms=${nbofBathrooms}&numberOfParkings=${nbofParkings}${featureQueryString}`
      )
      .then((response) => {
        setProperties(response.data);
        setPropertyIds(response.data.map((property) => property.propertyId));
      })
      .catch((error) => console.error('Error:', error));
  };

  const navigateToPropertiesList = () => {
    navigate('/PropertiesList');
  };

  useEffect(() => {
    applyFilter();
  }, [selectedOptions]);

  return (
    <div className='FilterContainer'>
     
   <div className='bedrooms'>
  <span className='title-filtering'>Bedrooms</span>
  <FilterBtn name="nbofBedrooms" handleOptionChange={handleOptionChange} selectedOption={selectedOptions.nbofBedrooms} />
</div>
<div className='bathrooms'>
  <span className='title-filtering'>Bathrooms</span>
  <FilterBtn name="nbofBathrooms" handleOptionChange={handleOptionChange} selectedOption={selectedOptions.nbofBathrooms} />
</div>
<div className='parkings'>
  <span className='title-filtering'>Parkings</span>
  <FilterBtn name="nbofParkings" handleOptionChange={handleOptionChange} selectedOption={selectedOptions.nbofParkings} />
</div>
<div className='checkbox'>
  <span className='title-filtering'>CheckBox</span>
  <FeaturesCheckbox onFeaturesChange={handleFeaturesChange} />
</div>
<div className='range'>
  <span className='title-filtering'>Price Range</span>
  <RangePriceSlider onPriceChange={handlePriceChange} />
</div>

      <button  className='filter-btn'onClick={navigateToPropertiesList}>Apply Filters</button>

     
    </div>
  );
};

export default FilterContainer;
