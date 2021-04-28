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

function addEmployee() {

}

module.exports = {
    addDepartment: addDepartment,
    addRole: addRole,
    addEmployee: addEmployee
};