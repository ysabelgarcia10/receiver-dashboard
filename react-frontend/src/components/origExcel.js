import React, { Component } from "react";
import { Table, Button, Upload } from "antd";
import Icon from "@ant-design/icons";
import { ExcelRenderer } from "react-excel-renderer";
// import { fetchOrigData } from "../helpers/fetchData"

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
          title: "LONGITUDE ",
          dataIndex: "longitude",
        },
        {
          title: "LATITUDE",
          dataIndex: "latitude",
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
              longitude: row[3],
              latitude: row[4] 
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
    // this.setState({ rows: [] })
    // console.log("fetching orig data")
    const receiver = this.state.rows
    // console.log("ORIGINAL RECEIVERS", receiver)

    fetch("http://localhost:8080/api/data/original", {
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
      <div className="origLayout">
        <h1>Importing Original Receiver Layout (Excel)</h1>
          <a
            href="https://res.cloudinary.com/bryta/raw/upload/v1562751445/Sample_Excel_Sheet_muxx6s.xlsx"
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            Sample original receiver excel sheet
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
            <Button
              onClick={this.handleSubmit}
              size="large"
              type="primary"
              style={{ marginBottom: 16, marginLeft: 10 }}
            >
              Plot Data
            </Button>
            //need to push it to convert it to
          )}
        <Table
          className="origTable"
          dataSource={this.state.rows}
          columns={columns}
        />
      </div>
    );
  }
}
