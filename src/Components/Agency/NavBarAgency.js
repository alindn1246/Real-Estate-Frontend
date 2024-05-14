import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  UserHome from '../Images/UserHome.png'
const NavBarAgency = ({ userData }) => {
  const [agency, setAgency] = useState({});
  const [imageAgency, setImageAgency] = useState([]);

  const userId = userData.userId;

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const responseAgency = await axios.get(`https://localhost:7088/api/Agency/GetByUserId/${userId}`);
        const fetchedAgency = responseAgency.data[0];

        setAgency(fetchedAgency);

        // Fetch images by agency ID
        const responseImageAgency = await axios.get(`https://localhost:7088/api/ImageAgency/ByAgencyId/${fetchedAgency.agencyId}`);
        setImageAgency(responseImageAgency.data);

      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  return (
    <div style={styles.navigation}>
      <div style={styles.avatarContainer}>
        {imageAgency.map((image) => (
          <img key={image.imageId} src={image.imageSrc} alt={image.imageName} style={styles.avatarAgency} />
        ))}
        <span style={styles.name}>
          {agency.agencyName} <br />
          {userData.email}
        </span>
      </div>
      <img src={UserHome}  style={styles.avatar}/>
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

export default NavBarAgency;
