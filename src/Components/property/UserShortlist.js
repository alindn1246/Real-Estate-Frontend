import React from 'react';
import { useUser } from './UserContext';
import UsersShortlists from './UsersShortlists';

const UserShortlist = () => {
  const { userData } = useUser();
  const ali = userData?.userId;

  return (
    <div>
      {ali !== undefined && ali > 0 ? <UsersShortlists userId={ali} /> : null}
      
    </div>
  );
};


export default UserShortlist;
