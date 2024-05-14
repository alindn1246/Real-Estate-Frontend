import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ImageManager = () => {
  const { propertyId } = useParams();
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchImages(); // Fetch all images initially
  }, [propertyId]);

  const fetchImages = async () => {
    try {
      const apiUrl = `https://localhost:7088/api/ImageProperty/ByPropertiesId/${propertyId}`;
      const response = await axios.get(apiUrl);
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('imageFile', file);
      formData.append('propertyId', propertyId);

      await axios.post('https://localhost:7088/api/ImageProperty', formData);
      setMessage('Image uploaded successfully!');
      fetchImages(); // Refresh the image list for the specific propertyId after upload
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage('Error uploading image. Please try again.');
    }
  };

  const handleDelete = async (imageId) => {
    try {
      await axios.delete(`https://localhost:7088/api/ImageProperty/${imageId}`);
      setMessage('Image deleted successfully!');
      fetchImages(); // Refresh the image list for the specific propertyId after deletion
    } catch (error) {
      console.error('Error deleting image:', error);
      setMessage('Error deleting image. Please try again.');
    }
  };

  return (
    <div>
      <h1>Image Manager</h1>

      {/* Image Upload Form */}
      <form onSubmit={handleFormSubmit}>
        <label>
          Image File:
          <input type="file" onChange={handleFileChange} />
        </label>
        <br />
        <label>
          Property ID: {propertyId}
        </label>
        <br />
        <button type="submit">Upload</button>
      </form>

      <p>{message}</p>

      {/* Image List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
        {images.map((image) => (
          <div
            key={image.imageId}
            style={{ border: '1px solid #ccc', padding: '10px', maxWidth: '300px', boxSizing: 'border-box' }}
          >
            <img
              src={image.imageSrc}
              alt={image.imageName}
              style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', marginBottom: '8px' }}
            />
            <p>Image ID: {image.imageId}</p>
            <p>Image Name: {image.imageName}</p>
            <p>Property ID: {image.propertyId}</p>
            <button onClick={() => handleDelete(image.imageId)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageManager;
