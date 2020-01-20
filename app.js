//installed packages
const inquirer = require("inquirer");
const fs = require("fs");
const chalk = require("chalk");

//class files
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

//template files
const indexTemp = require("./templates/indexTemp");
const managerTemp = require("./templates/managerTemp");
const engineerTemp = require("./templates/engineerTemp");
const internTemp = require("./templates/internTemp");

//role options for input
const roles = [Manager, Engineer, Intern];

//generated team members from user input
const teamMembers = []; 

//counter for question display/array
let x = 0; 

const questions = [
    {
        name: "What is the manager's name?",
        id: "- What is the manager's Id?",
        email: "- Please enter the manager's email address:",
        unique: "- Please enter the manager's office number:",//unique = office
        val: async unique => {
            if(unique.match(/^[0-9]+$/)) {
                return true;
            }
            return chalk.red("Please enter a valid number");
        }
    },
    {
        name: "What is the engineer's name?",
        id: "- What is the engineer's Id?",
        email: "- Please enter the engineer's email address:",
        unique: "- Please enter the engineer's github username:",//unique = github
    },
    {
        name: "What is the intern's name?",
        id: "- What is the intern's Id?",
        email: "- Please enter the intern's email address:",
        unique: "- Please enter the intern's school:",//unique = school
    }
];

const question = () => {
    return inquirer
    .prompt([{
        type: "input",
        message: chalk.cyan(questions[x].name),
        name: "name",
        validate: async name => {
            if(name.match(/^[A-Za-z\s]+$/)) {
                return true;
            }
            return chalk.red("Please enter a valid name");
        }
    },
    {
        type: "input",
        message: chalk.blue(questions[x].id),
        name: "id",
        validate: async id => {
            if(id.match(/^[0-9]+$/)) {
                return true;
            }
            return chalk.red("Please enter a valid number");
        }
    },
    {
        type: "input",
        message: chalk.blue(questions[x].email),
        name: "email",
        validate: async id => {
            if(id.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                return true;
            }
            return chalk.red("Please enter a valid email");
        }
    },
    {
        type: "input",
        message: chalk.blue(questions[x].unique),
        name: "unique",
        validate: questions[x].val //only validation needed for manager as github/school can use any characters hence no val in other questions
    }]).then(function(res) {
        const person = new roles[x](res.name, res.id, res.email, res.unique);

        teamMembers.push(person); //add the new team member to the teamMembers array

        if(person.getRole() !== "Manager") { //only one manager per team
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
        message: chalk.magenta("Would you like to add another? (Y/N)"),
        name: "continue",
    }]).then(function(response) {
        let choice = response.continue.toLowerCase();
        let length = roles.length; //allowing for scalability for different roles
        if (choice === "y") {
            question();
        }
        else if(choice === "n") {
            x++; //moves on to next role to fill
            if(x<length) {
                question();
            }
            else if(x=length) {
                switchFunc();
            }
        } 
        else if(choice !== "y" || choice !== "n") {
            chalk.red(console.log("Please input a correct character:"));
            askAgain();
        }
    });
}

const switchFunc = () => { //generate html from teamMembers array
    const myTeam = [];
    teamMembers.forEach(member => {
        switch(member.getRole()) {
            case "Manager":
                let man = managerTemp(member);
                return myTeam.push(man);
            case "Engineer":
                let eng = engineerTemp(member);
                return myTeam.push(eng);
            case "Intern":
                let int = internTemp(member);
                return myTeam.push(int);
            default:
                return chalk.red(console.log("Something's gone wrong!"));
        }
    });
    const index = indexTemp(myTeam.join("\n")); //combine the split team member string literals and insert into index.html
    generateHTML(index);
}

const generateHTML = output => { //param1 is the string literal with the values filled in
    fs.writeFile("./output/myTeam.html", output, function(err) {
        if(err) {
            return chalk.red(console.log(err));
        }
        console.log("success!");
    });
}

question();