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
    const queryUrl = `https://api.github.com/users/${username}`;
    axios.get(queryUrl).then(res => {
      // console.log(res.data);
       console.log(res.data.name);
       console.log(res.data.html_url);
       console.log(res.data.blog);
       console.log(res.data.location);
       console.log(res.data.bio);
       console.log(res.data.avatar_url);

       console.log(res.data.public_repos);
       console.log(res.data.followers);
       console.log(res.data.following);
       console.log(res.data.starred_url);

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