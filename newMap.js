// Map params
const width = 1200;
const height = 900;
const scale = 4000;

let projection;

var nodes = []

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
        .center([-2, 55])
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

    data.forEach(d => {
        d.state = "normal";
    });

    var svg = d3.select('#map');

    // Plot points
    var c = svg.selectAll('.point')
        .data(data)
        .enter()        
        .append('circle')
        .attr('class', 'point')
        .attr('cx', d => projection([d.long, d.lat])[0]) 
        .attr('cy', d => projection([d.long, d.lat])[1]) 
        .attr('r', 5)
        .style('fill', 'blue'); 


    c.each(function(){
        nodes.push(this);
    })
    
    // for each point
    // for (let i = 0; i < data.length; i++){
        
    //     // determine num of connections
    //     var lines =  Math.floor(Math.random() * 2);
       
    //     for (let index = 0; index < lines; index++) {

    //         var target = Math.floor(Math.random()*data.length);

    //         svg.selectAll(".line")
    //         .data(data)
    //         .enter()
    //         .append("line")
    //         .attr("x1", () => projection([data[i].long, data[i].lat])[0])
    //         .attr("y1", () => projection([data[i].long, data[i].lat])[1])
    //         .attr("x2", () => projection([data[target].long, data[target].lat])[0])
    //         .attr("y2", () => projection([data[target].long, data[target].lat])[1])
    //         .style('stroke', 'blue')
    //         .style('stroke-width', .5);        }
    // }


    //determine target fr each line
    //draw line
    
    }



window.onload = function () {
    // displayMap();
    // plotPoints();
};

