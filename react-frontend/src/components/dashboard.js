import React, {useEffect, useState} from "react";
// import { fetchOrigData } from "../helpers/fetchData"
import axios from 'axios';


function Dashboard() {
  const [origData, setOrigData] = useState([]);
  const [progData, setProgData] = useState([]);

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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dashboard">
      <h1>DASHBOARD</h1>
      {origData.length === 0 ? 0 :
      <h2>Original Rcvs #: {origData[0].length}</h2>}
      <br></br>
      {progData.length === 0 ? 0 :
      <h2>Progress Rcvs #: {progData[0].length}</h2>}
    </div>
  )
}

export default Dashboard;