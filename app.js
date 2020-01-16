//ask user for manager input

//ask user for engineer input
//validate
//ask user if there is more engineers

//ask user for intern input
//validate
//ask user if there is more interns

//store that input

//put the input into the code

//generate the html

const inquirer = require("inquirer");

const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

const roles = [Manager, Engineer, Intern];

let x = 0;
const questions = [
    {
        name: "What is the manager's name?",
        id: "What is the manager's Id?",
        email: "Please enter the manager's email address:",
        unique: "Please enter the manager's office number:",
        input: ["name", "id", "email", "unique"] //unique = office
    },
    {
        name: "What is the engineer's name?",
        id: "What is the engineer's Id?",
        email: "Please enter the engineer's email address:",
        unique: "Please enter the engineer's github username:",
        input: ["name", "id", "email", "unique"] //unique = github
    },
    {
        name: "What is the intern's name?",
        id: "What is the intern's Id?",
        email: "Please enter the intern's email address:",
        unique: "Please enter the intern's school:",
        input: ["name", "id", "email", "unique"] //unique = school
    }
];

const question = () => {
    return inquirer
    .prompt([{
        type: "input",
        message: questions[x].name,
        name: questions[x].input[0]
    },
    {
        type: "input",
        message: questions[x].id,
        name: questions[x].input[1]
    },
    {
        type: "input",
        message: questions[x].email,
        name: questions[x].input[2]
    },
    {
        type: "input",
        message: questions[x].unique,
        name: questions[x].input[3]
    }]).then(function(res) {
        console.log(res);
        //area to put code into html file and save to variable
        const person = new roles[x](res.name, res.id, res.email, res.unique);
        console.log(person);
    });
}

const askAgain = () => {
    return inquirer
    .prompt([{
        type: "input",
        message: "Would you like to add another? (Y/N)",
        name: "continue",
    }]).then(function(response) {
        let choice = response.continue.toLowerCase();
        if (choice === "y") {
            question(); //replace with question() 
        }
        else if(choice === "n") {
            return;
        } 
        else if(choice !== "y" || choice !== "n") {
            console.log("Please input a correct character:");
            askAgain();
        }
    });
}

const startApp = () => { //not waiting for input
    question();
    x++;
    question();
    askAgain();
    x++;
    question();
    askAgain();
    //generate html
}

startApp();