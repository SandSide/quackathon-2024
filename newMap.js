// Map params
const width = 1200;
const height = 900;
const scale = 4000;

let projection;

// Display map
function displayMap() {

    var mapUK = d3.json("https://raw.githubusercontent.com/SandSide/UK-Towns-D3/main/src/assets/united-kingdom-detailed-boundary_1061.geojson");

    // Load of map data then process
    Promise.all([mapUK])
        .then(data => {
            drawMap(data[0]);
        })
        .catch(err => {
            console.error(err);
        });
}

// Draw the map
function drawMap(map) {

    // Set projection
    projection = d3.geoMercator()
        .center([-2, 56])
        .scale(scale);

    // Create map container
    var svg = d3.select('.map-container')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('id', 'map');

    var g = svg.append('g');

    let path = d3.geoPath().projection(projection);

    // Draw map
    g.selectAll('path')
        .data(map.features)
        .enter()
        .append('path')
        .attr('class', 'country')
        .attr('d', path);



}

// Plot towns onto the map
async function plotPoints() {

    var data = await transformData();

    var svg = d3.select('#map');

    console.log('hello')

    // Plot points
    var c = svg.selectAll('.point')
        .data(data)
        .enter()        
        .append('circle')
        .attr('class', 'point')
        .attr('cx', d => projection([d.long, d.lat])[0]) 
        .attr('cy', d => projection([d.long, d.lat])[1]) 
        .attr('r', 5)
        .style('fill', 'red'); 

        
}

window.onload = function () {
    displayMap();
    plotPoints();
};

