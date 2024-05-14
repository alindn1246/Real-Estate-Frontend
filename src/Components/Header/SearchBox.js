import React, { useState, useEffect } from 'react';
import { Button, Form, FormControl, ListGroup } from 'react-bootstrap';
import { FaSearchLocation } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { usePropertyContext } from '../property/PropertyContext'; 
import FilterOffcanva from './FilterOffcanva';
import './SearchBox.css';
const SearchBox = ({ selectedPropertyType }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [properties, setProperties] = useState([]);
  const { propid, setPropertyIds } = usePropertyContext(); 

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        if (searchTerm.length < 3) {
          setProperties([]);
          return;
        }

        const response = await fetch(
          `https://localhost:7088/api/Properties/Filter?address=${searchTerm}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setProperties(data);
      } catch (err) {
        setProperties([]);
      }
    };

    fetchProperties();
  }, [searchTerm]);

  const handleSearch = async () => {
    try {
      const addressRegex = /([^,]+),.*/;
      const match = searchTerm.match(addressRegex);

      if (match && match[1]) {
        const addressProperty = match[1].trim();

        if (addressProperty.length < 3) {
          setProperties([]);
          return;
        }

        const response = await axios.get(
          selectedPropertyType === 'Buy' || selectedPropertyType === 'Rent'
            ? `https://localhost:7088/api/Properties/Filter?address=${addressProperty}&statusName=${selectedPropertyType}`
            : `https://localhost:7088/api/Properties/Filter?address=${addressProperty}&typeName=${selectedPropertyType}`
        );

        if (!response || !response.data) {
          throw new Error('Failed to fetch data');
        }
        console.log(addressProperty)
        setProperties(response.data);
        setPropertyIds(response.data.map((property) => property.propertyId)); 
      }
    } catch (err) {
      setProperties([]);
    }
    navigate(`/PropertiesList`);
  };

  const handleListGroupItemClick = (property) => {
    const commaIndex = property.address.indexOf(',');
    if (commaIndex !== -1) {
      const afterFirstComma = property.address.substring(commaIndex + 1).trim();
      setSearchTerm(afterFirstComma);
    }
  };

  return (
    <div>
      <Form className="search-form">
        <div className="input-container">
          <FormControl
            type="text"
            placeholder="Search property"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterOffcanva />
        </div>
        <Button variant="success" className="search-button" onClick={handleSearch}>
          <FaSearchLocation className="SearchIcon" /> Search
        </Button>

        <div className="list-group-container">
          <ListGroup className={properties.length > 1 ? 'scrollable-list' : ''}>
            {properties.map((property) => (
              <ListGroup.Item
                key={property.propertyId}
                style={{ cursor: 'pointer' }}
                onClick={() => handleListGroupItemClick(property)}
              >
                {property.address}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </Form>
    </div>
  );
};

export default SearchBox;
