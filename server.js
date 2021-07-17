// Setup empty JS object to act as endpoint for all routes
projectData = {};
const PX_API_KEY = process.env.PX_API_KEY;

let baseURL_Geonames = 'http://api.geonames.org/searchJSON?q=';
let baseURL_Pixabay = "https://pixabay.com/api/?key=" + "22344503-a6db0b9abab7684f337f57d7f" + "&q=";
const fetch = require("node-fetch");
const axios = require("axios");
let days = /* [date of trip] - [current date]; */ 1
let dailyweather = days - 1;
if (
  dailyweather > 15) {
  dailyweather = 15
};




// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('server'));

// Spin up the server
const port = 3000;

// Callback function to complete GET '/all'
app.post('/postTripData', async (req, res) => {
  //  projectData = {};
  //res.send(projectData);


  /*  Hijacked method!!!!! Don't forget to change later!!!!! */

  let city = req.body.destination //document.getElementById("city").value;
  //  let zip = document.getElementById("zip").value;
  let username = "madomb01" //document.getElementById("username").value;
  if (
    city != "") {
    /* Function to GET Web API Data*/
    let temp = axios.get(baseURL_Geonames + city + "&maxRows=1&username=" + username);
    await temp.then(async res => {
      let weather = axios.get("https://api.weatherbit.io/v2.0/forecast/daily?lat=" + res.data.geonames[0].lat + "&lon=" + res.data.geonames[0].lng + "&key=" + "f2bc8e5508d747e4ae3f1c8bbc11981a");
      let picture = axios.get(baseURL_Pixabay + city + "&image_type=photo");

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
});

app.get('/getData', (req, res) => {
  console.log("gettingCity");
  res.send(projectData);
});

// Initialize all route with a callback function
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
