const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { isNumber } = require("util");
const { doesNotMatch } = require("assert");

const teamMembers=[];
const idArray=[];

function appMenu(){
  function createManager(){
    inquirer.prompt([ {
      // console.log("please create team"),
      type: "input",
      message: "what is your manager's name?",
      name: "managerName",
      validate:function(answer){
        if(answer !== ""){
          return true;
        }
        return "Please enter atleast character "

      }
    },
    {
      type: "input",
      message: "what is your manager's id?",
      name: "managerId",
      validate:function(answer){
        
        if(isNaN(answer)){
         return "You need to provide a number ";
        
        }
        else if(answer == "0"){
          return "Number should be greater than '0' ";
        }
        else{
       return true;
        }
      }
      
    },
    {
      type: "input",
      message: "what is your manager's email?",
      name: "managerEmail",
    },
    {
      type: "input",
      message: "what is your manager's office number?",
      name: "managerOfficeNumber",
      validate:function(answer){
        
        if(isNaN(answer)){
         return "You need to provide a number ";
        
        }
        else if(answer == "0"){
          return "Number should be greater than '0' ";
        }
        else{
       return true;
        }
      }
    },]).then(response=>{
      const manager = new Manager(response.managerName, response.managerId, response.managerEmail, response.managerOfficeNumber)
      console.log(manager)
      teamMembers.push(manager);
   
      createTeam()
    });
  }
  function createTeam() {
    inquirer.prompt([
      {
        type: "list",
        name: "memberChoice",
        message: "Which type of team member would you like to add?",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members"
        ]
      }
    ]).then(userChoice => {
      switch(userChoice.memberChoice) {
      case "Engineer":
        addEngineer();
        break;
      case "Intern":
        addIntern();
        break;
      default:
        buildTeam();
      }
    });
  }
  function addEngineer() {
    inquirer.prompt([
      // engineer questions go here
      {
        type: "input",
        message: "what is your Engineer's name?",
        name: "engineersName",
      },
      {
        type: "input",
        message: "what is your Engineer's id?",
        name: "engineersId",
        validate:function(answer){
        
          if(isNaN(answer)){
           return "You need to provide a number ";
          
          }
          else if(answer == "0"){
            return "Number should be greater than '0' ";
          }
          else{
         return true;
          }
        }
        
      },
      {
        type: "input",
        message: "what is your Engineer's email?",
        name: "engineersEmail",
      },
      {
        type: "input",
        message: "what is your Engineer's github username?",
        name: "engineersGithubUsername",
      },
      
    ]).then(answers => {
      // do something with answers, make new Engineer()
      // add engineer to teamMembers array
      const engineer = new Engineer(answers.engineersName, answers.engineersId, answers.engineersEmail, answers.engineersGithubUsername)
      console.log(engineer)
      teamMembers.push(engineer);
      createTeam();
    });
  }
  function addIntern() {
    inquirer.prompt([
      // intern questions go ehre
      {
        type: "input",
        message: "what is your Intern's name?",
        name: "internsName",
      },
      {
        type: "input",
        message: "what is your Intern's id?",
        name: "internsId",
        validate:function(answer){
        
          if(isNaN(answer)){
           return "You need to provide a number ";
          
          }
          else if(answer == "0"){
            return "Number should be greater than '0' ";
          }
          else{
         return true;
          }
        }
      },
      {
        type: "input",
        message: "what is your Intern's email?",
        name: "internsEmail",
      },
      {
        type: "input",
        message: "what is your Intern's school?",
        name: "internsSchoolName",
      },
    ]).then(answers => {
      // do something with answers, make new Intern()
      // add intern to teamMembers array
      const intern = new Intern(answers.internsName, answers.internsId, answers.internsEmail, answers.internsSchoolName)
      console.log(intern)
      teamMembers.push(intern);

      createTeam();
    });
  }
  function buildTeam() {
    // build html files from teamMembers array

    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }
  createManager();
}


appMenu();




// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
