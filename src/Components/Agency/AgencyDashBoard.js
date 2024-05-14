import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import NavBarAgency from './NavBarAgency';
 import AgencyRegister from './AgencyRegister';
const AgencyDashBoard = () => {
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState([]);
  const [Agency, setAgency] = useState([]);
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
    
    <div  className='sidebarme'>
     <NavBarAgency userData={userData}  />
     <AgencyRegister  userData={userData}/>
     
    </div>
  );
};

export default AgencyDashBoard;
