const express = require("express");
const app = express();
const https = require("https");

app.get("/", function (req, res) {
  https.get("https://v2.jokeapi.dev/joke/Any", function (response) {
    console.log(response.statusCode);
    response.on("data",function(data){
        const joke1=JSON.parse(data);
        const j=joke1.joke;
        console.log(j);

    })
    
  });
  res.send("Server Up and Running, See the CONSOLE");
});

app.listen(3000, function () {
  console.log("Weather Started");
});
