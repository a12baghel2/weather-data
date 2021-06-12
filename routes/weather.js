const express = require('express');
const fetch = require('node-fetch');

const route = express.Router();

route.get("/hourly/:city", async (req, res) => {
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

route.get("/current/:city", async (req, res) => {
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

route.get("/onecall/:city", async (req, res) => {
  let data = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${req.params.city}&appid=${process.env.API_KEY}`
  );
  data = await data.json();
  let [lat, lon] = [data[0]["lat"], data[0]["lon"]];
  console.log(`latitute:${lat} and longitute:${lon}`);
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=hi&units=metric&exclude=hourly&appid=${process.env.API_key}`;
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

module.exports = route;