import React, { useState, useEffect } from 'react';
import './NewsList.css';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Button, CardActionArea, CardActions } from '@mui/material';
import { Grid } from '@mui/material';
import NavigationBar from '../Navbar/NavigationBar';

const BlogPost = ({ imgSrc, alt, title, newsAddress, content, onClick }) => (
  <figure className="snip1208">
    <img src={imgSrc} alt={alt} />
    <figcaption className='cont'>
      <h3>{title}</h3>
      <p>{content}</p>
      <button onClick={() => onClick(newsAddress)} className="link-button">
        Read More
      </button>
    </figcaption>
    <a href={newsAddress}></a>
  </figure>
);

const NewsCardList = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7088/api/News')
      .then(response => {
        setNewsData(response.data);
      })
      .catch(error => {
        console.error('Error fetching news data:', error);
      });
  }, []);

  const handleClick = (newsAddress) => {
    window.location.href = newsAddress;
  };

  return (
    <>
      <Grid container spacing={2} className="custom-grid-container">
        {newsData.map((newsItem, index) => (
          <BlogPost
            key={index}
            imgSrc={newsItem.imageAddress}
            alt={newsItem.title}
            newsAddress={newsItem.newsAddress}
            title={newsItem.title}
            content={newsItem.mainIdea}
            onClick={handleClick} // Pass the handleClick function as a prop
          />
        ))}
      </Grid>
    </>
  );
};

export default NewsCardList;