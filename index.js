const cTable = require('console.table');
const inquirer = require('inquirer');
const { queries } = require('./db/connection');
const db = require('./db/connection');

// main menu prompts to view tables or add to tables
const mainMenu = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'promptResponse',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update employee role', 'Delete a department', 'Delete a role', 'Delete an employee', 'EXIT']
        }
    ])
        .then(data => {

            if (data.promptResponse === 'View all departments') {
                viewDepartments();
            }
            if (data.promptResponse === 'View all roles') {
                viewRoles();
            }
            if (data.promptResponse === 'View all employees') {
                viewEmployees();
            }
            if (data.promptResponse === 'Add a department') {
                addDepartment();
            }
            if (data.promptResponse === 'Add a role') {
                addRole();
            }
            if (data.promptResponse === 'Add an employee') {
                addEmployee();
            }
            if (data.promptResponse === 'Update employee role') {
                updateRole();
            }
            if (data.promptResponse === 'Delete a department') {
                deleteDepartment();
            }
            if (data.promptResponse === 'Delete a role') {
                deleteRole();
            }
            if (data.promptResponse === 'Delete an employee') {
                deleteEmployee();
            }
            if (data.promptResponse === 'EXIT') {
                db.end();
            }
        })
}
// initiates the function when user runs node index
mainMenu();