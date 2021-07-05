import React, { useRef, useEffect } from 'react';
import { drawLine, drawCircle, drawRectangle } from "./DrawShapes";
import Tools from "./Tools"
import redo from "./Assets/redo.png"
import save from "./Assets/diskette.png"
import undo from "./Assets/undo.png"
// import io from 'socket.io-client';
import './Board.css';


const Board = () => {
  const canvasRef = useRef(null);
  const toolRef = useRef(null);
  // const socketRef = useRef();
  let restore_array = [];
  let index = -1;
  let drawing = false;
  let draw = drawLine;



  function saveToLocal() {
    localStorage.setItem("canvas-data", canvasRef.current.toDataURL());
   
  }

  function loadFromLocal() {
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
    stroke: '20',
  };


  useEffect(() => {

    const canvas = canvasRef.current;
    const tools = toolRef.current;

    const context = canvas.getContext('2d');
    //----------------------active icons---------------------
    let currentActive = document.querySelector(".control")
    let selected = document.querySelectorAll(".control")


    selected.forEach(select => {
      select.addEventListener('click', () => {
        if (select.classList.contains('active')) {
          return;
        }

        currentActive = select;
        selected.forEach(select2 => {
          if (select2 != currentActive || select2.classList.contains('active')) {
            select2.classList.remove('active')
          }
          else {
            if (select2.classList.contains('toToggle')) {
              setTimeout(function() {
                currentActive = document.querySelector('.control')
                selected.forEach(select12 => {
                  if (select12 != currentActive || select12.classList.contains('active')
                  ) {
                    select12.classList.remove('active')
                  }
                })
                currentActive.classList.add('active')
              }, 1500);

            }
            else {
              select2.classList.add('active')
            }
          }
        })
      })
    })
    // -----------------add event listeners to our canvas ----------------------

    const onMouseDown = (e) => {
      drawing = true;
      currentColor.x = e.clientX || e.touches[0].clientX;
      currentColor.y = e.clientY || e.touches[0].clientY;
    };

    const onMouseMove = (e) => {
      if (!drawing) { return; }
      draw(canvas, context, currentColor.stroke, currentColor.x, currentColor.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, currentColor.color, true);
      if (draw == drawLine) {
        currentColor.x = e.clientX || e.touches[0].clientX;
        currentColor.y = e.clientY || e.touches[0].clientY;
      }
    };

    const onMouseUp = (e) => {
      if (!drawing) { return; }
      drawing = false;
      draw(canvas, context, currentColor.stroke, currentColor.x, currentColor.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, currentColor.color, true);
       restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
    index += 1;
      saveToLocal();
    };


    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mouseout', onMouseUp, false);
    // canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);
    canvas.addEventListener('mousemove', onMouseMove, false);

    // Touch support for mobile devices
    canvas.addEventListener('touchstart', onMouseDown, false);
    canvas.addEventListener('touchend', onMouseUp, false);
    canvas.addEventListener('touchcancel', onMouseUp, false);
    // canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false);
    canvas.addEventListener('touchmove', onMouseMove, false);

    //------------crosshair--------------------

    const cross = document.querySelector(".crosshair");
    document.addEventListener("mousemove", (e) => {
      cross.style.transform = `translate(${e.clientX-10}px,${e.clientY-10}px)`
      cross.style.width = currentColor.stroke + "px";
      cross.style.height = `${currentColor.stroke}px`;
    })

    // -------------- make the canvas fill its parent component -----------------

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      loadFromLocal();
    };

    window.addEventListener('resize', onResize, false);
    onResize()

  }, [])


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
    //    img.src = data;
    // })
    // ----------------------- Colors -----------------------------------------
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
    deleteData.addEventListener('click', (e) => {
      context.clearRect(0, 0, canvas.width, canvas.height)
      restore_array = [];
      localStorage.clear();
    }
      , false);

    //clear screen event listener
    const clearData = document.querySelector(".clear")
    clearData.addEventListener('click', (e) => {
      context.clearRect(0, 0, canvas.width, canvas.height)
      restore_array = [];
    })


    //circle event listener
    const circleTool = document.querySelector(".circle")
    circleTool.addEventListener('click', (e) => {
      draw = drawCircle;
    }, false);

    //pencil event listener
    const pencilTool = document.querySelector(".pencil")
    pencilTool.addEventListener('click', (e) => {
      currentColor.color = "black";
      draw = drawLine;
    }, false);

    //eraser event listener
    const eraser = document.querySelector(".eraser")
    eraser.addEventListener('click', (e) => {
      currentColor.color = "white";
      draw = drawLine;
    }, false);

    //square event listener
    const rectTool = document.querySelector(".rectangle")
    rectTool.addEventListener('click', (e) => {
      draw = drawRectangle;
    }, false);

    //un
    const undoButton = document.querySelector(".undo")
    undoButton.addEventListener('click', (e) => {
      if(index >= 0) {
        if (restore_array.length > 0) {
          context.putImageData(restore_array[index], 0, 0);
          index-=1;
        }
      if(index < 0)
          index = 0;
      }
    })

    const redoButton = document.querySelector(".redo")
    redoButton.addEventListener('click', (e) => {
      if (index < restore_array.length - 1) {
        index += 1
        context.putImageData(restore_array[index], 0, 0)
      }
    })

    const save = document.querySelector(".save");
    save.addEventListener('click', (e) => {
      // alert("saved")
      // let img = new Image();
      // img.src = canvas.toDataURL("image/png");
      var link = document.createElement('a');
      link.download = "whiteboard-TA-" + Date().split(" ")[2] + Date().split(" ")[1] + '.png';
      link.href = document.getElementsByClassName("whiteboard")[0].toDataURL()
      link.click();
      // window.open("<img src='"+ img +"'/>")
    })




    const colorPicker = document.querySelector("#colorPicker")
    // console.log(colorPicker)
    colorPicker.addEventListener('change', (e) => {
      currentColor.color = colorPicker.value;
    }, false)

    //-------- for stroke brushSizeControl

    const input = document.querySelector(".brushSizeControl input")
    input.addEventListener('change', () => {
      currentColor.stroke = input.value;
      //   alert(currentColor.stroke)
    })


    //     ("#save-canvas").addEventListener("click",function(){
    //   saveCanvas(canvas, "sketch", "png");
    // });

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

  return (<>
    <canvas ref={canvasRef} className="whiteboard" />
    <Tools ref={toolRef} />
    <div className="crosshair"></div>
    <div id="footer">
      <button className="undo" title="Undo"><img src={undo} /></button>
      <button className="redo" title="Redo"><img src={redo} /></button>
      <div className="brushSizeControl" title="To Control size of brush or Eraser">
        <input type="range" id="cursorSize" defaultValue="20" min="2" max="100" />
      </div>
      <button className="save" title="Save"><img src={save}/></button>
    </div>
  </>
  );
};



export default Board

