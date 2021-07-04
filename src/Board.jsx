import React, { useRef, useEffect } from 'react';
import { drawLine, drawCircle } from "./MouseEvents/DrawLine";
import Tools from "./Tools"


import io from 'socket.io-client';
import './Board.css';


const Board = () => {

  const canvasRef = useRef(null);
  const colorsRef = useRef(null);
  const socketRef = useRef();

  useEffect(() => {
    // --------------- getContext() method returns a drawing context on the canvas-----

    const canvas = canvasRef.current;
    const test = colorsRef.current;
    const context = canvas.getContext('2d');

    // -----------------add event listeners to our canvas ----------------------

  const onMouseDown = (e) => {
    drawing = true;
    current.x = e.clientX || e.touches[0].clientX;
    current.y = e.clientY || e.touches[0].clientY;
  };

  const onMouseMove = (e) => {
    if (!drawing) { return; }
    drawLine(context, current.x, current.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, current.color, true);
    current.x = e.clientX || e.touches[0].clientX;
    current.y = e.clientY || e.touches[0].clientY;
  };

  const onMouseUp = (e) => {
    if (!drawing) { return; }
    drawing = false;
    drawLine(context,current.x, current.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, current.color, true);
    localStorage.setItem("canvas-data", canvas.toDataURL())
  };


    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mouseout', onMouseUp, false);
    // canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);
    canvas.addEventListener('mousemove', onMouseMove, false);

    // Touch support for mobile devices
    canvas.addEventListener('touchstart',  onMouseDown, false);
    canvas.addEventListener('touchend', onMouseUp, false);
    canvas.addEventListener('touchcancel',onMouseUp, false);
    // canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false);
    canvas.addEventListener('touchmove', onMouseMove, false);


    //--------------------socket ready---------------------------------------
    // let socket = io.connect("http//localhost:8080");
    // socket.on("drawing", (data) => {
    //   let img = new Image()
    //   img.onload = () => {
    //     context.drawImage(img, 0, 0)
    //   }
    //   img.src = data;
    // })
    // ----------------------- Colors --------------------------------------------------

    const colors = document.getElementsByClassName('color');
    console.log(colors, 'the colors');
    console.log(test);
    // set the current color
    const current = {
      color: 'black',
    };

    // helper that will update the current color
    const onColorUpdate = (e) => {
      current.color = e.target.className.split(' ')[1];
    };

    // loop through the color elements and add the click event listeners
    for (let i = 0; i < colors.length; i++) {
      colors[i].addEventListener('click', onColorUpdate, false);
    }


    let drawing = false;


    //----------- limit the number of events per second -----------------------

    // const throttle = (callback, delay) => {
    //   let previousCall = new Date().getTime();
    //   return function() {
    //     const time = new Date().getTime();

    //     if ((time - previousCall) >= delay) {
    //       previousCall = time;
    //       callback.apply(null, arguments);
    //     }
    //   };
    // };



    // -------------- make the canvas fill its parent component -----------------

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
       var dataURL = localStorage.getItem("canvas-data");
      var img = new Image;
      img.src = dataURL;
      img.onload = function() {
        context.drawImage(img, 0, 0);
      };
    };

    window.addEventListener('resize', onResize, false);
    onResize();

    // ----------------------- socket.io connection ----------------------------
    // const onDrawingEvent = (data) => {
    //   console.log("data:", data)
    //   const w = canvas.width;
    //   const h = canvas.height;
    //   drawLine(context, data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    //   let dt = canvas.toDataUrl("image/png")
    //   socket.emit("drawing", dt);
    // }

    // socketRef.current = io.connect('/');
    // socketRef.current.on('drawing', onDrawingEvent);


    // -----------------Saving in localstorage--------------------------------
    console.log("ref:", canvasRef)
    var dataURL = localStorage.getItem("canvas-data");
    var img = new Image;
    img.src = dataURL;
    img.onload = function() {
      context.drawImage(img, 0, 0);
    };
  }, []);

  // ------------- The Canvas and color elements --------------------------

  return (
    <div>
      <canvas ref={canvasRef} className="whiteboard" />
      <Tools ref={colorsRef}/>
    </div>
  );
};

export default Board;

