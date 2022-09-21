const express =require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res){

  const query = req.body.cityName;
  const apiKey = "6113c1d197861c0763b9f2321014f379";
  const unit = "imperial";

  const url = "https://api.openweathermap.org/data/2.5/weather?&q=" + query + "&appid=" + apiKey + "&units=" + unit;

  https.get(url, function (response) {
    console.log(response.statusCode);

  response.on("data", function (data) {
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const description = weatherData.weather[0].description;
    const weatherIcon = weatherData.weather[0].icon;
    const weatherImg = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
    console.log(weatherImg);

    res.write("<h1>The temperature in " + query + " is " + temp + " degrees Fahrenheit.</h1>");
    res.write("<p>and " + query + " is currently experiencing " + description + ".</p>");
    res.write("<img src=" + weatherImg + ">");

  res.send();

  });

  });
});





app.listen(3000), function() {
  console.log("Server is running on port 3000");
};
