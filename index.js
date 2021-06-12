// Imports
const express = require("express");
const fetch = require("node-fetch");
require("dotenv/config");

// Local Imports
const weatherRoute = require('./routes/weather')

const app = express();

/// Use openweather api for the weather data
// * Task 1 : get API key for open weather
// * Task 2 : fetch data from the API and serve it to main page

// Route Middleware
app.use('/weather', weatherRoute);

// Routes
app.get("/", (req, res) => {
  res.send("Hello world??");
});

app.get('/test', async (req,res) => {
  const url = `http://api.agromonitoring.com/agro/1.0/uvi?polyid=${process.env.POLY_ID}&appid=${process.env.AGRO_API}`;
  let data = await fetch(url)
  data = await data.json();
  console.log(data);
  res.send(data);
})

app.listen(4500, () => {
  console.log("server started");
});
