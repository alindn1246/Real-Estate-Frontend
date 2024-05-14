import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeatureCheckboxList = ({propertyId}) => {
  
  const [features, setFeatures] = useState([]);
  const [selectedFeatureProperty, setSelectedFeatureProperty] = useState([]);
  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const { data } = await axios.get('https://localhost:7088/api/Features');
        setFeatures(data);
      } catch (error) {
        console.error('Error fetching features:', error);
      }
    };

    fetchFeatures();
  }, []);

  useEffect(() => {
    const fetchCheckedCheckboxes = async () => {
      try {
        const { data } = await axios.get(`https://localhost:7088/api/FeutureProperty/GetByPropertyId/${propertyId}`);
        const checkedFeatureIds = data.map(({ featureId }) => featureId);
        setSelectedFeatureProperty(checkedFeatureIds);
      } catch (error) {
        console.error('Error fetching checked checkboxes:', error);
      }
    };


    fetchCheckedCheckboxes();
  }, [propertyId]);

  const handleCheckboxChange = (featureId) => {
    setSelectedFeatureProperty((prevSelected) =>
      prevSelected.includes(featureId)
        ? prevSelected.filter((id) => id !== featureId)
        : [...prevSelected, featureId]
    );
  };

  const handleUpdateFeatures = async () => {
    try {
      await axios.put(`https://localhost:7088/api/FeutureProperty/${propertyId}`, selectedFeatureProperty);
      console.log('Features updated successfully');
    } catch (error) {
      console.error('Error updating features:', error);
    }
  };

  return (
    <div>
      <h2>Features</h2>
      <form>
        {features.map(({ featureId, featureName }) => (
          <div key={featureId}>
            <label>
              <input
                type="checkbox"
                value={featureId}
                checked={selectedFeatureProperty.includes(featureId)}
                onChange={() => handleCheckboxChange(featureId)}
              />
              {featureName}
            </label>
          </div>
        ))}
      </form>
      <button onClick={handleUpdateFeatures}>Update Features</button>
    </div>
  );
};

export default FeatureCheckboxList;
