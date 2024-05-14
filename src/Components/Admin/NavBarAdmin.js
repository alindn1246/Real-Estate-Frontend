import React from 'react';
import UserHome from '../Images/UserHome.png'

const NavBarAdmin = ({userData}) => {


  
  return (
    <div style={styles.navigation}>
      <div style={styles.avatarContainer}>
    
        <span style={styles.name}>  {userData.userName} <br/>
        {userData.email}
        </span>
      </div>
   <img     src={UserHome}
         
         style={styles.avatar}/>
    </div>
  );
};

const styles = {
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'white',
    padding: '10px',
    marginBottom:'40px'
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  avatarAgency: {
    width: '80px',
    height: '30px',

    marginRight: '10px',
  },
  name: {
    color: 'white',
  },
};

export default NavBarAdmin;
