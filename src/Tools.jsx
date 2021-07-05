import React, { useRef, useEffect } from 'react';
import cancel from "./Assets/cancel.png"
import del from "./Assets/delete-user.png"
import erase from "./Assets/eraser.png"
import brush from "./Assets/paint-brush.png"
import pallete from "./Assets/paint-palette.png"


import "./Tools.css"


function Tools() {


  return (<>
    <link href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" rel="stylesheet" />

    <div id="toolBar">
      <div className="color black tool" />
      <div className="color red tool" />
      <div className="color green tool" />
      <div className="color blue tool" />
      <div className="color white tool" />
      
      <div className="tool active control" title="Pencil">
        <img src={brush}  className="fas fa-pen pencil" aria-hidden="true"></img>
      </div>
      <div className="tool eraser control" title="Eraser">
        <img src={erase} class="fa fa-eraser" aria-hidden="true"></img>
      </div>

    <div className="tool delete control toToggle" title="Delete">
        <img src={del} className="far fa-trash-alt " aria-hidden="true"></img>
    </div>
      <div className="tool clear control toToggle" title="Clear">
          <img class="fa fa-times" 
          src = {cancel}aria-hidden="true"></img>
      </div>
      <div className="tool control toToggle" title="Pallete">
        <label><img src={pallete} className="far fa-palette pallete" aria-hidden="true"/>
          <input type="color" id="colorPicker" />
        </label>
      </div>

      <div className="tool control" title="Circle">
        <img className="far fa-circle circle" aria-hidden="true"></img>
      </div>
       <div className="tool control" title="Circle">
        <img className="far fa-circle circle" aria-hidden="true"></img>
      </div>
    </div>
  </>
  );
}



export default Tools;