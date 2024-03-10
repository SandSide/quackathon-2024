var enemyNodes = []

function addEnemy(){

    while(true){

        var newEnemy = nodes[Math.floor(Math.random() * nodes.length)]

        if(newEnemy != currNode && enemyNodes.includes(newEnemy) != true){
            enemyNodes.push(newEnemy);
            break;
        }
    }

    d3.selectAll(enemyNodes)
        .style('fill', 'green')
}

async function enemyTurn(){

    var newPos = []

    enemyNodes.forEach(enemy => {
        
        var possibleMoves = determinePossibleMoves(enemy);

        var target = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]

        if(enemyNodes.includes(target) == false)
        {
            console.log("enemy moving");
            enemyMove(enemy, target);
            newPos.push(target);
        }
    });

    enemyNodes = newPos;
}

function enemyMove(enemy, target){

    if(target == currNode){
        console.log("Game Over");
    }

    d3.select(enemy)
        .style('fill', 'blue')
        .datum(d => {
            return {state: 'normal' };
        })

    d3.select(target)
        .style('fill', 'green')
        .datum(d => {
            return {state: 'enemy' };
        })

}


function purify(node){

    var nodeData = d3.select(node).datum();

    if(nodeData.state == 'infected'){

        console.log('purify atm')

        d3.select(node)
            .style('fill', d => {
                d.state = 'normal';
            })
            .attr('z', -10);

        updateScore(-nodeData.atmNum);
    }

}