import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationBar from '../Navbar/NavigationBar';
import { Search, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import AgentCard from './AgentCard';
import './AgentList.css';
import Cookies from 'js-cookie';
const AgentList = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [cities, setCities] = useState([
    { title: 'Sydney' },
    { title: 'Melbourne' },
    { title: 'Brisbane' },
    { title: 'Perth' },
    { title: 'Adelaide' },
  
  ]);

  const handleSearchChange = async (e, { value }) => {
    setSearchValue(value);

    // Trigger the default search when the input is cleared
    if (value === '') {
      handleSearchClick();
    }
  };

  const handleCitySelect = (e, { result }) => {
    setSelectedCity(result.title);
    setSearchValue(result.title);
  };

  const handleSearchClick = async () => {
    try {
      const url = searchValue === '' ? 'https://localhost:7088/api/Agents' : `https://localhost:7088/api/Agents/GetByAddress/${selectedCity}`;
      const response = await axios.get(url);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  };

  
  useEffect(() => {
    handleSearchClick();
  }, []);

  return (
    <div>
      <NavigationBar />
      <div className="search-container">
        <Search
          className='search-bar'
          placeholder='Search location...'
          onSearchChange={handleSearchChange}
          onResultSelect={handleCitySelect}
          value={searchValue}
          results={cities.map(city => ({
            title: city.title,
            description: `City: ${city.title}`,
          }))}
        />
        <Button icon='search' onClick={handleSearchClick}/>
      </div>
      {searchResults.map(agent => (
        <AgentCard key={agent.agentId} agentId={agent.agentId} />
      ))}
    </div>
  );
};

export default AgentList;
