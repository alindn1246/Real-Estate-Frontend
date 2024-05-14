// PropertyCard.js

import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineBed } from "react-icons/md";
import { BiBath, BiArea } from "react-icons/bi";
import propertydata from "./Propertydata";
import "./PropertyCard.css"; // Import the CSS file
import im from './Components/Images/banner-13.webp'

const PropertyCard = ({ propertyId }) => {
  const property = propertydata.find((prop) => prop.p_id === propertyId);

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <div className="card">
      <img

        src={im}
        alt={`${property.p_frontal_image}`}
        className={`image ${window.location.pathname === "/sell" ? "large" : ""}`}
      />
      <div className="content">
        <div className="price">${property.p_price}</div>
        <Link to={`/property/${property.p_id}`}>
          <h3 className="title">{property.p_name}</h3>
        </Link>
        <div className="address">
          {`${property.p_address_street_num} ${property.p_address_street_name} • ${property.p_address_city} • ${property.p_address_state}`}
        </div>
        <hr className="divider" />
        <div className="features">
          <span>
            <MdOutlineBed /> {property.p_bed} Beds
          </span>
          <span>
            <BiBath /> {property.p_bath} Bathrooms
          </span>
          <span>
            <BiArea /> {property.p_area_sq_ft} sq.ft
          </span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
