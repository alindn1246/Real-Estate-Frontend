import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PropertyCard2 from './PropertyCard2';
import NavigationBar from '../Navbar/NavigationBar';
import FilterContainer from './Filtering/FilterContainer';

const PropertiesListByType = () => {
  const { type } = useParams();
  const [propid, setPropid] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;

        if (type === 'Buy' || type === 'Rent') {
          response = await axios.get(
            `https://localhost:7088/api/Properties/Filter?statusName=${type}`
          );
        } else {
          response = await axios.get(
            `https://localhost:7088/api/Properties/Filter?typeName=${type}`
          );
        }

        // Assuming response.data contains an array of property objects
        const propertyIds = response.data.map(property => property.propertyId);
        setPropid(propertyIds);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [type]);

  return (
    <div>
      <NavigationBar />
      <div className='titleHeading'>
      {type === 'Buy' || type === 'Rent' ? (
        <h1 style={{ marginLeft: '20px' }}>{`${type} Property!🏘`}</h1>
      ) : (
        <h2>See Best Apartments</h2>
      )}
    </div>
    <div  className="property-grid">
       {propid && propid.length > 0 ? (
        propid.map((propertyId) => (
          <PropertyCard2 key={propertyId} propertyId={propertyId} />
        ))
      ) : (
        <div className='ErrorProperty' > 
        <img src='https://s.domainstatic.com.au/fe-server-search-listings/master-5807/_next/static/media/no-listings.dbeddfc5.png' />
        <p>No Properties Found</p>
       </div>
      )}
    </div>
   
     
    </div>
  );
};

export default PropertiesListByType;
