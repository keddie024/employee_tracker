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

function viewEmployee(connection, init) {
    let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, e2.first_name AS manager FROM employee LEFT JOIN employee as e2 ON e2.id = employee.manager_id JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    });
};

module.exports = {
    viewDepartment: viewDepartment,
    viewRole: viewRole,
    viewEmployee: viewEmployee
};