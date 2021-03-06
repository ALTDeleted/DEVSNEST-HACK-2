const drawLine = (canvas,context,stroke,x0, y0, x1, y1, color, emit) => {
      context.beginPath();
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
      context.strokeStyle = color;
      context.lineCap = "round"; 
      context.lineWidth = stroke;
      context.stroke();
      context.closePath();
    };

const drawCircle = (canvas,context,stroke,x0, y0, x1, y1, color, emit)=>{
  var nDeltaX = Math.abs(x1 - x0);
  var nDeltaY = Math.abs(y1 - y0);
  var radius = Math.sqrt(nDeltaX * nDeltaX + nDeltaY * nDeltaY)
  context.beginPath();
  context.arc(x0, y0, radius, 0, Math.PI*2);
      context.lineCap = "round"; 
  context.fillStyle="#fff"; 
  context.fill(); 
  context.strokeStyle=color;
  context.lineWidth = stroke;
  context.stroke(); 
  context.closePath();
}

const drawRectangle =(canvas,context,stroke,x0,y0,x1,y1,color,emit)=>{
  var nDeltaX = Math.abs(x1 - x0);
  var nDeltaY = Math.abs(y1 - y0);
  context.beginPath();
  context.strokeRect( x0, y0, nDeltaX, nDeltaY);
      context.lineCap = "round"; 
  context.fillStyle="#fff"; 
  context.strokeStyle = color;
  context.lineWidth = stroke;
  context.fill(); 
  context.stroke(); 
  context.closePath();
}


export  {drawLine,drawCircle, drawRectangle};