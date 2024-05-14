import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsItem from './NewsItem';
import {  useParams } from 'react-router-dom';
import NavigationBar from '../Navbar/NavigationBar';

const NewsList = () => {
    const { type } = useParams();
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:7088/api/News/ByType/${type}`);
        setNewsList(response.data);
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div>
        <NavigationBar/>

        <div className='titleHeading'>
      <h1 style={{marginLeft: '20px'}}>{type}</h1>
      </div>
    
     
      {newsList.map((newsItem) => (
          <NewsItem key={newsItem.newsPropId} newsItem={newsItem} />
        ))}
    </div>
  );
};

export default NewsList;
