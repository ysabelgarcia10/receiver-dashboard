import { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import LocationMarker from "../components/Map/LocationMarker";
import axios from "axios";
import "../styles/map.scss"

const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;

const Map = ({ zoom }) => {
  const [origData, setOrigData] = useState([]);

  const [filteredDays, setFilteredDays] = useState([]);
  const [dayProperties, setDayProperties] = useState([]);
  const [markers, setMarkers] = useState(null);
  const [itinerary, setItinerary] = useState({});
  const [days, setDays] = useState([]);
  const [activities, setActivities] = useState([]);
  const [daysList, setDaysList] = useState([]);
  const [show, setShow] = useState(daysList);
  const [center, setCenter] = useState({ lat: 49.2827, lng: -123.1207 });

  const allData = [];

  // async function getData(id) {
  //   return fetch(`http://localhost:8080/api/itinerary/${id}/map`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }).then((data) => {
  //     return data.json();
  //   });
  // }

  async function fetchOrigData() {
    try {
      const result = await axios.get("http://localhost:8080/api/data/original")
      console.log("fetching results from original layout in maps...", result.data);
      allData.push(result.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  console.log("ALL DATA FROM MAP", allData)

  //----------------------- USE EFFECT 3
  //assign each day properties
  useEffect(() => {
    const dayIdWithName = {};
    for (const day of days) {
      dayIdWithName[day.id] = day.day;
    }

    const daysProps = {};
    daysList.forEach((day) => {
      daysProps[day] = {};
      daysProps[day].id = day;
      daysProps[day].name = dayIdWithName[day];
      daysProps[day].visibility = true;
      daysProps[day].color = Math.floor(Math.random() * 16777215).toString(16);
    });

    setDayProperties(daysProps);
  }, [daysList, days]);

  const handleCallback = (childData) => {
    setShow(childData); // childData = ["day1", "day2", "day3", "day4"]
  };

  //----------------------- USE EFFECT 5
  //show only the markers that are enabled on checkbox
  useEffect(() => {
    setMarkers(
      filteredDays.map((activity) => {
        const dayNameFromEvent = activity.day_id;

        const assignedColor = !dayProperties
          ? "000000"
          : dayProperties[dayNameFromEvent].color;

        return (
          <LocationMarker
            key={activity.name}
            lat={activity.lat}
            lng={activity.long}
            color={assignedColor}
          />
        );
      })
    );
  }, [filteredDays, dayProperties]);

  const start_date = new Date(itinerary.start_date);
  const end_date = new Date(itinerary.end_date);

  //----------------------- USE EFFECT 6
  useEffect(() => {
    let centerLat = 0;
    let centerLong = 0;
    let activitiesLength = 0.000001;

    for (const activity of activities) {
      centerLat += Number(activity.lat);
      centerLong += Number(activity.long);
      activitiesLength++;
    }

    centerLat = centerLat / activitiesLength;
    centerLong = centerLong / activitiesLength;
    setCenter({ lat: centerLat, lng: centerLong });
  }, [activities]);

  return (
   
    <div className="map">
      <h2 className="map-title">{itinerary.name}</h2>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: REACT_APP_API_KEY
        }}
        center={center}
        defaultZoom={zoom}
      >
        {/* {markers} */}
      </GoogleMapReact>
    </div>
   
  );
};

Map.defaultProps = {
  zoom: 12,
};

export default Map;
