import React, { useState, useEffect } from 'react';
import { BiStar } from 'react-icons/bi';
import axios from 'axios';
import Cookies from 'js-cookie';
import PropertyCard2 from './PropertyCard2';
import NavigationBar from '../Navbar/NavigationBar';

const UsersShortlists = ({ userId }) => {
  const [propid, setPropid] = useState([]);

  useEffect(() => {
    const fetchShortlistedProperties = async () => {
      try {
        const response = await axios.get(`https://localhost:7088/api/ShortList/GetAllByUserId/${userId}`);
        setPropid(response.data);
      } catch (error) {
        console.error('Error fetching shortlisted properties:', error);
      }
    };

    fetchShortlistedProperties();
  }, []); 

  return (
    <>
      <NavigationBar />
      <div className='titleHeading'>
     <h1 style={{marginLeft: '20px'  }}> Shortlist</h1>
     </div>
      <div style={{ display: 'grid' }}>
        {propid && propid.length > 0 ? (
          propid.map((shortlistItem) => (
            <PropertyCard2 key={shortlistItem.propertyId} propertyId={shortlistItem.propertyId} />
          ))
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
            <div className='ErrorProperty'>
              <img src='https://s.domainstatic.com.au/fe-server-search-listings/master-5807/_next/static/media/no-listings.dbeddfc5.png' />
              <p>No Properties Found</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UsersShortlists;
