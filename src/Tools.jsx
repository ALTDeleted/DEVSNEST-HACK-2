import React, { useRef, useEffect } from 'react';
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

      <div className="tool active" title="Pencil">
        <i className="fas fa-pen pencil" aria-hidden="true"></i>
      </div>
      <div className="tool eraser" title="Eraser">
        <i class="fa fa-eraser" aria-hidden="true"></i>
      </div>

    <div className="tool delete" title="Delete">
        <i className="far fa-trash-alt " aria-hidden="true"></i>
    </div>
      <div className="tool clear" title="Clear">
          <i class="fa fa-times" aria-hidden="true"></i>
      </div>
      <div className="tool" title="Pallete">
        <label><i className="far fa-palette pallete" aria-hidden="true"></i>
          <input type="color" name="" id="colorPicker" />
        </label>
      </div>

      <div className="tool" title="Circle">
        <i className="far fa-circle circle" aria-hidden="true"></i>
      </div>
      <div className="tool" title="Square">
        <i className="far fa-square square" aria-hidden="true"></i>
      </div>
      <div className="tool" title="Triangle">
        <i className="far fa-triangle triangle"  aria-hidden="true"></i>
      </div>
      
    </div>
  </>
  );
}


export default Tools;