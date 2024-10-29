const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
const figlet = require("figlet");

function checkPalindrome(palindrome) {
  let reverse = "";               // I did this becuase I am going to be adding the characters in Palindrome
  for (
    var i = palindrome.length;
    i >= 0;
    i-- // this is going through the word but reverse becuase of i-- instead if i++
  ) {
    reverse += palindrome.charAt(i); //
  }
  return reverse === palindrome; //after done with loop the reverse will be the reverse of the word passed in
}

const server = http.createServer(function (req, res) {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == "/") {
    fs.readFile("index.html", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  } else if (page == "/api") {
    if ("userInput" in params) {
      if (params["userInput"] !== '' ) {
        res.writeHead(200, { "Content-Type": "application/json" });
        const objToJson = {
          isPalindrome: checkPalindrome(params["userInput"])
        };
        res.end(JSON.stringify(objToJson));
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        const objToJson = {
          isPalindrome: false
        };
        res.end(JSON.stringify(objToJson));
      }
    }
  } else if (page == "/css/style.css") {
    fs.readFile("css/style.css", function (err, data) {
      res.write(data);
      res.end();
    });
  } else if (page == "/js/main.js") {
    fs.readFile("js/main.js", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.write(data);
      console.log(data.toString());
      res.end();
    });
  } else {
    figlet("404!!", function (err, data) {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(7000);
