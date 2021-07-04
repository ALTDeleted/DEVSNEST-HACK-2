import React, { useRef, useEffect } from 'react';
import { drawLine, drawCircle } from "./DrawShapes";
import Tools from "./Tools"


import io from 'socket.io-client';
import './Board.css';


const Board = () => {
  const canvasRef = useRef(null);
  const toolRef = useRef(null);
  const socketRef = useRef();
  let drawing = false;
  let draw=drawLine;
  
  function saveToLocal(){
      localStorage.setItem("canvas-data", canvasRef.current.toDataURL())
  }

  function loadFromLocal(){
     let dataURL = localStorage.getItem("canvas-data");
        let img = new Image;
        img.src = dataURL;
        img.onload = function() {
          canvasRef.current.getContext('2d').drawImage(img, 0, 0);
        };
  }

  // set the currentColor color
  const currentColor = {
    color: 'black',
  };


  useEffect(()=>{

    const canvas = canvasRef.current;
    const tools = toolRef.current;
    const context = canvas.getContext('2d');

    // -----------------add event listeners to our canvas ----------------------

    const onMouseDown = (e) => {
      drawing = true;
      currentColor.x = e.clientX || e.touches[0].clientX;
      currentColor.y = e.clientY || e.touches[0].clientY;
    };

    const onMouseMove = (e) => {
      if (!drawing) { return; }
       draw(canvas,context, currentColor.x, currentColor.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY,  currentColor.color, true);
        if(draw==drawLine){currentColor.x = e.clientX || e.touches[0].clientX;
        currentColor.y = e.clientY || e.touches[0].clientY;
      }
    };

    const onMouseUp = (e) => {
      if (!drawing) { return; }
      drawing = false;
      draw(canvas,context, currentColor.x, currentColor.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, currentColor.color, true);
      saveToLocal();
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

    // -------------- make the canvas fill its parent component -----------------

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      loadFromLocal();
    };

    window.addEventListener('resize', onResize, false);
    onResize()
  },[])




  useEffect(() => {
    // --------------- getContext() method returns a drawing context on the canvas-----

    const canvas = canvasRef.current;
    const tools = toolRef.current;
    const context = canvas.getContext('2d');


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


    // helper that will update the currentColor color
    const onColorUpdate = (e) => {
      currentColor.color = e.target.className.split(' ')[1];

    };

    // loop through the color elements and add the click event listeners
    for (let i = 0; i < colors.length; i++) {
      colors[i].addEventListener('click', onColorUpdate, false);
    }
    
    //delete screen event listener
    const deleteData = document.querySelector(".delete")
      deleteData.addEventListener('click', (e)=>{
        context.clearRect(0, 0, canvas.width, canvas.height)
        localStorage.clear();
      }
      , false);

    //clear screen event listener
    const clearData = document.querySelector(".clear")
    clearData.addEventListener('click', (e)=>{
      context.clearRect(0, 0, canvas.width, canvas.height)
    })

       
    //circle event listener
    const circleTool = document.querySelector(".circle")
    circleTool.addEventListener('click', (e)=>{
      draw=drawCircle;
      }, false);
      
    //pencil event listener
    const pencilTool = document.querySelector(".pencil")
    pencilTool.addEventListener('click', (e)=>{
      draw=drawLine;
    }, false);

    //eraser event listener
    const eraser = document.querySelector(".eraser")
    eraser.addEventListener('click', (e)=>{
      currentColor.color="white";
      draw=drawLine;
    },false);
    
    

    const colorPicker = document.querySelector("#colorPicker")
    console.log(colorPicker)
    colorPicker.addEventListener('change',(e)=> {
      currentColor.color = colorPicker.value;
      console.log(colorPicker)

    },false)

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



    // ----------------------- socket.io connection ----------------------------
    // const onDrawingEvent = (data) => {
    //   console.log("data:", data)
    //   const w = canvas.width;
    //   const h = canvas.height;
    //   drawLine(context, data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    //   let dt = canvas.toDataUrl("image/png")
    //   socket.emit("drawing", dt);
    // }

    // socketRef.currentColor = io.connect('/');
    // socketRef.currentColor.on('drawing', onDrawingEvent);


    // -----------------Saving in localstorage--------------------------------
    
    console.log("ref:", canvasRef)

    loadFromLocal();
  }, []);

  // ------------- The Canvas and color elements --------------------------

  return (
    <div>
      <canvas ref={canvasRef} className="whiteboard" />
      <Tools ref={toolRef}/>
    </div>
  );
};

export default Board;

