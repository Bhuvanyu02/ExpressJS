//jshint esversion: 6
const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const f1name = req.body.fname;
  const lname = req.body.lname;
  const mail = req.body.mailid;
  const data = {
    members: [
      {
        email_address: mail,
        status: "subscribed",
        merge_fields: {
          FNAME: f1name,
          LNAME: lname,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/1524f4fb9c";

  const options = {
    method: "POST",
    auth: "bhuvi:c4955291059eaa7f2c899153fcfbf799-us14",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server running at 3000");
});

// API KEY  : c4955291059eaa7f2c899153fcfbf799-us14
// AUD id: 1524f4fb9c
