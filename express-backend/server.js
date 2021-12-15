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
const require = createRequire(import.meta.url);
const data = require("./db.json");
console.log("------ data", data)
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

App.get("/api/data", (req, res) => res.send(JSON.stringify(data)));

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
