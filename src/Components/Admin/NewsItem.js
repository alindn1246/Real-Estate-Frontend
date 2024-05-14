import React from 'react';

import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBRipple,
  MDBRow,
} from "mdb-react-ui-kit";

const NewsItem = ({ newsItem }) => {

  const handleClick = () => {
    window.location.href = newsItem.newsAddress;
  };
    return (
      <MDBContainer className="py-5">
      <MDBRow className="gx-5">
        <MDBCol md="6" className="mb-4">
          <MDBRipple
            className="bg-image hover-overlay ripple shadow-2-strong rounded-5"
            rippleTag="div"
            rippleColor="light"
          >
            
          <img
         src={newsItem.imageAddress} 
           alt="Buy Sobha Realty - Apartments Banner Desktop 2 with an affordable price"
           className="w-100"
         />
        
          
            <a href="#!">
              <div
                className="mask"
                style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
              ></div>
            </a>
          </MDBRipple>
        </MDBCol>
        <MDBCol md="6" className="mb-4">
      
          <h4>
            <strong>{newsItem.title}</strong>
          </h4>

          <span className="badge  px-2 py-1 shadow-1-strong mb-3" style={{ color: 'gray' }}>
         {newsItem.author}
          </span>
          <p className="text-muted">
          {newsItem.mainIdea}
          </p>
          <button onClick={handleClick} className="link-button">
          Read More
        </button>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    );
};

export default NewsItem;
