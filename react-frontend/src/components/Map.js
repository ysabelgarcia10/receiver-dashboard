import { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import LocationMarker from "../components/Map/LocationMarker";
import axios from "axios";
import "../styles/map.scss"

const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;

const Map = ({ zoom }) => {
  const [origData, setOrigData] = useState([]);
  const [progData, setProgData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [valueForUseEffect, setValueForUseEffect] = useState(0)
  const [valueForUseEffect2, setValueForUseEffect2] = useState(0)
  const [valueForUseEffect3, setValueForUseEffect3] = useState(0)
  const [locations, setLocations] = useState([]);
  const [center, setCenter] = useState({ lat: 49.2827, lng: -123.1207 });
  const [markers, setMarkers] = useState(null);

  // const [filteredDays, setFilteredDays] = useState([]);
  // const [dayProperties, setDayProperties] = useState([]);
  // const [itinerary, setItinerary] = useState({});
  // const [days, setDays] = useState([]);
  // const [activities, setActivities] = useState([]);
  // const [daysList, setDaysList] = useState([]);
  // const [show, setShow] = useState(daysList);

  function refreshPage() {
    window.location.reload(false);
  }

  async function fetchOrigData() {
    
    try {
      const result = await axios.get("http://localhost:8080/api/data/original")
      // console.log("fetching results from original layout in maps...", result.data);
      setOrigData(result.data[0]);
      setValueForUseEffect(1);
    } catch (error) {
      console.error(error);
    }
  };

  async function fetchProgData() {
    try {
      const result = await axios.get("http://localhost:8080/api/data/progress")
      // console.log("fetching results from progress layout in maps...", result.data);
      setProgData(result.data[0]);
      setValueForUseEffect2(1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrigData();
    fetchProgData();

    const combinedData = [];
    combinedData.push(origData, progData)
    
    // console.log("ALL DATA FROM MAP", combinedData)
    setAllData(combinedData);

    const locationsArr = [];
    for (const i in allData) {
      // console.log(allData[i])
      for (const item in allData[i]) {
        if (i === "0") {
          let locationItem = {
            "label": allData[i][item].label,
            "latitude": allData[i][item].latitude,
            "longitude": allData[i][item].longitude,
            "stat": "original location"
          }
          locationsArr.push(locationItem);
        } else {
          let locationItem = {
            "label": allData[i][item].label,
            "latitude": allData[i][item].latitudeActual,
            "longitude": parseFloat(allData[i][item].longitudeActual),
            "stat": "actual location"
          }
          locationsArr.push(locationItem);
        }
      }
    };
    setLocations(locationsArr)
    // setValueForUseEffect3(1)
  }, [origData, valueForUseEffect, valueForUseEffect2])

  // console.log("ALLDATA", allData)
  // console.log("origdata", allData[0])
  // console.log("progdata", allData[1])

  console.log(locations)

  //----------------------- USE EFFECT 5
  //show only the markers that are enabled on checkbox
  useEffect(() => {
    console.log("inside useeffect 5, locations", locations)
    setMarkers(
      locations.map((location) => {
        const assignedColor = location.stat === "original location"? "0000ff" : "FFA500";

        return (
          <LocationMarker
            key={location.latitude}
            name={location.label}
            lat={location.latitude}
            lng={location.longitude}
            color={assignedColor}
          />
        );
      })
    ); 
  }, [valueForUseEffect2,locations]);

  //----------------------- USE EFFECT 6
  useEffect(() => {
    let centerLat = 0;
    let centerLong = 0;
    let locationsLength = 0.000001;

    for (const location of locations) {
      centerLat += Number(location.latitude);
      centerLong += Number(location.longitude);
      locationsLength++;
    }

    centerLat = centerLat / locationsLength;
    centerLong = centerLong / locationsLength;
    setCenter({ lat: centerLat, lng: centerLong });
  }, [valueForUseEffect2, locations]);

  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: REACT_APP_API_KEY
        }}
        center={center}
        defaultZoom={zoom}
      >
        {markers}
      </GoogleMapReact>
    </div>
   
  );
};

Map.defaultProps = {
  zoom: 15,
};

export default Map;
