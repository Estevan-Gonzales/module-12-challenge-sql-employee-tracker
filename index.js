const inquirer = require('inquirer');
const mysql = require('mysql2');

const criteria = [
    {
        type: "list",
        message: "Please select an option",
        name: "selection",
        choices: [
            "View all Departments",
            "View all Roles",
            "View all Employees",
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "Update an Employee Role",
            "Quit"
        ]
    }
];


function startPrompt() {
    return inquirer.prompt(criteria).then((data) => {
        switch (data.selection) {
            case "View all Departments":
                getDepartments();
                startPrompt();
                break;
            case "View all Roles":
                exit = 1;
                getRoles();
                startPrompt();
                break;
            case "View all Employees":
                getEmployees();
                startPrompt();
                break;
            case "Add a Department":
                console.clear;
                let department_response = {"type": "input", "name": "department_name", "message": "What is the department name?"}
                inquirer.prompt(department_response).then((data) => {
                    addDepartment(data.department_name);
                });
                startPrompt();
                break;
            case "Add a Role":
                let role_response = [
                    {"type": "input", "name": "title", "message": "What is the role name?"},
                    {"type": "input", "name": "salary", "message": "What is the role salary?"},
                    {"type": "input", "name": "department_id", "message": "What is the department_id?"}
                ]
                inquirer.prompt(role_response).then((data) => {
                    addRole(data);
                });
                startPrompt();
                break;
            case "Add an Employee":
                let employee_response = [
                    {"type": "input", "name": "first_name", "message": "What is the employee's first name?"},
                    {"type": "input", "name": "last_name", "message": "What is the employee's last name?"},
                    {"type": "input", "name": "role_id", "message": "What is the role_id?"},
                    {"type": "input", "name": "manager_id", "message": "What is the manager_id?"}

                ]
                inquirer.prompt(employee_response).then((data) => {
                    addRole(data)
                });
                startPrompt();
                break;
            case "Update an Employee Role":
                startPrompt();
                break;
            case "Quit":   
                1 == 1;
                break;

        }
    });
}

const db = mysql.createConnection(
    {
      host: 'j21q532mu148i8ms.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
      // MySQL username,
      user: 'jzio8hj2vqlkwmiw',
      // TODO: Add MySQL password here
      password: 'd2rabo9r02bjhc9e',
      database: 'kf6saag0gxb257p7'
    },
    console.log(`Connected to database.`)
  );


startPrompt();


function getDepartments() {
    db.query(`SELECT * FROM department`, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
      });
}

function getRoles() {
    db.query(`SELECT * FROM role`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result);
        });
    }

function getEmployees() {
    db.query(`SELECT * FROM employee`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result);
        });
    }

function addDepartment(department) {
    db.query(`INSERT INTO department (name) VALUES (?)`, department);
}

function addRole(data) {
    const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
    const params = [data.title, data.salary, data.department_id]
    db.query(query, params);
}

function addEmployee(data) {
    db.query(`INSERT INTO department (name) VALUES (?)`, department);
}