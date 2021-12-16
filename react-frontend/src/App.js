import React from 'react';
import './App.css';
import "antd/dist/antd.css";

import OrigExcelPage from "./components/origExcel";
import ProgExcelPage from "./components/progExcel";
import Dashboard from "./components/dashboard";

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
    </div>
  );
}

export default App;