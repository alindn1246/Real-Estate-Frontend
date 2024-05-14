import React, { useState, useEffect } from 'react';
import SearchBox from '../Header/SearchBox';
import PropertiesList from './PropertiesList';


const GetPropertyids = () => {
  const [selectedPropertyIds, setSelectedPropertyIds] = useState('');
  const [adressProperty, setAdressProperty] = useState('');

  const handleSearch = (addressProperty, selectedPropertyType) => {
  setAdressProperty(addressProperty);
  setSelectedPropertyIds(selectedPropertyType);
  console.log(addressProperty);
    console.log(selectedPropertyType);
  };

 
  
  return (
    <div>
       <SearchBox  onSearch={handleSearch} />
       <button onClick={handleSearch}>

       </button>
    </div>
  );
};

export default GetPropertyids;


