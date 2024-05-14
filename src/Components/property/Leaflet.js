import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import './Leaflet.css';
import 'leaflet/dist/leaflet.css';
import buyIcon from '../Images/Buy.png';
import rentIcon from '../Images/Rent.png';
import soldIcon from '../Images/Sold.png';
import defaultIcon from '../Images/default.png';

const Leaflet = ({ lat, long, zoom, handleMapClick, markerAddress, status,isVisible }) => {
  const mapRef = useRef(null);
  const [marker, setMarker] = useState(null);

  const getMarkerIcon = () => {
    switch (status) {
      case 'Buy':
        return L.icon({
          iconUrl: buyIcon,
          iconSize: [27, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        });
      case 'Rent':
        return L.icon({
          iconUrl: rentIcon,
          iconSize: [27, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        });
      case 'Sold':
        return L.icon({
          iconUrl: soldIcon,
          iconSize: [27, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        });
      default:
        return L.icon({
          iconUrl: defaultIcon,
          iconSize: [27, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        });
    }
  };

  useEffect(() => {
    const australiaBounds = [
      [-10, 110],
      [-45, 155],
    ];

    if (!mapRef.current) {
      mapRef.current = L.map('map').fitBounds(australiaBounds);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapRef.current);

      mapRef.current.on('click', handleMapClick);
    }

    if (marker) {
      mapRef.current.removeLayer(marker);
    }

    if (markerAddress) {
      const customIcon = getMarkerIcon();
      const newMarker = L.marker([lat, long], { icon: customIcon }).addTo(mapRef.current);

      newMarker.on('click', () => {
        mapRef.current.setView([lat, long], 18);
      });

      newMarker.bindPopup(markerAddress);

      setMarker(newMarker);
    }
  }, [lat, long, zoom, handleMapClick, markerAddress]);

  const removeMarker = () => {
    if (marker) {
      mapRef.current.removeLayer(marker);
      setMarker(null);
    }
  };



  return (
    <div>
      <div id="map" className='mapme' />

      <button style={{ visibility: isVisible === 1 ? 'hidden' : 'visible' }} onClick={removeMarker}>Remove Marker</button>
    </div>
  );
};

export default Leaflet;