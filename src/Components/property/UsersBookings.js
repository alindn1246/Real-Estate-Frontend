import React, { useState, useEffect } from 'react';

import axios from 'axios';
import PropertyCardBooking from './PropertyCardBooking';
import { Button } from 'react-bootstrap';



const UsersBookings = ({ userId }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const response = await axios.get(`https://localhost:7088/api/Book/GetByUserId/${userId}`);
      
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching user bookings:', error);
      }
    };
   
    fetchUserBookings();
  }, []);
 
  console.log(bookings);
 
  return (
    <div style={{ display: 'grid' }}>
      {
        bookings.PropertyId
      }
      {bookings.map((bookingItem) => (
     
        <PropertyCardBooking key={bookingItem.BookingpropertyId} propertyId={bookingItem.propertyId} trueDelete={true} dateTime={bookingItem.dateTime}  />
       
       
      ))}
      
    </div>
  );
};

export default UsersBookings;
