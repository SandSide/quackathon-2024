var currNode;
var score = 0;

window.onload = async () => {

    displayMap()
    await plotPoints();
    await init();
}

async function init(){

    var startNode = nodes[Math.floor(Math.random() * nodes.length)]
    movePlayer(startNode, null);

    for (let i = 0; i < 10; i++) {
        addEnemy();   
    }

}

function determinePossibleMoves(node){

    var maxDist = .75;

    var possibleMoves = []

    for (let i = 0; i < nodes.length; i++) {
        
        if (nodes[i] != node && node != null){

            var targetData = d3.select(nodes[i]).datum();
            var currData = d3.select(node).datum();

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
            if (d.state != 'infected' && d.state != 'enemy')
                return 'yellow';
            else if (d.state == 'enemy')
                return 'green'
            else
                return 'pink'
        })
        .on('click', (event) => {
            movePlayer(event.target, moves);
        })
}

async function movePlayer(newNode, possibleMoves){

    // Clear  previous pos
    if(currNode != null)
        possibleMoves.push(currNode)

    await clearOldPossibleMoves(possibleMoves);

    d3.select(newNode)
        .style('fill', 'red')
    
    if(currNode != null)
        infect(currNode);

    currNode = newNode;

    var targetPos = d3.select(currNode);
    targetPos.node().scrollIntoView({ behavior: 'smooth', block:'center', inline: 'center' });

   // await enemyTurn();

    var possibleMoves = determinePossibleMoves(currNode);
    showPossibleMoves(possibleMoves);
}

async function clearOldPossibleMoves(moves){
    if(moves != null){

        d3.selectAll(moves)
            .style('fill', d => {

                if(d.state == 'normal')
                    return 'blue';
                else if(d.state == 'enemy')
                    return 'green'
                else
                    return 'orange'
            })
            .on('click', null);
    }
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
            .attr('z', -10);

        updateScore(nodeData.atmNum);
    }

}

function updateScore(amount){
    score += amount;
    // console.log('Score: ' + score)
    document.getElementById('score').innerHTML = "Score: " + score;
}