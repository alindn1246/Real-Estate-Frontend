import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel';

import 'react-alice-carousel/lib/alice-carousel.css';
import PropertyCard3 from './Components/property/PropertyCard3';

const CardSwiper = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7088/api/Properties/GetByIsDreamHouse/true');
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  const items = properties.map(property => (
    <div key={property.propertyId}>
      <PropertyCard3 propertyId={property.propertyId} />
    </div>
  ));

  return (
    <div className='prop-slider'>
      <AliceCarousel mouseTracking items={items} responsive={{0: {items: 1}, 370: {items: 2}, 998: {items: 3}}} />
    </div>
  );
};

export default CardSwiper;
