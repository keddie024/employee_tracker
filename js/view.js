const inquirer = require("inquirer");

function viewDepartment(connection, init) {
    let query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    })
};

function viewRole(connection, init) {
    let query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    });
};

function viewEmployee() {

}

module.exports = {
    viewDepartment: viewDepartment,
    viewRole: viewRole,
    viewEmployee: viewEmployee
};