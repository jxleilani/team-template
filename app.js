const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let team = [];
let employeeObj = {};
let employee = {};
getTeam();

async function getTeam() {
    try {
        //prompt for employee type
        const empType = await promptEmpType();
        if(empType.employeeType === 'Manager'){
            employeeObj = await managerPrompt();
            employee = new Manager(employeeObj.name,employeeObj.id,employeeObj.email,employeeObj.office);
        }else if(empType.employeeType === 'Engineer'){
            employeeObj = await engineerPrompt();
            employee = new Engineer(employeeObj.name,employeeObj.id,employeeObj.email,employeeObj.github);
        }else if(empType.employeeType === 'Intern'){
            employeeObj = await internPrompt();
            employee = new Intern(employeeObj.name,employeeObj.id,employeeObj.email,employeeObj.school);
        }
        team.push(employee);
        //then prompt user to create additional employees
        const newEmp = await inquirer.prompt([
                {
                    type:"list",
                    name: "newEmp",
                    message: "Do you want to create another employee?",
                    choices: ["Yes", "No"]
                }
        ]);
        if(newEmp.newEmp === "Yes"){ //if Yes, create additional employees
            getTeam();
        }else{ //if No, render team.html
            fs.writeFile(outputPath,render(team),function(err){
                if (err){
                    throw err;
                }
            });
        }

    } catch (err) {
        console.log(err);
    }
}

function promptEmpType() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'employeeType',
            message: 'Select Employee Type:',
            choices: ['Manager', 'Engineer', 'Intern']
        }
    ]);
}
function managerPrompt() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter employee name:'
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter employee ID:'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter employee email:'
        },
        {
            type: 'input',
            name: 'office',
            message: 'Enter employee office number:'
        }
    ]);
}
function engineerPrompt() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter employee name:'
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter employee ID:'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter employee email:'
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter employee github username:'
        }
    ]);
}
function internPrompt() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter employee name:'
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter employee ID:'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter employee email:'
        },
        {
            type: 'input',
            name: 'school',
            message: 'Enter employee school:'
        }
    ]);
}
