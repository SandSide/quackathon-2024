window.onload = async () => {

    displayMap()
    await plotPoints();

    // Determine start node

    var currIndex 
    var currNode = nodes[Math.floor(Math.random() * nodes.length)]

    d3.select(currNode)
    .style('fill', 'red')
    .attr('r', 10)
    .attr('z', -10)
    .attr('i', 0); 
    calculateMoves(currNode);
}

function drawLine(a,b){

    d3.selectAll(".line")
        .data(data)
        .enter()
        .append("line")
        .attr("x1", () => projection([a.long, a.lat])[0])
        .attr("y1", () => projection([a.long, a.lat])[1])
        .attr("x2", () => projection([b.long, b.lat])[0])
        .attr("y2", () => projection([b.long, b.lat])[1])
        .style('stroke', 'blue')
        .style('stroke-width', .5);  
}

function infect(currNode){
    if(currNode.i == true){console.log("we in")}
}

// Determine possible movements

// Choose/ Move to position

// Determine action

function calculateMoves(currNode){

    var maxDist = .5;

    for (let i = 0; i < nodes.length; i++) {
        
        if (nodes[i] != currNode){

            var targetData = d3.select(nodes[i]).datum();
            var currData = d3.select(currNode).datum();

            var a = currData.lat - targetData.lat;
            var b = currData.long - targetData.long;

            var c = Math.sqrt(a*a + b*b)

            if(c < 1){

                d3.select(nodes[i])
                .style('fill', 'yellow'); 
            }

        }   
    }
}
