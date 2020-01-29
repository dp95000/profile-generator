const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const questions = ['Enter your GitHub username', "What is your favorite color?"];


function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            message: questions[0],
            name: "username"
         }
         ,
        {
            type: "list",
            message: questions[1],
            choices: ["green", "red", "blue", "pink"],
            name: "color"
        }
        
    ]).then(data => {
        const {
            username,
            color
        } = data;
        getGihubInfo(username)
    }).catch(err => console.log(err))
  }

  function getGihubInfo(username) {
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

       const pdf = require("./generateHTML.js");

       promptUser()
        .then(function(answers) {
            const newFile = generateHTML(answers);

            return writeFileAsync("index.html", html);
        })
        .then(function() {
            console.log("Successfully wrote to index.html");
        })
        .catch(function(err) {
            console.log(err);
        });


    });
};
promptUser();
