import React, { useState, useEffect } from 'react';
import { useUser } from './UserContext';
import NavigationBar from '../Navbar/NavigationBar';
import PropertyCard2 from './PropertyCard2';  
import  HomeImg from '../Images/HomeGuide.png'



const MyProperty = () => {
  const { userData } = useUser();
  const userId = userData?.userId;
  const [propIds, setPropIds] = useState([]);

  useEffect(() => {
    const fetchPropertiesByUserId = async () => {
      try {
        const response = await fetch(`https://localhost:7088/api/Properties/GetPropertiesByUserId/${userId}`);
        const data = await response.json();
        setPropIds(data.map(property => property.propertyId));
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    if (userId) {
      fetchPropertiesByUserId();
    }
  }, [userId]);

  return (
    <div>
      <NavigationBar />
      <h3 style={{marginLeft:'10%' ,fontWeight:'bold'}}>Hello, {userData.userName}!
      <img src={HomeImg} style={{width:'120px',height:'90px',position:'absolute' ,top:'99px', left:'8px' }}/></h3>
      
      <div className="property-grid">
        {propIds && propIds.length > 0 ? (
          propIds.map((propertyId) => (
            <PropertyCard2 key={propertyId} propertyId={propertyId} />
          ))
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' , marginLeft:'100%' }}>
          <div className='ErrorProperty'>
            <img src='https://s.domainstatic.com.au/fe-server-search-listings/master-5807/_next/static/media/no-listings.dbeddfc5.png' />
            <p>No Properties Found</p>
          </div>
        </div>
          
        
        )}
      </div>
    
    </div>
  );
};

export default MyProperty;
