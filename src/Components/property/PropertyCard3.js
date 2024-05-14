// PropertyCard.js

import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdOutlineBed } from "react-icons/md";
import { BiBath, BiArea } from "react-icons/bi";

import "./PropertyCard3.css"; // Import the CSS file
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import Cookies from 'js-cookie';
import Shortlist from "./Shortlist";


const PropertyCard3 = ({ propertyId }) => {


  const [properties, setProperty] = useState([])
  const[imageProperty,setimageProperty]= useState([]);



  


  useEffect(() => {
    const fetchPropertyById = async () => {
      try {
        const responseProperty = await axios.get(`https://localhost:7088/api/Properties/${propertyId}`);
        setProperty(responseProperty.data);
  
        const responseImageProperty= await axios.get(`https://localhost:7088/api/ImageProperty/ByPropertyId/${responseProperty.data.propertyId}`);
        setimageProperty(responseImageProperty.data);

    
        
        
       
      } catch (error) {
        console.error('Error fetching property  data:', error);
      }
    };
  
    fetchPropertyById();
  }, [propertyId]);

  
 


  

 



  const number=properties.price;
  const NumberFormatter = ({ number }) => {
 
    const numberString = number.toString();
  
    // Use a regular expression to add commas every three digits
    const formattedNumber = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
    return <span>{formattedNumber}</span>;
  };
  

 
  return (
  
    <div className="card3">
     
        <Carousel className="CarsouselPropertycard3" >
            
           
          
               {imageProperty.map((image) => (
         
         <img   key={image.imageId}  src={image.imageSrc} alt={image.imageName} className='image3' />
       
     ))}
            

        </Carousel>
     
        
     
      
      <div className="content-card3">
        <div className="price3">$<NumberFormatter number={parseInt(properties.price,10)}/></div>
        <Link to={`/property/${propertyId}`} className="titlelink">
          <h4 className="title3">{properties.name}</h4>
        </Link>
      
        <div className="address3">
          {`${properties.address} `}
        </div>
       
        <div className="features-card3">
          <span>
            <MdOutlineBed /> {properties.nbOfBeds} Beds
          </span>
          <span>
            <BiBath /> {properties.nbOfBathrooms} Bathrooms
          </span>
          <span>
        
            <BiArea /> {properties.size} sq.ft
            <span className="Typeproperty3">
          • {`${properties.typeName}`}
          </span>
          </span>
         
        </div>
      </div>
    </div>
  );
};

export default PropertyCard3;
