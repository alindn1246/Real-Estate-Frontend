import React from 'react';
import './AboutUs.css'; // Assuming you have a CSS file for styling

const AboutUs = () => {
  return (
    <div className="about-us">
     
      <div className="content">
     
        <img className="about-image" src="https://www.domain.com.au/group/wp-content/uploads/2021/11/image-sample-09.svg" alt="About Us" />
        <div className="text-content">
          <h2 className="slogan">See the possibilities... And turn them into realities.</h2>
          <p className="about-text">
            Welcome to Mi Casa – where finding your dream home is a seamless and enjoyable experience! Whether you're looking to buy, rent, sell, or connect with experienced agents, Mi Casa is your all-in-one destination for real estate. Our user-friendly platform offers diverse property listings, ensuring a perfect match for every preference and budget. Whether you're navigating the market to buy a new home, seeking the ideal rental, or selling your property, Mi Casa is designed to cater to your unique needs. Our experienced real estate agents are dedicated to guiding you through the process, ensuring informed decisions and successful outcomes. Welcome to Mi Casa – Your Home, Your Way!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
