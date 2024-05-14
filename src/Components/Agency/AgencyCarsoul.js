import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AgencyCarsoul.css'; // Import your CSS file

const AgencyCarsoul = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7088/api/ImageAgency');
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="carousel-containerAgent" data-animated>
      <ul className="carousel-list" id="list">
        {images.map((image, index) => (
          <li className="carousel-itemAgent" key={index}>
            <img className="carousel-imageAgency" src={image.imageSrc} alt={image.imageName} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgencyCarsoul;
