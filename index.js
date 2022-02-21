const cTable = require('console.table');
const inquirer = require('inquirer');
const { queries } = require('./db/connection');
const db = require('./db/connection');

// user response to view the departments table
const viewDepartments = () => {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table('Departments:', res);
        mainMenu();
    })
}

// user response to view the roles table
const viewRoles = () => {
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table('Roles:', res);
        mainMenu();
    })
}

// user response to view the employees table
const viewEmployees = () => {
    // table sections, combining tables to pull in title, dept and salaries
    const sql = `SELECT employees.id, employees.first_name, employees.last_name, employees.manager_id, roles.title, roles.salary, departments.id AS department
    FROM employees
    LEFT JOIN roles
    ON employees.role_id = roles.id
    LEFT JOIN departments
    ON roles.dept_id = departments.id`;

    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table('Employees:', res);
        mainMenu();
    })
}
// initiate user adding a department, prompt response 
const newDept = () => {
    return inquirer.prompt([
        {
            type: 'text',
            name: 'deptName',
            message: 'Please provide the department name you would like to add?',
            validate: deptName => {
                if (deptName) {
                    return true;
                } else {
                    console.log('Dont forget to enter a department name!');
                    return false;
                }
            }
        }
    ]) // insert new department data into the Departments table
        .then(data => {
            const sql = `INSERT INTO departments (name) VALUES (?)`;
            const params = [
                data.name
            ];
            db.query(sql, params, (err, res) => {
                if (err) throw err;
                viewDepartments();
                console.log(`${data.name} added!`)
            });
        })
}
// initiate user adding a new role/job title, prompt response
const newRole = () => {
    return inquirer.prompt([
        {
            type: 'text',
            name: 'jobTitle',
            message: 'Please provide the role you would like to add?',
            validate: jobTitle => {
                if (jobTitle) {
                    return true;
                } else {
                    console.log('Dont forget to enter a role/job title!');
                    return false;
                }
            }

        },
        { // prompt for salary of role named
            type: 'text',
            name: 'salary',
            message: 'Please provide the salary for the role you would like to add?',
            validate: salary => {
                if (salary) {
                    return true;
                } else {
                    console.log('Dont forget to enter a salary!');
                    return false;
                }
            }
        },
        { // prompt for department ID of role named
            type: 'text',
            name: 'deptId',
            message: 'Please provide the department ID of the role you would like to add?',
            validate: deptId => {
                if (deptId) {
                    return true;
                } else {
                    console.log('Dont forget to enter a department ID!');
                    return false;
                }
            }
        }
    ]) // insert new role/job title data into the Roles table
        .then(data => {
            console.log(data);
            const sql = `INSERT INTO roles (title, salary, dept_id) VALUES (?,?,?)`;
            const params = [
                data.jobTitle,
                data.salary,
                data.deptId
            ];
            db.query(sql, params, (err, res) => {
                if (err) throw err;
                viewRoles();
                console.log(`${data.jobTitle} added!`)
            });
        })
}
// initiate user adding a new employee, prompt response
const newEmployee = () => {
    return inquirer.prompt([
        { // prompt to add first name
            type: 'text',
            name: 'firstName',
            message: 'Please provide the first name of the employee you would like to add?',
            validate: firstName => {
                if (firstName) {
                    return true;
                } else {
                    console.log('Dont forget to enter their first name!');
                    return false;
                }
            }

        },
        { // prompt to add last name
            type: 'text',
            name: 'lastName',
            message: 'Please provide the last name of the employee you would like to add?',
            validate: lastName => {
                if (lastName) {
                    return true;
                } else {
                    console.log('Dont forget to enter their last name!');
                    return false;
                }
            }
        },
        { // prompt to choose an role ID 
            type: 'text',
            name: 'roleId',
            message: 'Please provide the role ID of the employee you would like to add?',
            validate: roleId => {
                if (roleId) {
                    return true;
                } else {
                    console.log('Dont forget to enter their role ID!');
                    return false;
                }
            }
        },
        { // prompt to choose a manager ID
            type: 'text',
            name: 'managerId',
            message: 'Please provide the manager ID of the employee you would like to add?'
        }
    ]) // insert new employee data into the Employees table
        .then(data => {
            console.log(data);
            const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
            const params = [
                data.firstName,
                data.lastName,
                data.roleId,
                data.managerId
            ];
            db.query(sql, params, (err, res) => {
                if (err) throw err;
                console.log(res);
                viewEmployees();
                console.log(`${data.firstName} ${data.lastName} added!`)
            });
        })
}
// initiate user ability to update an employee role
const updateRole = () => {
    return inquirer.prompt([
        { // prompt to indicate the employee ID
            type: 'text',
            name: 'currentRole',
            message: 'Please provide the ID of the employee you would like to update?'
        },
        { // prompt to indicate the new role ID 
            type: 'text',
            name: 'updatedRole',
            message: 'Please provide the ID of the new role of the employee?'
        }
    ]).then(data => { // update the Employees table to replace selected employees role ID
        console.log(data);
        const sql = `UPDATE employees SET role_id = ?
            WHERE employees.id = ?`;
        const params = [
            data.updatedRole,
            data.currentRole
        ];
        db.query(sql, params, (err, res) => {
            if (err) throw err;
            console.log(res);
            viewEmployees();
            console.log(`Role updated to ID ${data.updatedRole}`)
        });
    });
}


// main menu prompts to view tables or add to tables
const mainMenu = () => {
    console.log(`
    ==================================================
    Main Menu, please select from options listed below
    ==================================================
    `);
    return inquirer.prompt([
        {
            type: 'list',
            name: 'promptResponse',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update employee role', 'Delete a department', 'Delete a role', 'Delete an employee', 'EXIT']
        }
    ]) // connecting user selction response
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
                newDept();
            }
            if (data.promptResponse === 'Add a role') {
                newRole();
            }
            if (data.promptResponse === 'Add an employee') {
                newEmployee();
            }
            if (data.promptResponse === 'Update employee role') {
                updateRole();
            }
            if (data.promptResponse === 'EXIT') {
                db.end();
            }
        })
}
// initiates the function when user runs node index
mainMenu();


// start of adding delete function

 // if (data.promptResponse === 'Delete a department') {
            //     deleteDepartment();
            // }
            // if (data.promptResponse === 'Delete a role') {
            //     deleteRole();
            // }
            // if (data.promptResponse === 'Delete an employee') {
            //     deleteEmployee();
// }