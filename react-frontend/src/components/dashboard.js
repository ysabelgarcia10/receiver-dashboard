import React, {useEffect, useState} from "react";
// import { fetchOrigData } from "../helpers/fetchData"
import axios from 'axios';
import BarChart from "./barsPerDay.js";

function Dashboard() {
  const [origData, setOrigData] = useState([]);
  const [progData, setProgData] = useState([]);
  const [datesCompleted, setDatesCompleted] = useState({});

  function refreshPage() {
    window.location.reload(false);
  }

  useEffect(() => {
    fetchOrigData();
    fetchProgData();
  }, []);

  async function fetchOrigData() {
    try {
      const result = await axios.get("http://localhost:8080/api/data/original")
      console.log("fetching results from original layout...", result.data);
      setOrigData(result.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  async function fetchProgData() {
    try {
      const result = await axios.get("http://localhost:8080/api/data/progress")
      console.log("fetching results from progress layout...", result.data);
      setProgData(result.data);

      const allDates = [];
      const uniqueDates = {};
      for (const r of result.data[0]) {
        console.log(r)
        const dateTimeOnly = r.rcvTime
        const dateOnly = dateTimeOnly.slice(0, dateTimeOnly.indexOf(" "))
        allDates.push(dateOnly);
      };

      for (const day of allDates) {
        console.log("Day", day)
        if (!uniqueDates[day]) {
          uniqueDates[day] = 1;
        } else {
          uniqueDates[day] += 1;
        }
      }
      setDatesCompleted(uniqueDates);
      console.log(uniqueDates);
      
    } catch (error) {
      console.error(error);
    }
  };
  
  console.log("outside", datesCompleted)
  function listDates(datesCompleted) {
    for (const [key, value] of Object.entries(datesCompleted)) {
      // console.log("mapping", `${key}: ${value}`)
      <h2>{key}: {value}</h2>
    }
  }

  return (
    <div className="dashboard">
      <h1>DASHBOARD</h1>
      <button onClick={refreshPage}>Load Dashboard</button>
      {origData.length === 0 ? 0 :
      <h2>Original Rcvs #: {origData[0].length}</h2>}
      <br></br>
      {progData.length === 0 ? 0 :
      <h2>Progress Rcvs #: {progData[0].length}</h2>}
      <h2>Dates #: {Object.keys(datesCompleted).map((item, i) => (
        <h4> {item} : {datesCompleted[item]}</h4>))}  
      </h2>
      <BarChart datesCompleted={datesCompleted}/>
    </div>
  )
}

export default Dashboard;