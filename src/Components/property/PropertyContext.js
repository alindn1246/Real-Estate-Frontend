import React, { createContext, useContext, useState } from 'react';

const PropertyContext = createContext();

export const usePropertyContext = () => {
  return useContext(PropertyContext);
};

export const PropertyProvider = ({ children }) => {
  const [propid, setPropid] = useState([]);

  const setPropertyIds = (propertyIds) => {
    setPropid(propertyIds);
  };

  return (
    <PropertyContext.Provider value={{ propid, setPropertyIds }}>
      {children}
    </PropertyContext.Provider>
  );
};
