//installed packages
const inquirer = require("inquirer");
const fs = require("fs");

//class files
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

//template files
const indexTemp = require("./templates/indexTemp");
const managerTemp = require("./templates/managerTemp");
const engineerTemp = require("./templates/engineerTemp");
const internTemp = require("./templates/internTemp");

const roles = [Manager, Engineer, Intern];
const teamMembers = []; //store the generated team members from user input

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

        const person = new roles[x](res.name, res.id, res.email, res.unique); //still need to fix email and title???????? can use questions[x].role?

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
                switchFunc();
            }
        } 
        else if(choice !== "y" || choice !== "n") {
            console.log("Please input a correct character:");
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
                return console.log("Something's gone wrong!");
        }
    });
    const index = indexTemp(myTeam.join("\n")); //combine the split team member string literals and insert into index.html
    generateHTML(index);
}

const generateHTML = myTeam => { //param1 is the string literal with the values filled in
    fs.writeFile("./output/myTeam.html", myTeam, function(err) { //need to access templates
        if(err) {
            return console.log(err);
        }
        console.log("success!");
    });
}

const startApp = () => { //not necessary atm but cleans it up a little
    question();
}

startApp();