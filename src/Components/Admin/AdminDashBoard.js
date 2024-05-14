import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import NavBarAdmin from './NavBarAdmin';
import RegisterAgency from './RegisterAgency';
import NewsForm from './NewsForm';
import NewsTable from './NewsTable';
import DataTablePropertyAdmin from './DataTablePropertyAdmin';

const AdminDashBoard = () => {
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
   <NavBarAdmin  userData={userData}/>
    <DataTablePropertyAdmin/>
   <br/>
   <NewsForm/>
   <br/> 
   
   <NewsTable/>
   <br/>
<RegisterAgency userData={userData} />
    </div>
  );
};

export default AdminDashBoard;
