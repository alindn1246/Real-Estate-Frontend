import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './MyHeader.css';
import '../Navbar/NavigationBar.css'
import NavigationBar from '../Navbar/NavigationBar'
import BtnPropertyType from './BtnPropertyType';
import SearchBox from './SearchBox';




function MyHeader() {
  const [selectedPropertyType, setSelectedPropertyType] = useState('');

  const handlePropertyTypeChange = (propertyType) => {
    setSelectedPropertyType(propertyType);
  };

  return (
    <div className='header-container' >
     
     <div className='navo'>
        <NavigationBar />
        </div>
    
   
     
       <Carousel  className="header-carousel">
        
      <Carousel.Item>
     
      <div className='SearchBanner'>
      <BtnPropertyType OptionChange={handlePropertyTypeChange} />
        </div>
        <div className='SearchContainer'>
        <SearchBox selectedPropertyType={selectedPropertyType} />
        </div>
        <div className='Whitecontainer'>
     </div>
      <img
            src="https://rimh2.domainstatic.com.au/xsbSANaq-NWhc-Fs34fzQFr3WHI=/fit-in/1920x1080/filters:format(jpeg):quality(80):no_upscale()/4db284da-c272-41c9-a6ea-04a6902f7f73-w4000-h2002"
            alt="Buy Sobha Realty - Apartments Banner Desktop 2 with an affordable price"
            className='banner1'
            
          />
           
        <Carousel.Caption>
        <h2 id="slide-title">Real<br/>Estate Agency</h2>
         
          <div className="meta">Nok Nok</div>
          <div id="slide-status">Turning Your Dreams into an Address</div>
         
          
        </Carousel.Caption>
      
  
      
      </Carousel.Item>
      
      
     
    
    </Carousel>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>

    
    </div>

  
  );
}

export default MyHeader;