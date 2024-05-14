// PropertyCard.js

import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdOutlineBed } from "react-icons/md";
import { BiBath, BiArea } from "react-icons/bi";
import propertydata from "./Propertydata";
import "./PropertyCard 2.css"; // Import the CSS file
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import Cookies from 'js-cookie';
import Shortlist from "./Shortlist";
import { IoTrashBinOutline } from "react-icons/io5";
import { Button } from "react-bootstrap";


const PropertyCard2 = ({ propertyId}) => {
  const property = propertydata.find((prop) => prop.p_id === propertyId);

  const [properties, setProperty] = useState([])
  const [agent, setAgent] = useState([])
  const [imageAgency, setimageAgency] = useState([]);
  const [imageAgent, setimageAgent] = useState([]);
  const[imageProperty,setimageProperty]= useState([]);
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState([]);

  
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

  useEffect(() => {
    const fetchPropertyById = async () => {
      try {
        const responseProperty = await axios.get(`https://localhost:7088/api/Properties/${propertyId}`);
        setProperty(responseProperty.data);
  
        
        const responseAgent = await axios.get(`https://localhost:7088/api/Agents/${responseProperty.data.agentId}`);
        setAgent(responseAgent.data);

        const responseImageProperty= await axios.get(`https://localhost:7088/api/ImageProperty/ByPropertyId/${responseProperty.data.propertyId}`);
        setimageProperty(responseImageProperty.data);

       
        const responseImageAgency = await axios.get(`https://localhost:7088/api/ImageAgency/ByAgencyId/${responseAgent.data.agencyId}`);
        setimageAgency(responseImageAgency.data);
        
        const responseImageAgent = await axios.get(`https://localhost:7088/api/ImageAgent/ByAgentId/${responseAgent.data.agentId}`);
        setimageAgent(responseImageAgent.data);
        
        
       
      } catch (error) {
        console.error('Error fetching property and agent data:', error);
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
  
  if (!propertyId) {
    return <div>Property not found</div>;
  }
  
  return (
  
    <div className="card" >
     
        <Carousel className="CarsouselPropertycard" >
            
           
          
               {imageProperty.map((image) => (
         
         <img   key={image.imageId}  src={image.imageSrc} alt={image.imageName} className='image' />
       
     ))}
            

        </Carousel>
     
      <div className="banner">
     
      <div >
          {imageAgent.map((image) => (
         
            <img   key={image.imageId}  src={image.imageSrc} alt={image.imageName} className="AvatarAgent" />
          
        ))}

        
  

</div>

          <div className="NamesContainer">
            <h6 className="AgentName">
                {agent.agentName}<br/>
               <span className="AgencyName" >{agent.agencyName} </span>
            </h6>
          </div>
          <div className="logocontainer">
          {imageAgency.map((image) => (
         
            <img  key={image.imageId}  src={image.imageSrc} alt={image.imageName} className="AgencyLogo" />
          
        ))}
</div>

        
      </div>
     
      
      <div className="contents">
        <div>
        <Shortlist propertyId={propertyId} userId={userData.userId}  />
       
        </div>
        <div className="price">$<NumberFormatter number={parseInt(properties.price,10)}/></div>
        <Link to={`/property/${propertyId}`} className="titlelink">
          <h4 className="title">{properties.name}</h4>
        </Link>
      
        <div className="address">
          {`${properties.address} `}
        </div>
       
        <div className="features">
          <span>
            <MdOutlineBed /> {properties.nbOfBeds} Beds
          </span>
          <span>
            <BiBath /> {properties.nbOfBathrooms} Bathrooms
          </span>
          <span>
        
            <BiArea /> {properties.size} sq.ft
            <span className="Typeproperty">
          • {`${properties.typeName}`}
          </span>
          </span>
         
        </div>
      </div>
    </div>
  );
};

export default PropertyCard2;
