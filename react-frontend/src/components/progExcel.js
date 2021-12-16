import React, { Component } from "react";
import { Table, Button, Upload } from "antd";
import Icon from "@ant-design/icons";
import { ExcelRenderer } from "react-excel-renderer";
// import { fetchProgData } from "../helpers/fetchData"

export default class ExcelPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cols: [],
      rows: [],
      errorMessage: null,
      columns: [
        {
          title: "LABEL",
          dataIndex: "label",
        },
        {
          title: "RCV LINE",
          dataIndex: "rcvLn",
        },
        {
          title: "RCV POINT",
          dataIndex: "rcvPt",
        },
        {
          title: "LONGITUDE ACTUAL",
          dataIndex: "longitudeActual",
        },
        {
          title: "LATITUDE ACTUAL",
          dataIndex: "latitudeActual",
        },
        {
          title: "DATETIME LAID OUT",
          dataIndex: "rcvTime",
        },
      ]
    };
  }

  handleSave = row => {
    const newData = [...this.state.rows];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    this.setState({ rows: newData });
  };

  checkFile(file) {
    let errorMessage = "";
    if (!file || !file[0]) {
      return;
    }
    const isExcel =
      file[0].type === "application/vnd.ms-excel" ||
      file[0].type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    if (!isExcel) {
      errorMessage = "You can only upload Excel file!";
    }
    console.log("file", file[0].type);
    const isLt2M = file[0].size / 1024 / 1024 < 2;
    if (!isLt2M) {
      errorMessage = "File must be smaller than 2MB!";
    }
    console.log("errorMessage", errorMessage);
    return errorMessage;
  }

  fileHandler = fileList => {
    console.log("fileList", fileList);
    let fileObj = fileList;
    if (!fileObj) {
      this.setState({
        errorMessage: "No file uploaded!"
      });
      return false;
    }
    console.log("fileObj.type:", fileObj.type);
    if (
      !(
        fileObj.type === "application/vnd.ms-excel" ||
        fileObj.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
    ) {
      this.setState({
        errorMessage: "Unknown file format. Only Excel files are uploaded!"
      });
      return false;
    }
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        let newRows = [];
        resp.rows.slice(1).map((row, index) => {
          if (row && row !== "undefined") {
            newRows.push({
              key: index,
              label: row[0],
              rcvLn: row[1],
              rcvPt: row[2],
              longitudeActual: row[3],
              latitudeActual: row[4], 
              rcvTime: row[5]
            });
          }
        });
        if (newRows.length === 0) {
          this.setState({
            errorMessage: "No data found in file!"
          });
          return false;
        } else {
          this.setState({
            cols: resp.cols,
            rows: newRows,
            errorMessage: null
          });
        }
      }
    });
    return false;
  };

  handleSubmit = async () => {
    // console.log("submitting: ", this.state.rows);
    //submit to API
    //if successful, banigate and clear the data
    //this.setState({ rows: [] })
    // fetchProgData();

    const receiver = this.state.rows
    // console.log("PROGRESS RECEIVERS", receiver)

    fetch("http://localhost:8080/api/data/progress", {
      method:'POST', 
      headers: { "Content-Type": "application/json"}, 
      body: JSON.stringify(receiver)
    })
  };

  handleDelete = key => {
    const rows = [...this.state.rows];
    this.setState({ rows: rows.filter(item => item.key !== key) });
  };
  handleAdd = () => {
    const { count, rows } = this.state;
    const newData = {
      key: count,
      rcvLn: "RCV LINE",
      rcvPt: "RCV POINT",
      longitude: "LONGITUDE", 
      latitude: "LATITUDE", 
      label: "LABEL"
    };
    this.setState({
      rows: [newData, ...rows],
      count: count + 1
    });
  };

  render() {
    const columns = this.state.columns.map(col => {
      return {
        ...col,
        onCell: record => ({
          record,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        })
      };
    });
    return (
      <div className="progLayout">
        <h1 className="prog-title">STEP 2: Importing Progress Receiver Layout</h1>
          <a
            href="https://docs.google.com/spreadsheets/d/1sTWTn959DpuoUXormhpdjCNNQAA5DzcnvXLNg3-dQdE/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            Sample progress receiver excel sheet
          </a>
        <div>
          <Upload
            name="file"
            beforeUpload={this.fileHandler}
            onRemove={() => this.setState({ rows: [] })}
            multiple={false}
            >
            <Button>
              <Icon type="upload" /> Click to Upload Excel File
            </Button>
          </Upload>
        </div>
        {this.state.rows.length > 0 && (
          <>
            {/* <Button
              onClick={this.handleAdd}
              size="large"
              type="info"
              style={{ marginBottom: 16 }}
            >
              <Icon type="plus" />
              Add a row
            </Button>{" "} */}
            <Button
              onClick={this.handleSubmit}
              size="large"
              type="primary"
              style={{ marginBottom: 16, marginLeft: 10 }}
            >
              Plot Data
            </Button>
          </>
        )}
        <Table
          dataSource={this.state.rows}
          columns={columns}
        />
      </div>
    );
  }
}
