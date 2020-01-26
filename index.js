const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const questions = ['Enter your GitHub username', "What is your favorite color?"];

inquirer
   .prompt([
   {
       type: "input",
       message: questions[0],
       name: "username"
    }
    ,
   {
       type: "input",
       message: questions[1],
       name: "color"
   }
])
 
.then(({username}) => {
    const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
    axios.get(queryUrl).then(res => {
       console.log(res)
        const repoNames = res.data.map(repo => repo.name + "\n");
        fs.writeFile("repos.txt", repoNames, (err, data) => {
            if (err) {
                console.log(err);
            }
            console.log(`You saved ${repoNames.length}`);
        });
    });
});

/*
const questions = [
  
];

function writeToFile(fileName, data) {
 
}

function init() {

init();

}

*/