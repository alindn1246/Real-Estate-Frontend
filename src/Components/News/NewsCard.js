import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBCardDeck } from 'mdbreact';

const NewsCards = ({ news }) => {
  return (
    <MDBCardDeck>
      {news.map((item, index) => (
        <MDBCard key={index}>
          <MDBCardImage className="img-fluid" src={item.image} waves />
          <MDBCardBody>
            <MDBCardTitle>{item.title}</MDBCardTitle>
            <MDBCardText>{item.text}</MDBCardText>
          </MDBCardBody>
        </MDBCard>
      ))}
    </MDBCardDeck>
  );
};

export default NewsCards;
