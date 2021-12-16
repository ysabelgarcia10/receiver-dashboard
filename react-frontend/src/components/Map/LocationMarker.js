import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const LocationMarker = (props) => {

  return (
    <div className="location-marker" onClick={props.onClick}>
      <LocationOnIcon style={{ color: props.color}} fontSize="large" />
    </div>
  )
}

export default LocationMarker;

