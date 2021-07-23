const dotenv = require('dotenv');
dotenv.config();
projectData = {};
const PX_API_KEY = process.env.PX_API_KEY;
const GN_API_KEY = process.env.GN_API_KEY;
const WB_API_KEY = process.env.WB_API_KEY;
const express = require('express')
const fetch = require('node-fetch')
const bodyParser = require('body-parser');
const cors = require('cors')
const axios = require("axios");

let path = require('path')
let baseURL_Geonames = 'http://api.geonames.org/searchJSON?q=';
let baseURL_Pixabay = "https://pixabay.com/api/?key=" + PX_API_KEY + "&q=";
let days = 1
let dailyweather = days - 1;
if (
  dailyweather > 15) {
  dailyweather = 15
};

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static('dist'))

// Setup Server
const port = 3000;
// Spin up the server
app.listen(port, function() {
  console.log(`Listening at http://localhost:${port}`);
})

// Callback function to complete GET '/all'
app.post('/postTripData', async (req, res) => {

  let city = req.body.destination
  if (
    city != "") {
    /* Function to GET Web API Data*/
    let temp = axios.get(baseURL_Geonames + city + "&maxRows=1&username=" + GN_API_KEY);
    await temp.then(async res => {
      let weather = axios.get("https://api.weatherbit.io/v2.0/forecast/daily?lat=" + res.data.geonames[0].lat + "&lon=" + res.data.geonames[0].lng + "&key=" + "f2bc8e5508d747e4ae3f1c8bbc11981a");
      let picture = axios.get(baseURL_Pixabay + res.data.geonames[0].name.replace(" ", "+") + "&image_type=photo");

      await weather.then(heat => {
        console.log("settingtemperature");
        let dailytempmax = heat.data.data[dailyweather].max_temp;
        let dailytemplow = heat.data.data[dailyweather].low_temp;
        projectData.LowTemp = dailytemplow
        projectData.HighTemp = dailytempmax
      });
      console.log("settingcity");
      projectData.City = res.data.geonames[0].name
      await picture.then(image => {
        console.log("settingpicture");
        projectData.Picture = image.data.hits[0].largeImageURL
      });
    });
  }
  res.send(projectData);
});

app.get('/getData', (req, res) => {
  console.log("gettingCity");
  res.send(projectData);
});
