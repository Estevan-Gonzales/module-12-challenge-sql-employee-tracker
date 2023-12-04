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
                return getDepartments();
            case "View all Roles":
                return getRoles();
            case "View all Employees":
                return getEmployees();
            case "Add a Department":
                let department_response = [{type: "input", name: "department_name", message: "What is the department name?"}]
                return inquirer.prompt(department_response).then((data) => {
                    addDepartment(data.department_name)
                });



            case "Add a Role":
                var departments = []
                returnDepartments(myArray => {
                    departments = myArray;
                    console.log(departments);
                    let role_response = [
                        {type: "input", name: "title", message: "What is the role name?"},
                        {type: "input", name: "salary", message: "What is the role salary?"},
                        {type: "list", name: "department_name", message: "Please select a department: ", choices: departments}
                    ]

                    inquirer.prompt(role_response).then((data) => {
                        addRole(data);
                    });
                });
                break;


            case "Add an Employee":
                var roles = []
                returnRoles(myArray => {
                    roles = myArray;
                    var managers = []
                    returnEmployees(newArray => {
                        managers = newArray;

                        let employee_response = [
                            {type: "input", name: "first_name", message: "What is the new employee's first name?"},
                            {type: "input", name: "last_name", message: "What is the new employee's last name?"},
                            {type: "list", name: "employee_role", message: "Please select a role for the new employee: ", choices: roles},
                            {type: "list", name: "manager_name", message: "Please select a manager: ", choices: managers}
                        ]
                        inquirer.prompt(employee_response).then((data) => {
                            addEmployee(data);
                        });


                    })

                });
                break;

            case "Update an Employee Role":
                var employees = []
                returnEmployees(myArray => {
                    employees = myArray;
                    var roles = []
                    returnRoles(newArray => {
                        roles = newArray;
                    
                        let employee_role_response = [
                            {type: "list", name: "employee_name", message: "Which employee's role do you want to update?", choices: employees},
                            {type: "list", name: "role_name", message: "Which role do you want to assign?", choices: roles}
                        ]
                        inquirer.prompt(employee_role_response).then((data) => {
                            updateEmployeeRole(data);
                        });
                    })

                });
                break;

            case "Quit":
                process.exit();
                


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
        console.table(result);
      });
    startPrompt();
}

function getRoles() {
    db.query(`SELECT * FROM role`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
        });
    startPrompt();

}

function getEmployees() {
    db.query(`SELECT * FROM employee`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
        });
    startPrompt();
}

function addDepartment(department) {
    db.query(`INSERT INTO department (name) VALUES (?)`, department);
    startPrompt();
}

function addRole(data) {
    console.log(data);
    const query = `INSERT INTO role (title, salary, department_id) SELECT ?, ?, d.id FROM department d WHERE name = ?`;
    const params = [data.title, data.salary, data.department_name]
    db.query(query, params);
    startPrompt();
}

function addEmployee(data) {
    const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) SELECT ?, ?, r.id, e.id FROM role r INNER JOIN employee e WHERE title = ? AND CONCAT(e.first_name, ' ', e.last_name) = ?`
    const params = [data.first_name, data.last_name, data.employee_role, data.manager_name]
    db.query(query, params);
    startPrompt();
}

function updateEmployeeRole(data) {
    const query =  `UPDATE employee SET role_id = (SELECT id FROM role WHERE title = ?) WHERE CONCAT(first_name, ' ', last_name) = ?`
    const params = [data.role_name, data.employee_name]
    db.query(query, params);
    startPrompt();
}

function returnRoles(cb) {
    db.query("SELECT title FROM role", (err, rows) => {
    if (err) throw err;
    let newArray = rows.map((row) => {
        return row.title;
    });
    cb(newArray);
    });
};

function returnEmployees(cb) {
    db.query("SELECT CONCAT(first_name , ' ',last_name ) name from employee", (err, rows) => {
        if (err) throw err;
        let newArray = rows.map((row) => {
            return row.name;
        });
        cb(newArray);
        });
};

function returnDepartments(cb) {
    db.query("SELECT name, id FROM department", (err, rows) => {
    if (err) throw err;
    let newArray = rows.map((row) => {
        return row;
    });
    cb(newArray);
    });
};