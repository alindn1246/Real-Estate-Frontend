import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Imageme = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`https://localhost:7088/api/ImageAgency/ByAgencyId/${1}`);
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h2>Image List</h2>
      <ul>
        {images.map((image) => (
          <li key={image.imageId}>
            <p>Image ID: {image.imageId}</p>
            <p>Image Name: {image.imageName}</p>
            <p>Image Source: {image.imageSrc}</p>
            <p>Property ID: {image.propertyId}</p>
            <img src={image.imageSrc} alt={image.imageName} style={{ maxWidth: '200px', maxHeight: '200px' }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Imageme;
