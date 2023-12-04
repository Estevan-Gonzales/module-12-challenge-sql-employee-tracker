
function startPrompt() {
    return inquirer.prompt(criteria).then((data) => {
        switch (data.selection) {
            case "View all Departments":
                getDepartments();
                //startPromt();
                break;
            case "View all Roles":
                getRoles();
                //startPromt();
                break;
            case "View all Employees":
                getEmployees();
                //startPromt();
                break;
            case "Add a Department":
                console.clear;
                let department_response = {"type": "input", "name": "department_name", "message": "What is the department name?"}
                inquirer.prompt(department_response).then((data) => {
                    addDepartment(data.department_name);
                });
                //startPromt();
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
                break;
            case "Update an Employee Role":
                console.log("Here");
                break;
            case "Quit":
                return 1;
                break;
                1==1;
            default:
                "Not a choice";
                break;

        }
    });
}