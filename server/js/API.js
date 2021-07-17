//https://knowledge.udacity.com/questions/354429
//https://knowledge.udacity.com/questions/248560
//app.js in Project 3



let baseURL_Geonames = 'http://api.geonames.org/placenamesearchJSON?q=';

async function geonames() {
  let city = "tokyo" //document.getElementById("city").value;
  //  let zip = document.getElementById("zip").value;
  let username = "madomb01" //document.getElementById("username").value;
  if (
    city != "") {
    /* Function to GET Web API Data*/
    let temp = fetch(baseURL_Geonames + city + "&maxRows=10&username=" + username);
    temp.then((val) => val.json()).then(data => {
      console.log(data);
      /*      let body = {
              date: newDate,
              zip: zip,
              temp: data.main.temp,
              content: feelings
            };

            /* Function to POST data */
      /*
      fetch('http://localhost:3000/addEntry', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then(getEntry()); */
    });
  }
}


geonames();
/*
var geonamesResponse = await fetch("http://api.geonames.org/searchJSON?q=tokyo&maxRows=10&username=demo")
var geonamesData = await geonamesResponse.json()
console.log(geonamesData)
geonamesData.geonames[0].lat
geonamesData.geonames[0].lng
*/
