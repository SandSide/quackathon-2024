var currNode;
var score = 0;

window.onload = async () => {

    displayMap()
    await plotPoints();
    await init();
}

async function init(){

    var currNode = nodes[Math.floor(Math.random() * nodes.length)]
    var moves = determinePossibleMoves(currNode);

    d3.select(currNode)
        .style('fill', 'red')

    d3.select(currNode)
        .node().scrollIntoView({ behavior: 'smooth', block:'center', inline: 'center' });
    
    for (let i = 0; i < 10; i++) {
        addEnemy();   
    }

    showPossibleMoves(moves);



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

async function movePlayer(targetNode, possibleMoves){

    // Clear  previous pos
    if(currNode != null)
        possibleMoves.push(currNode)

    await clearOldPossibleMoves(possibleMoves);

    d3.select(targetNode)
        .style('fill', 'red')        
    
    if(currNode != null)
        infect(currNode);

    currNode = targetNode;

    var targetPos = d3.select(currNode);
    targetPos.node().scrollIntoView({ behavior: 'smooth', block:'center', inline: 'center' });

    await enemyTurn();

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


function infect(node){

    var nodeData = d3.select(node).datum();

    if(nodeData.state != 'infected' && nodeData.state != 'enemy'){

        d3.select(node)
            .style('fill', d => {
                d.state = 'infected';
                return 'orange';
            })

        updateScore(nodeData.atmNum);
    }

}

function updateScore(amount){
    score += amount;
    // console.log('Score: ' + score)
    document.getElementById('score').innerHTML = "Score: " + score;
}