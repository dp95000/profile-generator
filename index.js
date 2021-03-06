const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const questions = ['Enter your GitHub username', "What is your favorite color?"];
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);


async function promptUser() {
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
        console.log(data);
        return getGihubInfo(username, color)
    }).catch(err => console.log(err))
  }

  function getGihubInfo(username, color) {
    const queryUrl = `https://api.github.com/users/${username}`;
    return axios.get(queryUrl).then(res => {
      // console.log(res.data);
      // console.log(res.data.name);
      // console.log(res.data.html_url);
      //console.log(res.data.blog);
      // console.log(res.data.location);
     //  console.log(res.data.bio);
      // console.log(res.data.avatar_url);

     //  console.log(res.data.public_repos);
     //  console.log(res.data.followers);
      // console.log(res.data.following);
     //  console.log(res.data.starred_url);

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

       const colors = {
        green: {
          wrapperBackground: "#E6E1C3",
          headerBackground: "#C1C72C",
          headerColor: "black",
          photoBorderColor: "#black"
        },
        blue: {
          wrapperBackground: "#5F64D3",
          headerBackground: "#26175A",
          headerColor: "white",
          photoBorderColor: "#73448C"
        },
        pink: {
          wrapperBackground: "#879CDF",
          headerBackground: "#FF8374",
          headerColor: "white",
          photoBorderColor: "#FEE24C"
        },
        red: {
          wrapperBackground: "#DE9967",
          headerBackground: "#870603",
          headerColor: "white",
          photoBorderColor: "white"
        }
      };
     
      const html = generateHTML(res, colors[color]);
      return html;
     // console.log(html);
    });
};

function generateHTML(res, colors) {
    return `<!DOCTYPE html>
  <html lang="en">
     <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
        <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
        <title>Document</title>
        <style>
            @page {
              margin: 0;
            }
           *,
           *::after,
           *::before {
           box-sizing: border-box;
           }
           html, body {
           padding: 0;
           margin: 0;
           }
           html, body, .wrapper {
           height: 100%;
           }
           .wrapper {
           background-color: ${colors.wrapperBackground};
           padding-top: 100px;
           }
           body {
           background-color: white;
           -webkit-print-color-adjust: exact !important;
           font-family: 'Cabin', sans-serif;
           }
           main {
           background-color: #E9EDEE;
           height: auto;
           padding-top: 30px;
           }
           h1, h2, h3, h4, h5, h6 {
           font-family: 'BioRhyme', serif;
           margin: 0;
           }
           h1 {
           font-size: 3em;
           }
           h2 {
           font-size: 2.5em;
           }
           h3 {
           font-size: 2em;
           }
           h4 {
           font-size: 1.5em;
           }
           h5 {
           font-size: 1.3em;
           }
           h6 {
           font-size: 1.2em;
           }
           .photo-header {
           position: relative;
           margin: 0 auto;
           margin-bottom: -50px;
           display: flex;
           justify-content: center;
           flex-wrap: wrap;
           background-color: ${colors.headerBackground};
           color: ${colors.headerColor};
           padding: 10px;
           width: 95%;
           border-radius: 6px;
           }
           .photo-header img {
           width: 250px;
           height: 250px;
           border-radius: 50%;
           object-fit: cover;
           margin-top: -75px;
           border: 6px solid ${colors.photoBorderColor};
           box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
           }
           .photo-header h1, .photo-header h2 {
           width: 100%;
           text-align: center;
           }
           .photo-header h1 {
           margin-top: 10px;
           }
           .links-nav {
           width: 100%;
           text-align: center;
           padding: 20px 0;
           font-size: 1.1em;
           }
           .nav-link {
           display: inline-block;
           margin: 5px 10px;
           }
           .workExp-date {
           font-style: italic;
           font-size: .7em;
           text-align: right;
           margin-top: 10px;
           }
           .container {
           padding: 50px;
           padding-left: 100px;
           padding-right: 100px;
           }
  
           .row {
             display: flex;
             flex-wrap: wrap;
             justify-content: space-between;
             margin-top: 20px;
             margin-bottom: 20px;
           }
  
           h3.center {
            text-align: center;
            display: block;
            margin-right: auto;
            margin-left: auto;
           }
  
           .card {
             padding: 20px;
             border-radius: 6px;
             background-color: ${colors.headerBackground};
             color: ${colors.headerColor};
             margin: 20px;
             text-align: center;
             width: 45%;
           }
           
           .col {
           flex: 1;
           text-align: center;
           }
  
           a, a:hover {
           text-decoration: none;
           color: inherit;
           font-weight: bold;
           }
  
           @media print { 
            body { 
              zoom: .75; 
            } 
           }
        </style>
      </head> 
      </head>
      <body>
      
          <div class="wrapper">
          <div class="container">
              <div class="row">
                  <div class="photo-header">
                      <img src="${res.data.avatar_url}">
                      <h1>Hi!<br>My name is ${res.data.name}!</h1>
                      <h5>${res.data.bio}</h5>
                      <p>&nbsp;</p>
                      <h4><a href="${res.data.location}">Location: ${res.data.location}</a></h4>
                      <h4><a href="${res.data.url}"> Github</a></h4>
                      <h4><a href="${res.data.blog}"> Blog</a></h4>
                  </div>
              </div>
      
          </div>
          </div>
      
          <div class="main">
              <div class="container">
                  <div class="row">
                          <h3 class="center">I build things and teach people to code.</h3>
                  </div>
      
                  <div class="row">
                      <div class="card">
                          <h3>Public Repositories</h3>
                          <h4>${res.data.public_repos}</h4>
                      </div> 
                      <div class="card">
                          <h3>Followers</h3>
                          <h4>${res.data.followers}</h4>
                      </div>
                  </div>
      
                  <div class="row">
                      <div class="card">
                          <h3>GitHub Stars</h3>
                          <h4>${res.data.stars}</h4>
                      </div> 
                      <div class="card">
                          <h3>Following</h3>
                          <h4>${res.data.following}</h4>
                      </div>
                  </div>
      
              </div>
          </div>
  
      </body>
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

