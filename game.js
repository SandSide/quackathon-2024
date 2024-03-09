var currNode;

window.onload = async () => {

    displayMap()
    await plotPoints();

    var startNode = nodes[Math.floor(Math.random() * nodes.length)]
    changeCurrentNode(startNode, null);
}


function determinePossibleMoves(currNode){

    var maxDist = .75;

    var possibleMoves = []

    for (let i = 0; i < nodes.length; i++) {
        
        if (nodes[i] != currNode){

            var targetData = d3.select(nodes[i]).datum();
            var currData = d3.select(currNode).datum();

            var a = Math.abs(currData.lat - targetData.lat);
            var b = Math.abs(currData.long - targetData.long);

            var c = Math.sqrt(a*a + b*b)

            if(c <= maxDist){
                possibleMoves.push(nodes[i])
            }
        }   
    }

    return possibleMoves;
}

function showPossibleMoves(moves){
    
    d3.selectAll(moves)
    .style('fill', d => {
        if (d.state != 'infected')
            return 'yellow'
        else
            return 'red'
    })
    .on('click', (event) => {
        changeCurrentNode(event.target, moves);
    }) 
}

function changeCurrentNode(newNode, possibleMoves){

    if(possibleMoves != null){

        if(currNode != null)
            possibleMoves.push(currNode)

        d3.selectAll(possibleMoves)
            .style('fill', d => {

                if(d.state != 'infected')
                    return 'blue';
                else
                    return 'orange'
            })
            .attr('r', 5)
            .attr('z', -10);
    }

    d3.select(newNode)
        .style('fill', 'red')
        .attr('r', 10)
        .attr('z', -10);
    
    if(currNode != null)
        infect(currNode);
    
        currNode = newNode;
    var possibleMoves = determinePossibleMoves(currNode);
    showPossibleMoves(possibleMoves);
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

function infect(node){

    var nodeData = d3.select(node).datum();

    if(nodeData.state != 'infected'){

        d3.select(node)
            .style('fill', d => {
                d.state = 'infected';
                return 'orange';
            })
            .attr('r', 5)
            .attr('z', -10);
    }

}


// Determine possible movements

// Choose/ Move to position

// Determine action