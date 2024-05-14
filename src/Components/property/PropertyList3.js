import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import './PropertyList3.css';
import PropertyCard3 from './PropertyCard3';

const PropertyList3 = () => {
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

  const items = properties.map((property) => (
    <div key={property.propertyId}>
      <PropertyCard3 propertyId={property.propertyId} />
    </div>
  ));

  const responsive = {
    0: { items: 1 },
    500: { items: 2 },
    998: { items: 3 },
  };

  const containerStyles = {
    position: 'relative',
  };

  const buttonStyles = {
    borderRadius: '50%',
    width:'40px',
    hieght:'20px',
    padding: '10px',
    border:'1px '
   
  };

  const smallIconStyles = {
    fontSize: '14px', // Adjust the size of the icons
  };

  const leftButtonStyles = {
    ...buttonStyles,
    ...smallIconStyles,
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
  };

  const rightButtonStyles = {
    ...buttonStyles,
    ...smallIconStyles,
    position: 'absolute',
    right: 0,
    
    top: '50%',
    transform: 'translateY(-50%)',
  };

  return (
    <div className='prop-slider' style={containerStyles}>
      <AliceCarousel
        mouseTracking
        items={items}
        responsive={responsive}
        controlsStrategy='responsive'
        buttonsDisabled={false}
        renderPrevButton={({ isDisabled, onClick }) => (
          <button
            style={leftButtonStyles}
            disabled={isDisabled}
            onClick={onClick}
          >
            <VscChevronLeft />
          </button>
        )}
        renderNextButton={({ isDisabled, onClick }) => (
          <button
            style={rightButtonStyles}
            disabled={isDisabled}
            onClick={onClick}
          >
            <VscChevronRight />
          </button>
        )}
      />
    </div>
  );
};

export default PropertyList3;
