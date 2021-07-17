// Personal API Key for OpenWeatherMap API
/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", function() {
  tripInfo()
});

/* Function called by event listener */
async function tripInfo() {
  let destination = document.getElementById("destination").value;
  let departureDate = document.getElementById("departureDate").value;
  let returnDate = document.getElementById("returnDate").value;
  console.log(destination);
  console.log(departureDate);
  console.log(returnDate);

  if (
    destination != "" && departureDate != "" && returnDate != "") {
    //     Function to GET Web API Data
    let body = {
      destination: destination,
      departureDate: departureDate,
      returnDate: returnDate
    };
    console.log(body);
    //      Function to POST data

    fetch('http://localhost:3000/postTripData', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(getData());

  }
}

/* Function to GET Project Data */
async function getData() {
  let temp = fetch('http://localhost:3000/getData', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  temp.then((val) => val.json()).then(projectData => {
    let lowTemp = projectData.LowTemp;
    let highTemp = projectData.HighTemp;
    let picture = projectData.Picture;
    let city = projectData.City;

console.log(city);

//    let  dt1 = new Date(newDate);
//    let  dt2 = new Date(document.getElementById("departureDate").value);
//    let daysUntilTrip = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
    //console.log(daysUntilTrip());

//    var tripDuration = function() {
//      dt1 = new Date(document.getElementById("Trip Departure Date").value);
//      dt2 = new Date(document.getElementById("Trip Return Date").value);
//      return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
//    }
    //console.log(tripDuration());




    document.getElementById("whereAndWhen").innerHTML = "Your TRIP DURATION day trip to " + city + " is in  daysUntilTrip + days!";
    document.getElementById("tripTemps").innerHTML = "The typical weather for then has a high of " + highTemp + "°C and an low of " + lowTemp + "°C";
    document.getElementById("locationImage").src = picture
  });
}
