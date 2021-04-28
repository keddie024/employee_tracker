const inquirer = require("inquirer");

function updateRole(connection, init) {

    let newEmployeeRole = {};

    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, e2.first_name AS manager FROM employee LEFT JOIN employee AS e2 ON e2.id = employee.manager_id JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "employee",
                    type: "list",
                    choices: function () {
                        let choiceArray = [];
                        for (var i = 0; i < res.length; i++) {
                            choiceArray.push(res[i].first_name);
                        }
                        return choiceArray;
                    },
                    message: "Which employee needs their role updated?"
                }
            ])
            .then(function (response) {

                newEmployeeRole.first_name = response.employee;

                connection.query("SELECT * FROM role", function (err, res) {
                    if (err) throw err;
                    inquirer
                        .prompt([
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
                                message: "What will be the employee's new role?"
                            }
                        ])
                        .then(function (response) {
                            connection.query("SELECT * FROM role WHERE title = ?", response.role, function (err, res) {
                                if (err) throw err;

                                newEmployeeRole.role_id = res[0].id;

                                connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [newEmployeeRole.role_id, newEmployeeRole.first_name], function (err, res) {
                                    if (err) throw (err);
                                    console.log('Employee updated!');
                                    init();
                                })

                            })
                        });
                });
            });
    })
};

module.exports = {
    updateRole: updateRole
}