var canvas = document.createElement("canvas");
canvas.setAttribute("width", 700);
canvas.setAttribute("height", 1000);
canvas.setAttribute("style", "position: absolute; x:0; y:0;");
canvas.setAttribute("id", "canvas");
document.body.appendChild(canvas);

var point = canvas.getContext("2d");
point.fillStyle = "red";
//point.fillRect(0, 0, 10, 10);

async function plotPoints()
{
    var data = await transformData();
  
    for  (var i = 0; i < data.length - 2; i++)
    {
        console.log(data[i]['lat'])
        point.fillRect((data[i]["lat"] - 50 + 3) * 100,  data[i]["long"] * 500 + 100, 10, 10)
    }
}

// function toGridPos(lat, lang){
//     return [lat * 100], 
// }

plotPoints();