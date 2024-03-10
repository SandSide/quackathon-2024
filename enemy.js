var enemyNodes = []

function addEnemy(){

    var newEnemy;

    while(true){

        newEnemy = nodes[Math.floor(Math.random() * nodes.length)]

        if(newEnemy != currNode && enemyNodes.includes(newEnemy) != true){
            break;
        }
    }

    enemyNodes.push(newEnemy);

    d3.select(newEnemy)
        .style('fill', 'green')
        .datum(d => {
            d.state = 'enemy';
            return d
        })
}

async function enemyTurn(){

    var newPos = []

    enemyNodes.forEach(enemy => {

        var possibleMoves = determinePossibleMoves(enemy);

        var target = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]

        if(enemyNodes.includes(target) == false && target != null)
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
            d.state = 'normal';
            return d;
        })

    d3.select(target)
        .style('fill', 'green')
        .datum(d => {
            d.state = 'enemy';
            return d;
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