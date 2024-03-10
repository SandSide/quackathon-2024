var enemyNodes = []
var enemyStepSize = 0.5;


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
        .style('fill', '#0984e3')
        .datum(d => {
            d.state = 'enemy';
            return d
        })
}

async function enemyTurn(){

    var newPos = []

    enemyNodes.forEach(enemy => {

        var possibleMoves = determinePossibleMoves(enemy, enemyStepSize);

        var target;

        for (let i = 0; i < possibleMoves.length; i++) {

            if(d3.select(possibleMoves[i]).datum.state == 'infected'){
                target = possibleMoves[i];
                break;      
            }
        }

        if(target == null)
            target = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]

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

    purify(target);

    d3.select(enemy)
        .style('fill', '#2d3436')
        .datum(d => {
            d.state = 'normal';
            return d;
        })

    d3.select(target)
        .style('fill', '#0984e3')
        .datum(d => {
            d.state = 'enemy';
            return d;
        })

}


function purify(node){

    var nodeData = d3.select(node).datum();

    if(nodeData.state == 'infected'){

        console.log('purify atm')

        // d3.select(node)
        //     .datum(d => {
        //         d.state = 'enemy';
        //         return d;
        //     })

        updateScore(-nodeData.atmNum);
    }

}