const {Pool, Client} = require('pg');

const pool = new Pool({
  user: "postgres",
  host: "localhost", 
  database: "demo_enbridge",
  password: "demo123",
  port: 5432  
})

