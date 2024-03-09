
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
            atmCity[city] = [1, lat, lang];
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


    console.log(atmCityArray)
    return atmCityArray;
}

// transformData();