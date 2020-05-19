/**
 * Mouse interaction event listeners 
 */

// Make mouse coordinates a nice little global
export var mouseCoords = {};

/**
 * Add the mouse events to the canvas
 * 
 * @param {canvas} object: Canvas object
 * @return {void}
 */
export default function mouseInit(canvas, rect) {
  
  // Get the mouse position inside of the canvas
  document.addEventListener('mousemove', function(e) {

    // Initialize coordinates
    mouseCoords = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };

    // Bind mouse position to the canvas X
    if (mouseCoords.x > canvas.width){
      mouseCoords.x = canvas.width;
    } else if (mouseCoords.x < 0) {
      mouseCoords.x = 0;
    }
    
    // Bind mouse position to the canvas Y
    if (mouseCoords.y > canvas.height) {
      mouseCoords.y = canvas.height;
    } else if (mouseCoords.y < 0) {
      mouseCoords.y = 0;
    }

  }, false);
}
