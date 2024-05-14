import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const savedToken = Cookies.get('authToken');
        const savedUserData = Cookies.get('userData');

        if (savedToken) {
          setToken(savedToken);
        }

        if (savedUserData) {
          setUserData(JSON.parse(savedUserData));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const contextValue = {
    token,
    userData,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
