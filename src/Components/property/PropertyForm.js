import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Leaflet from './Leaflet';
import { Form, Select, Button ,Checkbox} from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './PropertyForm.css';

const PropertyForm = () => {
  const navigate = useNavigate();
  const [property, setProperty] = useState({
    name: '',
    typeId: 0,
    statusId: 0,
    agentId: 0,
    address: '',
    price: 0,
    nbOfBeds: 0,
    nbOfBathrooms: 0,
    nbOfParkings: 0,
    size: 0,
    isDreamHouse: false,
    description: '',
    longitude: 0,
    latitude: 0,
    userId: 0,
  });

  const [types, setTypes] = useState([]);
  const [status, setStatus] = useState([]);
  const [features, setFeatures] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [userName, setUserName] = useState('');
  const [userData, setUserData] = useState(null);
  const [markerAddress, setMarkerAddress] = useState(null);
  const [agentName, setAgentName] = useState('');
  const [agentId, setAgentId] = useState(null);








  const resetForm = () => {
    setProperty({
      name: '',
      typeId: 0,
      statusId: 0,
      agentId: 0,
      address: '',
      price: 0,
      nbOfBeds: 0,
      nbOfBathrooms: 0,
      nbOfParkings: 0,
      size: 0,
      isDreamHouse: false,
      description: '',
      longitude: 0,
      latitude: 0,
      userId: 0,
    });

    setTypes([]);
    setStatus([]);
    setAgentName('');
    setFeatures([]);
    setSelectedFeatures([]);
    setUserName('');
    setUserData(null);
    setMarkerAddress(null);
  
 
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const typesResponse = await axios.get('https://localhost:7088/api/TypeProperties');
        const statusResponse = await axios.get('https://localhost:7088/api/StatusProperty');
        const featuresResponse = await axios.get('https://localhost:7088/api/Features');
        
        // Fetch user info only if userName is not empty
        if (userName.trim() !== '') {
          const userResponse = await axios.get(`https://localhost:7088/api/User/userName/${userName}`);
          setUserData(userResponse.data);
        }
        // Fetch user info only if Agent is not empty
        if (agentName.trim() !== '') {
          const AgentResponse = await axios.get(`https://localhost:7088/api/Agents/GetAgentIdByName/${agentName}`);
          setAgentId(AgentResponse.data);
         

        
        }

        setTypes(typesResponse.data);
        setStatus(statusResponse.data);
      
        setFeatures(featuresResponse.data);
   
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userName,agentName]);

  const handleMapClick = async (e) => {
    const { lat, lng } = e.latlng;
    const address = property.address || (await getAddressFromCoordinates(lat, lng));

    setProperty((prevProperty) => ({
      ...prevProperty,
      latitude: lat,
      longitude: lng,
    }));
    setMarkerAddress(address);
  };

  const getAddressFromCoordinates = async (lat, lng) => {
    // Implement your logic to fetch address based on coordinates
    return `Address for (${lat}, ${lng})`;
  };

  const handleSubmit = async () => {
    try {
      const propertyData = {
        propertyId: 0,
        name: property.name,
        typeId: property.typeId,
        statusId: property.statusId,
        agentId: agentId,
        address: property.address,
        price: property.price,
        nbOfBeds: property.nbOfBeds,
        nbOfBathrooms: property.nbOfBathrooms,
        nbOfParkings: property.nbOfParkings,
        size: property.size,
        isDreamHouse: property.isDreamHouse,
        description: property.description,
        longitude: property.longitude,
        latitude: property.latitude,
        userId: userData ? userData.userId : 0,
      };

      
      const authToken = Cookies.get('authToken');
      console.log(authToken);

    // Check if the authToken is present before making the request
    if (!authToken) {
      console.error('Authentication token is missing.');
      return;
    }

  const response = await axios.post('https://localhost:7088/api/Properties', propertyData,{
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
      console.log('Property created successfully!', response.data);

      // Ensure that a property ID is provided and at least one feature is selected
      if (selectedFeatures.length === 0) {
        console.error('Invalid input. Please provide a property ID and select at least one feature.');
        return;
      }

      // Send a POST request to associate features with the property
      await axios.post(
        `https://localhost:7088/api/FeutureProperty/MultipleFeatures?PropertyId=${response.data.propertyId}`,
        
        selectedFeatures
      );
   

      console.log('Successfully associated features.');
      navigate(`/UploadImage/${response.data.propertyId}`);
      resetForm();
    } catch (error) {
      console.error('Error:', error);
    }

  };

  const handleCheckboxChange = (featureId) => {
    setSelectedFeatures((prevSelectedFeatures) => {
      if (prevSelectedFeatures.includes(featureId)) {
        return prevSelectedFeatures.filter((id) => id !== featureId);
      } else {
        return [...prevSelectedFeatures, featureId];
      }
    });
  
  };
  





  


  return (
    <Form className='formbox'>
        <h2>{agentId}</h2>
      <h2>Property addition</h2>

      <Form.Group widths='equal'>
         <Form.Input
        fluid
        label='OwnerName'
        placeholder='Enter OwnerName'
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        
      />

       <Form.Input
        fluid
        label='Agent'
        placeholder='Enter AgentName'
        value={agentName}
        onChange={(e) => setAgentName(e.target.value)}
        
        
      />
      </Form.Group>
     

      <Form.Group widths='equal'>
        <Form.Input
          fluid
          label='Property name'
          placeholder='Enter name'
          value={property.name}
          onChange={(e) => setProperty({ ...property, name: e.target.value })}
          
        />

      <Form.Input
        name='address'
        fluid
        label='Address'
        placeholder='133 Liverpool Street, Sydney, NSW'
        value={property.address}
        onChange={(e) =>  setProperty({ ...property, address: e.target.value })}
      />

        
        <Form.Field>
    <label>Property Type:</label>
    <select onChange={(e) => setProperty({ ...property, typeId: parseInt(e.target.value, 10) })}>
        <option value=''>Select Property Type</option>
        {types.map((type) => (
            <option key={type.typeId} value={type.typeId}>
                {type.typeName}
            </option>
        ))}
    </select>
</Form.Field>

      
      </Form.Group>

      <Form.Field>
    <label>Status:</label>
    <select  onChange={(e) => setProperty({ ...property, statusId: parseInt(e.target.value, 10) })}>
        <option value=''>Select Status</option>
        {status.map((status) => (
            <option key={status.statusId} value={status.statusId}>
                {status.statusName}
            </option>
        ))}
    </select>
</Form.Field>



     

      <Form.Group>
        <Form.Field>
          <label>Price:</label>
          <input
            type="number"
            value={property.price}
            onChange={(e) => setProperty({ ...property, price: parseInt(e.target.value, 10) })}
            
          />
        </Form.Field>

        <Form.Field>
          <label>Size:</label>
          <input
            type="number"
            value={property.size}
            onChange={(e) => setProperty({ ...property, size: parseInt(e.target.value, 10) })}
            
          />
        </Form.Field>
      </Form.Group>

      <Form.Group>
        <Form.Field>
          <label>Number of Beds:</label>
          <input
            type="number"
            value={property.nbOfBeds}
            onChange={(e) => setProperty({ ...property, nbOfBeds: parseInt(e.target.value, 10) })}
          />
        </Form.Field>

        <Form.Field>
          <label>Number of Bathrooms:</label>
          <input
            type="number"
            value={property.nbOfBathrooms}
            onChange={(e) => setProperty({ ...property, nbOfBathrooms: parseInt(e.target.value, 10) })}
          />
        </Form.Field>

        <Form.Field>
          <label>Number of Parkings:</label>
          <input
            type="number"
            value={property.nbOfParkings}
            onChange={(e) => setProperty({ ...property, nbOfParkings: parseInt(e.target.value, 10) })}
          />
        </Form.Field>
      </Form.Group>

      {/* Feature Selector component */}
    
      <div className='headingfeature'>
              <h2>Feature</h2>
            </div>
        <div  className='checkboxcontainer'>
          {features.map((feature) => (
            <Form.Checkbox
              key={feature.featureId}
              label={feature.featureName}
              value={feature.featureId}
              checked={selectedFeatures.includes(feature.featureId)}
              onChange={() => handleCheckboxChange(feature.featureId)}
             
            />
          ))}
        </div>
  
      {/* Feature Selector component */}
      <Form.Field >
      <label   style={{color: 'green' }} >Is Dream House:</label>
        <Form.Checkbox
          toggle
          checked={property.isDreamHouse}
          onChange={() => setProperty({ ...property, isDreamHouse: !property.isDreamHouse })}
          className='isDreambox'
        />
        
      </Form.Field>
      <Form.Field>
        <label>Description:</label>
        <Form.TextArea
          placeholder='Enter description'
          value={property.description}
          onChange={(e) => setProperty({ ...property, description: e.target.value })}
          className='descriptionTextarea'
          style={{ minHeight: '300px', width: '700px'  }} 
        />
      </Form.Field>

      {/* Material-UI Leaflet component for displaying the map */}
      <Leaflet 
      lat={property.latitude}
       long={property.longitude} 
       zoom={13} 
       handleMapClick={handleMapClick} 
       markerAddress={markerAddress} 
       status={status.find(s => s.statusId === property.statusId)?.statusName}
       className='mapcontainer'/>

    

    
      <Button type="button" onClick={handleSubmit}  className='btnprop'>
        Add Property and Features
      </Button>

   

    </Form>
  );
};

export default PropertyForm;
