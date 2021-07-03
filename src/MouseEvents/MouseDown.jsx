const onMouseDown = (e,current,drawing) => {
  console.log("inside:",e);
  drawing = true;
  current.x = e.clientX || e.touches[0].clientX;
  current.y = e.clientY || e.touches[0].clientY;
};

export default onMouseDown;