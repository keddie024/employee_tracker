const inquirer = require("inquirer");

function addDepartment(connection, init) {
    inquirer
        .prompt([
            {
                name: "department",
                type: "input",
                message: "What department would you like to add?"
            }
        ])
        .then(function (response) {
            connection.query('INSERT INTO department (name) VALUES (?)', response.department, function (err, res) {
                if (err) throw err;
                console.log("Department added!");
                init();
            });

        })

};

function addRole(connection, init) {
    let newRole = {};
    connection.query("SELECT * FROM department", function (err, res) {
        inquirer
            .prompt([
                {
                    name: "role",
                    type: "input",
                    message: "What role would you like to add?"
                },
                {
                    name: "salary",
                    type: "input",
                    message: "What will be the salary of the role?",
                },
                {
                    name: "department",
                    type: "list",
                    choices: function () {
                        let choiceArray = [];
                        for (var i = 0; i < res.length; i++) {
                            choiceArray.push(res[i].name);
                        }
                        return choiceArray;
                    },
                    message: "Which department will the role be added to?"
                }
            ])
            .then(function (response) {
                newRole.title = response.role;
                newRole.salary = response.salary;

                connection.query("SELECT id FROM department WHERE name = ?", response.department, function (err, res) {
                    if (err) throw err;
                    newRole.department_id = res[0].id;

                    connection.query('INSERT INTO role SET ?', newRole, function (err, res) {
                        if (err) throw err;
                        console.log("Role added!");
                        init();
                    });
                })

            })
    })
};

function addEmployee(connection, init) {
    let newEmployee = {};
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "first",
                    type: "input",
                    message: "Please enter the employee's first name:",
                },
                {
                    name: "last",
                    type: "input",
                    message: "Please enter the employee's last name:",
                },
                {
                    name: "role",
                    type: "list",
                    choices: function () {
                        let choiceArray = [];
                        for (var i = 0; i < res.length; i++) {
                            choiceArray.push(res[i].title);
                        }
                        return choiceArray;
                    },
                    message: "What will be the employee's role?"
                }
            ])
            .then(function (response) {
                newEmployee.first_name = response.first;
                newEmployee.last_name = response.last;

                connection.query("SELECT * FROM role WHERE title = ?", response.role, function (err, res) {
                    if (err) throw err;

                    newEmployee.role_id = res[0].id;

                    connection.query("SELECT * FROM employee;", function (err, res) {
                        if (err) throw err;
                        inquirer
                            .prompt([
                                {
                                    name: "manager",
                                    type: "list",
                                    choices: function () {
                                        let choiceArray = [];
                                        for (var i = 0; i < res.length; i++) {
                                            choiceArray.push(res[i].first_name);
                                        }
                                        return choiceArray;
                                    },
                                    message: "Who will be the employee's manager?"
                                }
                            ])
                            .then(function (response) {
                                connection.query("SELECT id FROM employee WHERE first_name = ?", response.manager, function (err, res) {
                                    if (err) throw err;
                                    newEmployee.manager_id = res[0].id;

                                    connection.query('INSERT INTO employee SET ?', newEmployee, function (err, res) {
                                        if (err) throw err;
                                        console.log("Employee added!");
                                        init();
                                    })
                                })
                            });
                    });
                });
            });
    })
};

module.exports = {
    addDepartment: addDepartment,
    addRole: addRole,
    addEmployee: addEmployee
};