import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import { BiCalendar } from "react-icons/bi";

import Modal from 'react-bootstrap/Modal';
import InspectionModal from './IncpectionModal';
import Cookies from 'js-cookie';
import './PropertyImage.css';
import Button from 'react-bootstrap/esm/Button';
import Shortlist from './Shortlist';

const PropertyImage = ({ propertyimageId, userID }) => {
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState([]);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true); 
  const handleCloseModal = () => setShowModal(false); 

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`https://localhost:7088/api/ImageProperty/ByPropertyId/${propertyimageId}`);
        setImages(response.data);

      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [propertyimageId]);

///////////////////////////////////////////////
  useEffect(() => {
    const savedToken = Cookies.get('authToken');
    const savedUserData = Cookies.get('userData');

    if (savedToken) {
      setToken(savedToken);
    }

    if (savedUserData) { 
      setUserData(JSON.parse(savedUserData));
    }
 
  }, []);
  ///////////////////////////////////////////
 

  return (
    <Carousel fade className='ImagePropertycontainer'>
      {images.map((image) => (
        <Carousel.Item key={image.imageId}>
          <img
            className="d-block w-100 imagecarsoulproperty"
            src={image.imageSrc}
            alt={image.imageName}
          />
          <div className='btnBox'>
           
            <InspectionModal propertyId={propertyimageId}  userData={userData}/>
          </div>
          <div className='starcontainer'>
           
          <Shortlist propertyId={propertyimageId} userId={userData.userId}  />

            </div>
          <Carousel.Caption> </Carousel.Caption>
        </Carousel.Item>
      ))}
       
    </Carousel>
  );
};

export default PropertyImage;
