// load .env data into process.env
// require('dotenv').config();
import dotenv from 'dotenv'
dotenv.config()

// other dependencies
import chalk from 'chalk';
import * as fs from 'fs';
// const fs = require('fs');
// const Client = require('pg-native');
import pg from 'pg';
const Client = pg.Client;

// PG connection setup
const connectionString = process.env.DATABASE_URL ||
  `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable`;
const client = new Client();
client.connect(connectionString)

// Loads the schema files from db/schema
const runSchemaFiles = function () {
  console.log(chalk.cyan(`-> Loading Schema Files ...`));
  const schemaFilenames = fs.readdirSync('./db/schema');

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`./db/schema/${fn}`, 'utf8')
    console.log(`\t-> Running ${chalk.green(fn)}`);
    client.query(sql);
  }
};

// try {
//   console.log(`-> Connecting to PG using ${connectionString} ...`);
//   client.connectSync(connectionString);
//   runSchemaFiles();
//   // runSeedFiles();
//   client.end();
// } catch (err) {
//   console.error(chalk.red(`Failed due to error: ${err}`));
//   client.end();
// }


console.log("-------1-----")
console.log(`-> Connecting to PG using ${connectionString} ...`);
client.connect(connectionString);
console.log("-------2-----")
runSchemaFiles();
console.log("-------3-----")
client.end();