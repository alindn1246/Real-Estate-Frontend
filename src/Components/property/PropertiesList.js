import React from 'react';
import { usePropertyContext } from './PropertyContext'; 
import PropertyCard2 from './PropertyCard2';
import NavigationBar from '../Navbar/NavigationBar';


const PropertiesList = () => {
  const { propid } = usePropertyContext(); 

  return (
    <div>
      <NavigationBar />
     
     <div className="property-grid">
        {propid && propid.length > 0 ? (
        propid.map((propertyId) => (
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

export default PropertiesList;
