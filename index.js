const connection = require("./DB/connection");
const inquirer = require("inquirer");
console.log("Welcome to the console!");

function viewAllDepartments() {
  connection
    .promise()
    .query(
      `SELECT *
    FROM department`
    )
    .then((res) => {
      console.table(res[0]);
      //maybe start() again
      setTimeout(start, 3000);
    });
}

function createADepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the department?",
      },
    ])
    .then((res) => {
      connection
        .promise()
        .query(
          `
                INSERT INTO department (name)
                VALUES ('${res.name}')
                `
        )
        .then((res) => viewAllDepartments());
    });
}

function viewRole() {
  connection
    .promise()
    .query(
      `SELECT *
    FROM role`
    )
    .then((res) => {
      console.table(res[0]);
      //maybe start() again
      setTimeout(start, 3000);
    });
}

function viewEmployee() {
  connection
    .promise()
    .query(
      `SELECT *
    FROM employee`
    )
    .then((res) => {
      console.table(res[0]);
      //maybe start() again
      setTimeout(start, 3000);
    });
}

function createRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the name of the role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the role?",
      },
      {
        type: "input",
        name: "department_id",
        message: "What is the department id of the role?",
      },
    ])
    .then((res) => {
      connection
        .promise()
        .query(
          `
     INSERT INTO role SET ?
      `,
          res
        )
        .then((res) => {
          console.info("role created!")
        //after res, we're going to hit the main menu again
        // setTimeout(start, 2000)
        viewRole()
        });
    })
}

function createEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the first name of the employee?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the last name of the employee?",
      },
      {
        type: "list",
        name: "role_id",
        message: "What is the role id of the employee?",
        choices: [{name: "Senior Quality Control", value: 1}, {name: "Head of Sales", value: 2}, {name: "Senior Marketing Lead", value: 3}, {name: "Adminstrator of Finance", value: 4}, {name: "CEO", value: 5}]
      },
      {
        type: "list",
        name: "manager_id",
        message: "Who is the manager of the employee?",
        choices: [{name: "Jim Hartford", value: 5}]
      },
    ])
    .then((res) => {
      connection
        .promise()
        .query(
          `
     INSERT INTO employee SET ?
      `,
          res
        )
        .then((res) => {
          console.info("employee created!")
        //after res, we're going to hit the main menu again
        // setTimeout(start, 2000)
        viewEmployee()
        });
    });
}

function updateEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "id",
        message: "What is the employees id?",
      },
      {
        type: "confirm",
        name: "name",
        message: "Would you like to update the employee's name?",
      },
      {
        type: "input",
        name: "first_name",
        message: "What is the first name of the employee?",
        when: (hash) => hash.name
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the last name of the employee?",
        when: (hash) => hash.name
      },
      {
        type: "confirm",
        name: "role",
        message: "Would you like to update the employee's role id?",
      },
      {
        type: "list",
        name: "role_id",
        message: "What is the role of the employee?",
        choices: [{name: "Senior Quality Control", value: 1}, {name: "Head of Sales", value: 2}, {name: "Senior Marketing Lead", value: 3}, {name: "Adminstrator of Finance", value: 4}, {name: "CEO", value: 5}],
        when: (hash) => hash.role
      },
      {
        type: "confirm",
        name: "manager",
        message: "Would you like to update the employee's manager?",
      },
      {
        type: "list",
        name: "manager_id",
        message: "Who is the manager of the employee?",
        choices: [{name: "Jim Hartford", value: 5}],
        when: (hash) => hash.manager
      },
    ])
    .then(({ first_name, last_name, role_id, manager_id, id}) => {

      const insertVals = {first_name, last_name, role_id, manager_id}
      connection
        .promise()
        .query(
          `
      update employee SET ? WHERE id = ${id}
      `,
          insertVals
        )
        .then((res) => {
          console.info("update employee created!")
        //after res, we're going to hit the main menu again
        setTimeout(start, 2000)
        });
    });
}

function start() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Create a department",
          "Create a role",
          "Create an employee",
          "Update an employee",
          "Exit",
        ],
      },
    ])
    .then((res) => {
      console.log("then block", res);
      switch (res.action) {
        case "Create a department":
          return createADepartment();

        case "View all departments":
          return viewAllDepartments();

        case "View all roles":
          return viewRole();

        case "View all employees":
          return viewEmployee();

        case "Create a role":
          return createRole();

        case "Create an employee":
          return createEmployee();

        case "Update an employee":
          return updateEmployee();

        default:
          console.log('end of cases, no matches found')
      }
    })
    .catch((err) => {
      console.log("error block", err);
      connection
        .promise()
        .query(
          `
    CREATE DATABASE ${process.env.DB_NAME}
    `
        )
        .then((res) => {
          console.log("We created you a database!");
          connection.promise().query(`SELECT *
        FROM information_schema.tables
        WHERE table_schema = '${process.env.DB_NAME}'`);
        })
        .catch((err) => {
          console.log(err);
        });
    });
}

start();
