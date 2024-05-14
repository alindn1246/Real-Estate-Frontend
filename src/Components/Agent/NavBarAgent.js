import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Sidenav = ({userData}) => {
  const [agent, setAgent] = useState([]);
  const [imageAgency, setimageAgency] = useState([]);
  const [imageAgent, setimageAgent] = useState([]);
  const userId = userData.userId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAgent = await axios.get(`https://localhost:7088/api/Agents/GetAgentByUserId/${userId}`);
        setAgent(responseAgent.data);
        
        const responseImageAgency = await axios.get(`https://localhost:7088/api/ImageAgency/ByAgencyId/${responseAgent.data.agencyId}`);
        setimageAgency(responseImageAgency.data);
        
        const responseImageAgent = await axios.get(`https://localhost:7088/api/ImageAgent/ByAgentId/${responseAgent.data.agentId}`);
        setimageAgent(responseImageAgent.data);

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
      {imageAgent.map((image) => (
         
         <img  key={image.imageId}   src={image.imageSrc} alt={image.imageName}
         
         style={styles.avatar}/>
       
     ))}
    
       
        <span style={styles.name}>  {agent.agentName} <br/>
        {userData.email}
        </span>
      </div>
      {imageAgency.map((image) => (
         
         <img  key={image.imageId}   src={image.imageSrc} alt={image.imageName}
         
         style={styles.avatarAgency}/>
       
     ))}
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

export default Sidenav;
