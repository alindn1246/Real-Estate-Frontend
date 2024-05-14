import React, { useState, useEffect } from 'react';
import { BiStar } from 'react-icons/bi';
import axios from 'axios';

const Shortlist = ({ propertyId, userId }) => {
  const [Fav, setFav] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://localhost:7088/api/ShortList/CheckIfUserAlreadyPosted/${propertyId}/${userId}`);
      setFav(response.data);
    } catch (error) {
      console.error('Error checking shortlist status:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [propertyId, userId]);

 

  const handleShortlist = () => {
   
    if (Fav) {
      
      axios.delete(`https://localhost:7088/api/ShortList/DeleteByUserAndProperty/${propertyId}/${userId}`)
        .then(response => {
         
          fetchData(); 
        })
        .catch(error => {
          console.error('Error deleting from shortlist:', error);
        });
    } else {
      // If Fav is false, it means the property is not shortlisted, so we should add it
      axios.post('https://localhost:7088/api/ShortList', {
        propertyId: propertyId,
        userId: userId,
      })
        .then(response => {
       
          fetchData(); 
        })
        .catch(error => {
          console.error('Error adding to shortlist:', error);
        });
        
    }
  };

  return (
    <div className='starcontainer'>

      <BiStar className={Fav ? 'favorite' : 'favoritefalse'} onClick={handleShortlist} />
    </div>
  );
};

export default Shortlist;
