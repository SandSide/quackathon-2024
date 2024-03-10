function determinePossibleMoves(node){

    var maxDist = .75;

    var possibleMoves = []

    for (let i = 0; i < nodes.length; i++) {
        
        if (nodes[i] != node && node != null){


            var targetData = d3.select(nodes[i]).datum();
            var nodeData = d3.select(node).datum();

            
            // console.log(nodeData)

            var a = Math.abs(nodeData.lat - targetData.lat);
            var b = Math.abs(nodeData.long - targetData.long);

            var c = Math.sqrt(a*a + b*b)

            if(c <= maxDist){
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