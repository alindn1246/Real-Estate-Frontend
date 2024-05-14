import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Leaflet from './Leaflet';
import { Form, Select, Button ,Checkbox} from 'semantic-ui-react';
import { useParams,useNavigate } from 'react-router-dom';

import FeatureCheckboxList from './FeatureCheckboxList';
import Cookies from 'js-cookie';


const Editproperty = () => {
  const navigate = useNavigate();
  const { propertyId } = useParams();
  const [property, setProperty] = useState({
    propertyId: 1,
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
    description: '',
     userId: 0,
    isDreamHouse: false,
    longitude: 0,
    latitude: 0,
   
   
   
   

  });
   const [agent, setAgent] = useState({
    agentId:0,
    agentName:'',
    userId:0,
    agencyId:0,
  });
  const [user, setUser] = useState({
    userId: 0,
    userName: '',
    email: '',
    roles: ["User"]
  });

  const [types, setTypes] = useState([]);
  const [status, setStatus] = useState([]);
  
  
  const [UserId, setUserId] = useState(null);

  const [markerAddress, setMarkerAddress] = useState(null);
 


  useEffect(() => {
    const fetchPropertyById = async () => {
      try {
        const response = await axios.get(`https://localhost:7088/api/Properties/${propertyId}`);
        setProperty(response.data);
        const Agentresponse = await axios.get(`https://localhost:7088/api/Properties/${propertyId}`);
        setAgent(Agentresponse.data);
        
        const userresponse = await axios.get(`https://localhost:7088/api/Properties/${propertyId}`);
        setUser(userresponse.data);
       
    
      } catch (error) {
        console.error('Error fetching property by ID:', error);
      }
    };

    fetchPropertyById();
  }, [propertyId]);

const ali= user.userName;


  useEffect(() => {
    const fetchData = async () => {
      try {
    
       
        const typesResponse = await axios.get('https://localhost:7088/api/TypeProperties');
        const statusResponse = await axios.get('https://localhost:7088/api/StatusProperty');
  
        setTypes(typesResponse.data);
        setStatus(statusResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

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

      const userResponse = await axios.get(`https://localhost:7088/api/User/userName/${ali}`);
      setUser(userResponse.data);
      console.log(user.userId);
      console.log(agent.agentId);
      setUserId(user.userId);

  
      const propertyData = {
        propertyId: property.propertyId,
        name: property.name,
        typeId: property.typeId,
        statusId: property.statusId,
        agentId: agent.agentId,
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
        userId: userResponse.data.userId,
      };

      
     
      const response = await axios.put(`https://localhost:7088/api/Properties/${property.propertyId}`, propertyData);

      console.log('Property updated successfully!', response.data);

    
    } catch (error) {
      console.error('Error:', error);
    }

  };



  return (
    <Form className='formbox'>
      <h2>Property Edtion</h2>

      <Form.Group widths='equal'>
         <Form.Input
        fluid
        label='OwnerName'
        placeholder='Enter OwnerName'
        value={user.userName}
        onChange={(e) => setUser({...user,userName:e.target.value} )}
        
      />

       <Form.Input
        fluid
        label='Agent'
        placeholder='Enter AgentName'
        value={agent.agentName}
        onChange={(e) => setAgent({...agent,agentName:e.target.value})}
        
        
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
              fluid
              label='Address'
              placeholder='133 Liverpool Street, Sydney, NSW'
              value={property.address}
              onChange={(e) =>  setProperty({ ...property, address: e.target.value })}
                
              
            />

        <Form.Select
          fluid
          label='Property Type'
          value={property.typeId}
          options={types.map((type) => ({ key: type.typeId, text: type.typeName, value: type.typeId }))}
          onChange={(e, { value }) => setProperty({ ...property, typeId: parseInt(value, 10) })}
          placeholder='Select property Type'
          
          
        />
      </Form.Group>

      <Form.Field>
        <label>Status:</label>
        <Form.Select
       
          placeholder='Select Status'
          value={property.statusId}
          options={status.map((status) => ({ key: status.statusId, text: status.statusName, value: status.statusId }))}
          onChange={(e, { value }) => setProperty({ ...property, statusId: parseInt(value, 10) })}
          text={status.find((s) => s.statusId === property.statusId)?.statusName || 'Select Ali'}
          
        />
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
      <FeatureCheckboxList  propertyId={propertyId}/>
 

      {/* Feature Selector component */}

      <Leaflet
            lat={property.latitude}
            long={property.longitude}
            zoom={13}
            handleMapClick={handleMapClick}
            markerAddress={`Property ID: ${property.propertyId}`}
          />

      <Form.Field>
        <label>Is Dream House:</label>
        <Form.Checkbox
          toggle
          checked={property.isDreamHouse}
          onChange={() => setProperty({ ...property, isDreamHouse: !property.isDreamHouse })}
        />
      </Form.Field>
      <Form.Field>
        <label>Description:</label>
        <Form.TextArea
          placeholder='Enter description'
          value={property.description}
          onChange={(e) => setProperty({ ...property, description: e.target.value })}
        />
      </Form.Field>

    
      <Button type="button" onClick={handleSubmit}>
       Update Property
      </Button>

      <Button type="button" onClick={() => navigate(`/ImageManager/${propertyId}`)}>
  Go to Image Manager
</Button>


     

    </Form>
  );
};

export default Editproperty;
