import React from 'react';
import './App.css';
import "antd/dist/antd.css";

import OrigExcelPage from "./components/OrigExcel";
import ProgExcelPage from "./components/ProgExcel";
import Dashboard from "./components/Dashboard";
import Map from "./components/Map";

function App() {

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
      <Map/>
    </div>
  );
}

export default App;