import React from 'react';

const LocationInfoBox = (props) => {
  return (
    <div className="location-info">
      <div className="location-info-text">
          <h3 className="location-name">{props.info.label}</h3>
          <h4 className="location-status">{props.info.stat === "original location" ? "PLANNED" : "COMPLETED"}</h4>
          <h6 className="location-rcvTime">completed: {props.info.rcvTime}</h6>
          <h6 className="location-longlat">lng: {Number(props.info.longitude).toFixed(4)}°, lat: {Number(props.info.latitude).toFixed(4)}°</h6>
      </div> 
    </div>
  )
}

export default LocationInfoBox