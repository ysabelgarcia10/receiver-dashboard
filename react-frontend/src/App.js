import React from 'react';
import axios from 'axios';
import './App.css';
import "antd/dist/antd.css";
import OrigExcelPage from "./components/origExcel";
import ProgExcelPage from "./components/progExcel";
import Dashboard from "./components/dashboard";

function App() {
  async function fetchOrigData() {
    try {
      const result = await axios.get("http://localhost:8080/api/data/original")
      console.log("fetching results from original layout...", result.data);
    } catch (error) {
      console.error(error);
    }
  };

  async function fetchProgData() {
    try {
      const result = await axios.get("http://localhost:8080/api/data/progress")
      console.log("fetching results from progress layout...", result.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchOrigData();
  fetchProgData();

  return (
    <div className="App">
      <h1>Receiver Layout Progress</h1>
      <div className="content">
        <div className="tables">
          <OrigExcelPage/>
          <ProgExcelPage/>
        </div>
        <Dashboard/>
      </div>
    </div>
  );
}

export default App;