const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

const questions = ['Which Employee Type Do You Want to Add?', "Enter Your Name.", "Enter Your Email.", "Enter Your ID No."];
const teamMembers = [];
const idArray = [];

const engineer = require("/engineer.html");


async function promptUser() {
    return inquirer.prompt([
        {
          type: "list",
          message: questions[0],
          choices: ["manager", "engineer", "intern"],
          name: "employee"
        }
         ,
        {
          type: "input",
          message: questions[1],
          name: "name"
        }
        ,
        {
          type: "input",
          message: questions[2],
          name: "email"
        }
        ,
        {
          type: "input",
          message: questions[3],
          name: "id"
        }
       
        
    ]).then(data => {
        const {
            employee,
            name,
            email
        } = data;
        console.log(data);
        return getGihubInfo(username, color)
    }).catch(err => console.log(err))
  }

  function getGihubInfo(username, color) {
    const queryUrl = `https://api.github.com/users/${username}`;
    return axios.get(queryUrl).then(res => {


       let myName = res.data.name;
       let url = res.data.html_url;
       let blog = res.data.blog;
       let location = res.data.location;
       let bio = res.data.bio;
       let avatar = res.data.avatar_url;

       let repos = res.data.public_repos;
       let followers = res.data.followers;
       let following = res.data.following
       let stars = res.data.starred_url;

      
     
      const html = generateHTML(res, colors[color]);
      return html;
     // console.log(html);
    });
};

function generateHTML(res, colors) {
    return `<!DOCTYPE html>
  <html lang="en">
     
      </html> 
        `
          }

          async function init() {
            console.log("hi")
            try {
              const html = await promptUser();
              await writeFileAsync("profile.html", html);
              console.log("Successfully wrote to profile.html");
            } catch(err) {
              console.log(err);
            }
          }
init();

