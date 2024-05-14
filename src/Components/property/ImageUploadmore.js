import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import './ImageUploadmore.css'; 
import {  useParams } from 'react-router-dom';
 import PostAvailableDate from './PostAvailableDate';

const ImageUploadmore = () => {
  const { propertyID } = useParams();
  const [files, setFiles] = useState([]);
  const [propertyName, setPropertyName] = useState('');
  const [propertyId, setPropertyId] = useState('');
  const [message, setMessage] = useState('');
  const [previewImages, setPreviewImages] = useState([]);



  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
    setPreviewImages([...e.target.files].map(file => URL.createObjectURL(file)));
  };

  const handlePropertyNameChange = (e) => {
    setPropertyName(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
        const formData = new FormData();
        files.forEach((file, index) => {
            formData.append(`imageFiles`, file);
        });
        formData.append('propertyId', propertyID);

        await axios.post('https://localhost:7088/api/ImageProperty', formData);

        setMessage('Images uploaded successfully!');
        setPreviewImages([]);
        
        
    } catch (error) {
        console.error('Error uploading images:', error);
        setMessage('Error uploading images. Please try again.');
    }
  };

  return (
    <div className='containerPropertyPhase2'>
    <div className='containerImages'>
      <h2>Upload Images</h2>
      
      <form onSubmit={handleFormSubmit} >
        <label>
          Image Files:
          <input type="file" onChange={handleFileChange} multiple className="input" />
        </label>
      
        <button type="submit" className="button">Upload</button>
      </form>
      <p>{message}</p>
      {previewImages.length > 0 && (
        <Carousel className="carousel-container">
          {previewImages.map((image, index) => (
            <div key={index}>
              <img src={image} alt="preview" className="carousel-image" />
            </div>
          ))}
        </Carousel>
      )}
      
    
     
    </div>
    <PostAvailableDate propertyID={propertyID}/>
      
    </div>
  );
};

export default ImageUploadmore;
