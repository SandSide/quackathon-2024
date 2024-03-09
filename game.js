
window.onload = async () => {

    displayMap()
    await plotPoints();

    // Determine start node
    var currNode = nodes[Math.floor(Math.random() * nodes.length)]

    d3.select(currNode)
    .style('fill', 'green'); 
}







// Determine possible movements

// Choose/ Move to position

// Determine action
