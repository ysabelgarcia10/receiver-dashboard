import React from 'react';
import './App.scss';
import "antd/dist/antd.css";

import OrigExcelPage from "./components/OrigExcel";
import ProgExcelPage from "./components/ProgExcel";
import Dashboard from "./components/Dashboard";
import Map from "./components/Map";

function App() {

  return (
    <div className="App">
      <h1 className="app-title">Receiver Progress Dashboard</h1>
      <div className="content">
        <div className="tables">
          <OrigExcelPage/>
          <ProgExcelPage/>
        </div>
        <Dashboard className="dashboard-contents"/>
        <div className="map-element">
          <Map/>
        </div>
        <h4 className="credits">Created By: Y. Garcia 2021</h4>
      </div>
    </div>
  );
}

export default App;