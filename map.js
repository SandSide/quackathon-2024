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

  console.log(data)
  
  for  (var i = 0; i < data.length - 2; i++)
    {
      //console.log(i)
     console.log(data[i])

      point.fillRect(data[i]["lat"], data[i]["long"], 10, 10)
    }
}

plotPoints();