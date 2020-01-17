//installed packages
const inquirer = require("inquirer");
const fs = require("fs");

//class files
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

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
    teamMembers.forEach(member => {
        switch(member.getRole()) {
            case "Manager":
                return generateManager(member);
                // return generateHTML(member);
            case "Engineer":
                return generateEngineer(member);
                // return generateHTML(member);
            case "Intern":
                return generateIntern(member);
                // return generateHTML(member);
            default:
                return console.log("Something's gone wrong!");
        }
    });
    //find a better way to do this ---------------------------------------
    strings.unshift(initial);
    strings.push(end);
    console.log(strings);
    fs.writeFile("./output/team.html", strings.join(" "), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("success!");
    });
    //find a better way to do this ---------------------------------------
}

// const generateHTML = param1 => { //param1 is the object for each team member
//     const data = fs.readFileSync("./templates/"+(param1.getRole()).toLowerCase()+".html", function(err, data){
//         if(err) {
//             return console.log(err);
//         }
//         return data;
//     });
    
//     const card = data.toString();
//     console.log(card);

//     fs.writeFile("./output/" +param1.name+".html", card, function(err) { //need to access templates
//         if(err) {
//             return console.log(err);
//         }
//         console.log("success!");
//     });
// }

const startApp = () => { //not necessary atm but cleans it up a little
    question();
}

startApp();



//find a better way to do this ---------------------------------------
const strings = [];

const generateManager = param1 => {
    const html = 
    `<div style="height:250px; width:200px; border: 1px solid black; padding:10px;">
        <h2>${param1.name}</h2>
        <h3>${param1.getRole()}</h3>
        <hr>
        <p>ID: ${param1.id}</p>
        <p>Email: ${param1.email}</p>
        <p>Office number: ${param1.getOfficeNumber()}</p>
    </div>`;
    strings.push(html);
}

const generateEngineer = param1 => {
    const html = 
    `<div style="height:250px; width:200px; border: 1px solid black; padding:10px;">
        <h2>${param1.name}</h2>
        <h3>${param1.getRole()}</h3>
        <hr>
        <p>ID: ${param1.id}</p>
        <p>Email: ${param1.email}</p>
        <p>Github: ${param1.getGithub()}</p>
    </div>`;
    strings.push(html);
}

const generateIntern = param1 => {
    const html = 
    `<div style="height:250px; width:200px; border: 1px solid black; padding:10px;">
        <h2>${param1.name}</h2>
        <h3>${param1.getRole()}</h3>
        <hr>
        <p>ID: ${param1.id}</p>
        <p>Email: ${param1.email}</p>
        <p>School: ${param1.getSchool()}</p>
    </div>`;
    strings.push(html);
}

const initial = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Engineering Team</title>
    <style>
        .title {
            display:inline-block; 
            margin-top:50px; 
            margin-left:50%; 
            transform:translateX(-50%); 
            color:darkorange;
        }
        .import {
            display:flex;
            justify-content:space-evenly;
            flex-wrap:wrap;
            margin-top:20px;
        }
    </style>
</head>
<body style="margin:0;">
    <header style="height:150px; width:100%; background-color:aquamarine;">
        <h1 class="title">My Team</h1>
    </header>
    <div class="import">`;

const end = 
`</div>
</body>
</html>`
//find a better way to do this ---------------------------------------