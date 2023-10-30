const inquirer = require('inquirer');

const criteria = [
    {"type": "input", "name": "text", "message": "What do you want to do?"},
    {"type": "input", "name": "asdf", "message": "What do you want to do now?"}
];

function startPromt() {
    inquirer.prompt(criteria).then((data) => {
        console.log(data);
    });
}

startPromt();