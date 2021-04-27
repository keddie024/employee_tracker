const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const add = require("./js/add.js");
const view = require("./js/view.js");
const update = require("./js/update.js");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "company_DB"
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    init();
  });