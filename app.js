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

//installed packages
const inquirer = require("inquirer");
const fs = require("fs");

//class files
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

const roles = [Manager, Engineer, Intern];
const teamMembers = [];

let x = 0; //counter for question display/array

const questions = [
    {
        name: "What is the manager's name?",
        id: "What is the manager's Id?",
        email: "Please enter the manager's email address:",
        unique: "Please enter the manager's office number:",
        role: "Manager",
        input: ["name", "id", "email", "unique"] //unique = office
    },
    {
        name: "What is the engineer's name?",
        id: "What is the engineer's Id?",
        email: "Please enter the engineer's email address:",
        unique: "Please enter the engineer's github username:",
        role: "Engineer",
        input: ["name", "id", "email", "unique"] //unique = github
    },
    {
        name: "What is the intern's name?",
        id: "What is the intern's Id?",
        email: "Please enter the intern's email address:",
        unique: "Please enter the intern's school:",
        role: "Intern",
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

        const person = new roles[x](res.name, res.id, questions[x].role, res.email, res.unique); //still need to fix email and title????????

        teamMembers.push(person); //add the new team member to the teamMembers array

        if(person.getRole() !== "Manager") {
            askAgain();
        }
        else {
            x++;
            question();
        }
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
            question();
        }
        else if(choice === "n") {
            x++; //moves on to next role to fill
            if(x<3) {
                question();
            }
            else if(x=3) {
                return console.log(teamMembers);
            }
        } 
        else if(choice !== "y" || choice !== "n") {
            console.log("Please input a correct character:");
            askAgain();
        }
    });
}

const generateHTML = param1 => {
    fs.writeFile()
}

const startApp = () => {
    question().then(() => {
        teamMembers.forEach(member => {
            switch(member.getRole()) {
                case "Manager":
                    return generateHTML(member);
                case "Engineer":
                    return generateHTML(member);
                case "Intern":
                    return generateHTML(member);
                default:
                    return console.log("Something's gone wrong!");
            }
        });
    });
    //generate html from teamMembers array
}

startApp();