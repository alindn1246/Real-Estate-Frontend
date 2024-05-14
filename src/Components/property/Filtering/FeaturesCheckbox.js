import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FeaturesCheckbox.css';

const FeaturesCheckbox = ({ onFeaturesChange }) => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    // Fetch features from the API
    const fetchFeatures = async () => {
      try {
        const response = await axios.get('https://localhost:7088/api/Features');
        setFeatures(response.data);
      } catch (error) {
        console.error('Error fetching features:', error);
      }
    };

    fetchFeatures();
  }, []);

  const handleCheckboxChange = (featureId) => {
    const updatedFeatures = features.map((feature) => ({
      ...feature,
      selected: feature.featureId === featureId ? !feature.selected : feature.selected,
    }));
    setFeatures(updatedFeatures);
    onFeaturesChange(updatedFeatures.filter((feature) => feature.selected).map((feature) => feature.featureId));
  };

  return (
    <Form className="featuresCheckbox">
      {features.map((feature) => (
        <Form.Check
          key={feature.featureId}
          type="checkbox"
          id={`feature-${feature.featureId}`}
          label={ feature.featureName}
          checked={feature.selected || false}
          onChange={() => handleCheckboxChange(feature.featureId)}
        />
      ))}
    </Form>
  );
};

export default FeaturesCheckbox;
