const express = require("express");
const https = require("node:https");

const app = express();

app.get("/", function (req, res) {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=Berlin&appid=c730f3faebfdb063964f1db1070409a0&units=metric";
  https.get(url, (response) => {
    console.log(response.statusCode + " " + response.statusMessage);

    response.on("data", (data) => {
      // console.log(data);
      const weatherData = JSON.parse(data);
      const city = weatherData.name;
      const temp = weatherData.main.temp;
      const feelsLike = weatherData.main.feels_like;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      // Response back to client browser
      res.write(`<p>The weather is currently ${desc}</p>`);
      res.write(
        `<h1>The temperature in ${city} is ${temp}°C and it feels like ${feelsLike}°C</h1>`
      );
      res.write(`<img src=${imageUrl}>`);
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running at 3000");
});
