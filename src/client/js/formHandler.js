// Create a new date instance dynamically with JS
let d = new Date();

/* Function called by event listener */
export async function tripInfo() {
  console.log("tripInfo called!");
  let destination = document.getElementById("destination").value;
  let departureDate = document.getElementById("departureDate").value;
  let returnDate = document.getElementById("returnDate").value;
  console.log(d);
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

    const data = await fetch('http://localhost:3000/postTripData', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data2 = await getData();

  }
}

/* Function to GET Project Data */
export async function getData() {
  console.log("getData called");
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

    let dd = new Date(document.getElementById("departureDate").value);
    let daysUntilTrip = Math.ceil((dd - d) / (1000 * 60 * 60 * 24));
    console.log(daysUntilTrip);

    let rd = new Date(document.getElementById("returnDate").value);
    let tripDuration = Math.floor((rd - dd) / (1000 * 60 * 60 * 24));
    console.log(tripDuration);

    let dayString = "days!"
    if (daysUntilTrip == 1) {
      dayString = "day!"
    };

    document.getElementById("whereAndWhen").innerHTML = "Your " + tripDuration + " day trip to " + city + " is in " + daysUntilTrip + " " + dayString;
    document.getElementById("tripTemps").innerHTML = "The typical weather for your trip has a high of " + highTemp + "°C and a low of " + lowTemp + "°C";
    document.getElementById("locationImage").src = picture
  });
}
