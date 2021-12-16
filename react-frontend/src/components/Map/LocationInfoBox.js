import React from 'react';

const LocationInfoBox = (props) => {
  return (
    <div className="location-info">
      <div className="location-info-text">
          <h2 className="location-name">{props.info.label}</h2>
          <h4 className="location-status">{props.info.stat === "original location" ? "PLANNED" : "COMPLETED"}</h4>
          <h5 className="location-rcvTime">completed: {props.info.rcvTime}</h5>
          <h5 className="location-longlat">lng: {Number(props.info.longitude).toFixed(4)}°, lat: {Number(props.info.latitude).toFixed(4)}°</h5>
      </div> 
    </div>
  )
}

export default LocationInfoBox