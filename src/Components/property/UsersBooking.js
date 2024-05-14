import React from 'react';
import UsersBookings from './UsersBookings';
import { useUser } from './UserContext';
import UsersShortlists from './UsersShortlists';
import Cookies from 'js-cookie';


const UsersBooking = () => {
    const { userData } = useUser();
    const ali = userData?.userId;
    console.log(ali)

    // Function to handle delete button click
    const handleDelete = () => {
        console.log("Delete button clicked");
        // Add your delete logic here
    }

  return (
    <div>
        {ali !== undefined && ali > 0 ?<UsersBookings userId={ali} />  : null}
       
    </div>
  );
};

export default UsersBooking;
