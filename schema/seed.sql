-- Departments

INSERT INTO department (name)
VALUES 
("Sales"), 
("Engineering"), 
("Finance"), 
("Legal");

SELECT * FROM department;

-- Roles

INSERT INTO role (title, salary, department_id)
VALUES 
("Sales Lead", 100000.00, 1),
("Salesperson", 80000.00, 1),
("Lead Engineer", 150000.00, 2),
("Software Engineer", 120000.00, 2),
("Account Manager", 155000.00, 3),
("Accountant", 125000.00, 3),
("Legal Team Lead", 250000.00, 4),
("Lawyer", 190000.00, 4);

SELECT * FROM role;

-- Managers

INSERT INTO employee (first_name, last_name, role_id)
VALUES 
("Lawson", "Overton", 1),
("Elena", "Arrington", 3),
("Alvina", "Lawrence", 5),
("Brion", "Bourke", 7);

-- Employees

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Royce", "Power", 2, 1),
("Brooks", "Lyndon", 2, 1),
("Evonne", "Carver", 4, 3),
("Rena", "Parkins", 4, 3),
("Mary", "Pilgrim", 6, 5),
("Star", "Smythe", 6, 5),
("Lester", "Burrell", 8, 7),
("Zachary", "Hackett", 8, 7);

SELECT * FROM employee;