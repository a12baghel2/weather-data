const express = require("express");
const fetch = require("node-fetch");
const NodeGeocoder = require("node-geocoder");
const app = express();
require("dotenv/config");

/// Use openweather api for the weather data
// * Task 1 : get API key for open weather
// * Task 2 : fetch data from the API and serve it to main page

app.get("/", (req, res) => {
  res.send("Hello world??");
});

app.get("/weather/hourly/:city", async (req, res) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${req.params.city}&appid=${process.env.API_KEY}&lang=hi&units=metric`;
  try {
    const weatherData = await fetch(url);
    const response = await weatherData.json();
    console.log(response);
    res.send(response);
  } catch (e) {
    console.log(e);
    res.send("Error 404");
  }
});

app.get('/weather/:city', async (req,res) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&lang=hi&units=metric&appid=${process.env.API_KEY}`;
  try {
    const weatherData = await fetch(url);
    const response = await weatherData.json();
    console.log(response);
    res.send(response);
  } catch (e) {
    console.log(e);
    res.send("Error 404");
  }
});

app.get('/weather/onecall/:city', async (req,res) => {
  let data = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${req.params.city}&appid=${process.env.API_KEY}`
  );
  data = await data.json();
  let [lat,lon] = [data[0]['lat'], data[0]['lon']];
  console.log(`latitute:${lat} and longitute:${lon}`);
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=hi&units=metric&exclude=hourly&appid=${process.env.API_key}`;
  try{
    const weatherData = await fetch(url);
    const response = await weatherData.json();
    console.log(response);
    res.send(response);
  }catch(e){
    console.log(e);
    res.send("Error 404");
  }
})

app.listen(4500, () => {
  console.log("server started");
});
