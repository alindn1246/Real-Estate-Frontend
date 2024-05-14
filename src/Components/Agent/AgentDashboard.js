import React, { useState, useEffect } from 'react';

import DataTable from './DataTableProperty';
import NavBarAgent from './NavBarAgent';
import DataTableBook from './DataTableBook';
import Cookies from 'js-cookie';
import DataTableRating from './DataTableRating';

const AgentDashboard = () => {
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
  return (
    
    <div  className='sidebarme'>
     <NavBarAgent userData={userData}  />
     <DataTable userData={userData} />
     <br/>
     <DataTableBook userData={userData}/>
     <br/>
     <DataTableRating userData={userData}/>

     
    </div>
  );
};

export default AgentDashboard;
