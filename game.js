window.onload = async () => {

    displayMap()
    await plotPoints();

    // Determine start node

    var currIndex 
    var currNode = nodes[Math.floor(Math.random() * nodes.length)]

    d3.select(currNode)
    .style('fill', 'red')
    .attr('r', 10)
    .attr('z', -10);
       
    var possibleMoves = determinePossibleMoves(currNode);

    d3.selectAll(possibleMoves)
    .style('fill', 'yellow')
    .on('click', (event) => {

        d3.select(event.target)
        .style('fill', 'red')
        .attr('r', 10)

    }) 

}



function determinePossibleMoves(currNode){

    var maxDist = 10;

    var possibleMoves = []

    for (let i = 0; i < nodes.length; i++) {
        
        if (nodes[i] != currNode){

            var targetData = d3.select(nodes[i]).datum();
            var currData = d3.select(currNode).datum();

            var a = currData.lat - targetData.lat;
            var b = currData.long - targetData.long;

            var c = Math.sqrt(a*a + b*b)

            if(c < 1){
                possibleMoves.push(nodes[i])
            }
        }   
    }

    return possibleMoves;
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



// Determine possible movements

// Choose/ Move to position

// Determine action