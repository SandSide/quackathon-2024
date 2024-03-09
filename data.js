var canvas = document.createElement("canvas");
canvas.setAttribute("width", 700);
canvas.setAttribute("height", 1000);
canvas.setAttribute("style", "position: absolute; x:0; y:0;");
canvas.setAttribute("id", "canvas");
document.body.appendChild(canvas);

var point = canvas.getContext("2d");
point.fillStyle = "red";
//point.fillRect(0, 0, 10, 10);

async function plotPoints()
{
  var data = await transformData();

  console.log(data)
  
  for  (var i = 0; i < data.length - 2; i++)
    {
      //console.log(i)
     //console.log(data[i])

     // point.fillRect(data[i]["lat"], data[i]["long"], 10, 10)
    }
}

async function getData(){
  var response = await fetch('https://raw.githubusercontent.com/SandSide/quackathon-2024/main/HSBC_atms.json');

  var data = await response.json();

  var data = data['data']

  atm = data[0]['Brand'][0]['ATM']

  return atm;
}

async function transformData(){

  var atms = await getData();

  var atmCity = {}

  for (let i = 0; i < atms.length; i++) {

      var city = atms[i]['Location']['PostalAddress']['TownName'];
      var lat = atms[i]['Location']['PostalAddress']['GeoLocation']['GeographicCoordinates']['Latitude'];
      var lang = atms[i]['Location']['PostalAddress']['GeoLocation']['GeographicCoordinates']['Longitude'];

      // Check if city already exists
      if(!atmCity.hasOwnProperty(city)){
          atmCity[city] = [1,lat, lang];
      }
      else{
          // Increase num of atms in the city
          atmCity[city] = [atmCity[city][0] + 1, lat, lang];
      }

  }

  // Convert the atmCity object to an array
  var atmCityArray = Object.entries(atmCity).map(([city, data]) => ({
      city: city,
      atmNum: data[0],
      lat: data[1],
      long: data[2]
  }));


 // console.log(atmCityArray)
  return atmCityArray;
}

plotPoints();
