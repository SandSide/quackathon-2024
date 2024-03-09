
async function getData(){
    var response = await fetch('https://raw.githubusercontent.com/SandSide/quackathon-2024/main/HSBC_atms.json');

    var data = await response.json();

    var data = data['data']

    atm = data[0]['Brand'][0]['ATM']

    return atm;
}

async function transformData(){

    var atms = await getData();

    var atmsPure = []


    for (let i = 0; i < atms.length; i++) {
        
        console.log(atms[i]['Location']['GeoLocation'])

        var city = atms[i]['Location']['PostalAddress']['TownName'];
        var lat = atms[i]['Location']['PostalAddress']['GeoLocation']['GeographicCoordinates']['Latitude'];
        var lang = atms[i]['Location']['PostalAddress']['GeoLocation']['GeographicCoordinates']['Longitude'];

        atmsPure.push([city, lat, lang])    
    }

    console.log(atmsPure)

    

}

transformData();

// Aggregate all atms into based on city

