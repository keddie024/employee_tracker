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

function init() {
    inquirer
        .prompt({
            name: "choice",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Employees by Department",
                "Add Employee",
                "Update Employee Role",
                "View All Roles",
                "Add Role",
                "View All Departments",
                "Add Department",
                "Quit"
            ]
        })
        .then(function (response) {
            switch (response.choice) {
                case "View All Employees":
                    view.viewEmployee(connection, init);
                    break;

                case "View All Employees by Department":
                    view.viewByDepartment(connection, init);
                    break;

                case "Add Employee":
                    add.addEmployee(connection, init);
                    break;

                case "Update Employee Role":
                    update.updateRole(connection, init);
                    break;


                case "View All Roles":
                    view.viewRole(connection, init);
                    break;

                case "Add Role":
                    add.addRole(connection, init);
                    break;

                case "View All Departments":
                    view.viewDepartment(connection, init);
                    break;

                case "Add Department":
                    add.addDepartment(connection, init);
                    break;

                case "Quit":
                    connection.end();
                    break;
            }
        })
};

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    init();
});