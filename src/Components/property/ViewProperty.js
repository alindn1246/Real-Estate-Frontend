import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { MdOutlineBed } from "react-icons/md";
import { BiBath, BiArea } from "react-icons/bi";
import { FaEnvelope } from 'react-icons/fa';
import { BsCalculator } from "react-icons/bs";

import InspectionModal from "./IncpectionModal";
import './ViewProperty.css';
import axios from 'axios';
import Leaflet from './Leaflet';
import './Leaflet.css';
import PropertyImage from "./PropertyImage";
import { NavLink } from 'react-router-dom';
import NavigationBar from "../Navbar/NavigationBar";
import { Container, Row, Col, Button } from 'react-bootstrap';



const ViewProperty = () => {

 
  const [property, setProperty] = useState([]);
  const [imageAgency, setimageAgency] = useState([]);
  const [imageAgent, setimageAgent] = useState([]);
  const [agent, setAgent] = useState([])
  const [features, setFeatures] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [showMore, setShowMore] = useState(false);
  

  const displayedFeatures = showAll ? features : features.slice(0, 4);
  
  const { propertyId } = useParams();
 const number=property.price;
  const NumberFormatter = ({ number }) => {
 
    const numberString = number.toString();
  
    
    const formattedNumber = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
    return <span>{formattedNumber}</span>;
  };
  useEffect(() => {
    const fetchPropertyById = async () => {
      try {
        const response = await axios.get(`https://localhost:7088/api/Properties/${propertyId}`);
        setProperty(response.data);

        const responseAgent = await axios.get(`https://localhost:7088/api/Agents/${response.data.agentId}`);
        setAgent(responseAgent.data);

        const responseImageAgency = await axios.get(`https://localhost:7088/api/ImageAgency/ByAgencyId/${responseAgent.data.agencyId}`);
        setimageAgency(responseImageAgency.data);

        const responseImageAgent = await axios.get(`https://localhost:7088/api/ImageAgent/ByAgentId/${response.data.agentId}`);
        setimageAgent(responseImageAgent.data);

        const responseFetures = await axios.get(`https://localhost:7088/api/FeutureProperty/GetByPropertyId/${propertyId}`);
        setFeatures(responseFetures.data);

      
      } catch (error) {
        console.error('Error fetching property by ID:', error);
      }
    };

    fetchPropertyById();
  }, [propertyId]);

  const emailLink = `mailto:${agent.useremail}`;
  const description = property.description ? property.description.split('\n') : [''];
 
  return (
    
    <>
     <NavigationBar/>
      <div  className='propertyImagesliders'>
         <PropertyImage propertyimageId={propertyId}  userID={property.userId}/>
        
      </div>
      <div>
        

       <div className="boxinfo">
          {/* Agent div*/}
      <div className="AgentInfo"  >
     
      <div >
          {imageAgent.map((image) => (
         
            <img   key={image.imageId}  src={image.imageSrc} alt={image.imageName} className="picAgent" />
          
        ))}
      </div>
       
      <div className="Names">
            <h6 className="Agentname">
                {agent.agentName}<br/>
               <span className="Agencyname" >{agent.agencyName} </span>
            </h6>
          </div>

          <div className="logoscontainer">
          {imageAgency.map((image) => (
         
            <img  key={image.imageId}  src={image.imageSrc} alt={image.imageName} className="Agencylogo" />
          
        ))}
</div>
   
   <div className="emailAgentcontainer">
   <button className="emailAgentbox" onClick={() => window.location.href = emailLink}>
      <FaEnvelope className='iconEmail' />
      <span className="emAgent">{agent.useremail}</span>
    </button>
   </div>
        
      </div>
      {/* Agent div*/}


      {/* propertydetailes div*/}
      <div className="PropertyInfo">
     
     <h2 className="titles">{property.name}</h2>
     <div className="priceproperty">$<NumberFormatter number={parseInt(property.price,10)}/></div>
      <span>{property.address}</span>

      <div className="feature">
          <span>
            <MdOutlineBed /> {property.nbOfBeds} Beds
          </span>
          <span>
            <BiBath /> {property.nbOfBathrooms} Bathrooms
          </span>
          <span>
        
            <BiArea /> {property.size} sq.ft
            <span className="Typeproperty">
          • {`${property.typeName}`}
          </span>
          </span>
         
        </div>

        <hr /> 
        
        <Container className="navigationproperty">
      <Row className="align-items-center">
        <Col xs={12} lg={6}>
          <NavLink to="/home" className="active d-flex align-items-center">
          <svg className="piggyBank" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
<path d="M13.9378 13.6982C13.9378 14.8999 13.1573 15.743 11.8997 16.0115V17.2344H10.0999V16.0107C9.52759 15.8905 9.04725 15.662 8.70295 15.3125C8.25324 14.8555 8.03205 14.2256 8.04475 13.4404L8.0467 13.3428H9.66926L9.66828 13.4434C9.66389 13.8379 9.76496 14.1426 9.96857 14.3486C10.1956 14.5772 10.5569 14.6943 11.0423 14.6943C12.1824 14.6943 12.3143 14.2363 12.3143 13.8926C12.3143 13.3037 11.9158 13.1562 10.6551 12.7803C9.42316 12.4336 8.21857 11.9717 8.21857 10.5137C8.21857 9.62915 8.73468 8.62732 10.0999 8.34106V7H11.8997V8.37537C12.9123 8.63306 13.7652 9.32984 13.7737 10.6973L13.7742 10.7979H12.1561L12.1507 10.7041C12.1097 9.98829 11.6937 9.64063 10.8787 9.64063C10.4954 9.64063 9.85236 9.73438 9.85236 10.3604C9.85236 10.8301 10.0628 10.9629 11.5848 11.4531C12.9173 11.8672 13.9378 12.2959 13.9378 13.6982ZM23.8558 13.3418C23.9324 14.6846 23.0428 15.9228 21.7405 16.2871L20.6214 16.5996C20.1497 17.376 19.554 18.0781 18.8475 18.6904C18.6956 18.8223 18.5037 19.0371 18.4451 19.3213L17.4876 23.9717H12.1009V20.8975H9.8968V23.9717H4.51007L3.5545 19.3311C3.49639 19.0488 3.30401 18.832 3.15313 18.7012C1.03693 16.8594 -0.0734244 14.1973 0.108706 11.3984C0.411436 6.73438 4.43781 3.08105 9.27521 3.08105H13.0008C13.1175 3.08105 13.2322 3.08886 13.3465 3.09863C14.7508 1.80273 16.6385 1.17285 16.7244 1.14453L17.9046 0.757812V4.57715C19.6111 5.70606 20.8734 7.36328 21.4857 9.29297C21.6341 9.76172 22.0965 10.0879 22.6097 10.0879H23.2274L23.4495 10.665C23.4988 10.793 23.7513 11.5264 23.8558 13.3418ZM22.0589 13.4453C22.0145 12.6768 21.9422 12.1436 21.8802 11.8008C20.8909 11.5576 20.0848 10.8291 19.7698 9.83789C19.241 8.16894 18.098 6.75488 16.5521 5.85449L16.1048 5.59472V3.37207C15.5281 3.67285 14.8499 4.10059 14.3343 4.65234L14.0355 4.97168L13.3655 4.91016C13.2449 4.89649 13.1248 4.88184 13.0008 4.88184H9.2752C5.3836 4.88184 2.14629 7.79493 1.90459 11.5156C1.75957 13.749 2.6458 15.8731 4.33525 17.3438C4.85185 17.794 5.19121 18.3555 5.31718 18.9678L5.97685 22.1709H8.09697V19.0967H13.9007V22.1709H16.0208L16.6824 18.958C16.8089 18.3418 17.1502 17.7793 17.6687 17.3301C18.3133 16.7715 18.8411 16.1211 19.2371 15.3994L19.4187 15.0674L21.2557 14.5537C21.7503 14.415 22.0877 13.9492 22.0589 13.4453Z" fill="currentColor"></path>
</svg> Can I afford this property?
          </NavLink>
        </Col>
        <Col xs={12} lg={6} >
          <NavLink to="/about" className="active d-flex align-items-center">
            <BsCalculator className="calculator-icon" /> Home Loan Repayment Calculator
          </NavLink>
        </Col>
      </Row>
      <Row>
        <Col xs={12} lg={6}>
          <NavLink to="/contact" className="active d-flex align-items-center">
            <BsCalculator className="calculator-icon" /> Stamp Duty Calculator
          </NavLink>
        </Col>
      </Row>
   
    </Container>
    <hr/> 
    <Container className="navigationproperty">
      <h2 className="titles">Property Features</h2>
      <Row>
        {displayedFeatures.map((feature, index) => (
          <Col xs={12} md={6} key={feature.id}>
            {feature.featureName} 
          </Col>
        ))}
      </Row>
      <Button variant="link" onClick={() => setShowAll(!showAll)}>
        {showAll ? 'View less' : 'View all features'}
      </Button>
    </Container>
    <hr/> 
 
    <Container className="property-description-container">
      <h2 className="titles">Property Description</h2>
      <div className={showMore ? 'text' : 'text clamp'}>
        <strong>{description[0]}</strong><br />
        {description.slice(1).map((line, index) => <React.Fragment key={index}>{line}<br /></React.Fragment>)}
      </div>
      {!showMore && <div className=".fade-line{"></div>}
      <button className="btnreadmore" onClick={() => setShowMore(!showMore)}>
        {showMore ? 'Read Less' : 'Read More'}
      </button>

      <div className="titleMap">
         <h4 className="titles" > View Property on map</h4 >
      </div>
     
      <Leaflet
      
      
   lat={property.latitude || 0}  // Replace 0 with a default value if needed
   long={property.longitude || 0}  // Replace 0 with a default value if needed
   zoom={13}
   markerAddress={` ${property.address}`}
   isVisible={1}
   className='mapme'
/>

     
    </Container>

   
      </div>
      
     
      </div>
       </div>
        
       
     
      
       
   
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
     
    </>
  );
};

export default ViewProperty;
