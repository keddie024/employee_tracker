const inquirer = require("inquirer");

function addDepartment(connection, init) {
    inquirer
    .prompt([
        {
            name: "deptartment",
            type: "input",
            message: "What department would you like to add?"
        }
    ])
    .then(function (response) {
            connection.query('INSERT INTO department (name) VALUES (?)', response.deptartment, function (err, res) {
                if (err) throw err;
                console.log("Department added!");
                init();
            });

    })

};

function addRole() {

}

function addEmployee() {

}

module.exports = {
    addDepartment: addDepartment,
    addRole: addRole,
    addEmployee: addEmployee
};