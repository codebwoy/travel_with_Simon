import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./map.css";

export default function Map({ posts }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [API_KEY] = useState("XLaDGrxR8YKvAfCO234c"); // my API key

  useEffect(() => {
    if (map.current) return; // stops map from initializing more than once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [13.3888, 52.517], // Default to Berlin
      zoom: 4,
    });
    map.current.addControl(new maplibregl.NavigationControl(), "top-right");
  }, [API_KEY]);

  useEffect(() => {
    if (!map.current) return; // Wait for the map to initialize

    // Remove all existing markers
    map.current.eachLayer((layer) => {
      if (layer instanceof maplibregl.Marker) {
        layer.remove();
      }
    });

    // Add new markers
    posts.forEach((post) => {
      const popupContent = `
        <div class="info-window">
          <button class="close-btn" onclick="this.parentElement.style.display='none'">x</button>
          <h2>${post.title}</h2>
          <p>Visiting Date: ${post.date}</p>
          <div class="author">
            <img src="${post.authorImage}" alt="${post.authorName}" class="author-image"/>
            <p>${post.authorName}</p>
          </div>
          <a href="/post/${post.id}" class="detail-link">Read More</a>
        </div>
      `;

      const popup = new maplibregl.Popup({ closeOnClick: true }).setHTML(
        popupContent
      );

      new maplibregl.Marker({ color: "#FF0000" })
        .setLngLat([post.lng, post.lat])
        .setPopup(popup) // sets the popup on the marker
        .addTo(map.current);
    });

    // Center map on the newest post
    if (posts.length > 0) {
      const newestPost = posts[posts.length - 1];
      map.current.setCenter([newestPost.lng, newestPost.lat]);
    }
  }, [posts]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}

// PropTypes validation for the Map component
Map.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      lng: PropTypes.number.isRequired,
      lat: PropTypes.number.isRequired,
      authorName: PropTypes.string.isRequired,
      authorImage: PropTypes.string.isRequired,
    })
  ).isRequired,
};
