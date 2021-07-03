const onMouseUp = (e, current,drawing, drawLine) => {
  if (!drawing) { return; }
  drawing = false;
  drawLine(current.x, current.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, current.color, true);
};

export default onMouseUp;