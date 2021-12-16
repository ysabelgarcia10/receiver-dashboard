import Express from 'express';
const App = Express();
import BodyParser from "body-parser";
const PORT = 8080;
import cors from "cors";
import pkg from "pg";
const {Pool} = pkg;
import dbParams from "./lib/db.js";
const db = new Pool(dbParams);

import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const dataOrig = require("./db_original.json");
// const dataProg = require("./db_progress.json");
// console.log("------ dataOrig", dataOrig)
// console.log("------ dataProg", dataProg)
db.connect();


// Express Configuration
App.use(
  cors({
    origin: "http://localhost:3000",
  })
);
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static("public"));

// App.use("/api/data/original", (req, res) => 
// res.send("original data")
// );

let origReceivers = [];
App.post("/api/data/original", function(req, res) {
  console.log("POST REQUEST");
  console.log(req.body)
  const newReceiver = req.body;

  origReceivers.push(newReceiver);
  console.log(origReceivers);
});

App.get("/api/data/original", function(req, res) {
  console.log("GET REQUEST");
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  console.log('Receivers : ', JSON.stringify(origReceivers));
  res.end(JSON.stringify(origReceivers));
});

let progressReceivers = [];
App.post("/api/data/progress", function(req, res) {
  console.log("POST REQUEST");
  console.log(req.body)
  const newReceiver = req.body;

  progressReceivers.push(newReceiver);
  console.log(progressReceivers);
});

App.get("/api/data/progress", function(req, res) {
  console.log("GET REQUEST");
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  console.log('Receivers : ', JSON.stringify(progressReceivers));
  res.end(JSON.stringify(progressReceivers));
});

// App.get("/api/data/progress", (req, res) => res.send(JSON.stringify(dataProg)));

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
