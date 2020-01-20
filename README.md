# Template Engine

A node.js application to dynamically create an engineering team based on user inputs. A team would consist of one manager and any number of engineers or interns. Each team member will have thier name, Idenitificaion number and email address recorded along with a unqiue piece of information for each relating role, i.e Team manager - office number, Engineer - github account and Intern - school.

![Gif](/images/application.gif?raw=true "Gif") 

The user will be prompted in the order of manager, engineers and then interns. At the end of each engineer or intern input the user will be asked if they want to add another member of that role, selecting no will move to the next role or finish the input depending on where they are at.

![prompt function](/images/promptSS.png?raw=true "prompt function") 

Each of the inputs are validated upon entry and will not allow incorrect answers, i.e numbers in names, email format etc. If an incorrect answer is given the user is prompted to input a valid one.

![valid function](/images/validSS.png?raw=true "valid function") 

After the user has enter all the relavent information for each team member the application will produce a html file displaying each team member in thier own personal info card.

![output function](/images/outputSS.png?raw=true "output function") 

# Built with

node.js

# Authors 

Edward Coad

# Acknowledgements

stackoverflow.com\
w3school.com\