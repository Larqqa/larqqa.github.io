/**
 * Animation lib for making a cool new backgournd canvas, with some swanky particles and lines
 */

// RequestAnimationFrame prefix checks
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(callback){
      window.setTimeout(callback, 1000 / 60);
    };
})();

window.cancelRequestAnimFrame = ( function() {
  return window.cancelAnimationFrame         ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame    ||
    window.oCancelRequestAnimationFrame      ||
    window.msCancelRequestAnimationFrame     ||
    clearTimeout;
} )();

// Set variables for intersection checker
var ua, ub, denom = 0;

/**
 * Check if two lines intersect
 *
 * Resources used:
 *   http://paulbourke.net/geometry/pointlineplane/
 *   https://stackoverflow.com/questions/13937782/calculating-the-point-of-intersection-of-two-lines
 * @param {int} x1 etc: Coordinates of four 2D vectors
 * @return {boolean} if true
 */
function line_intersect(x1, y1, x2, y2, x3, y3, x4, y4) {

  // Disregard if points are in the same location
  if (
    (x1 === x3 && y1 === y3 || x1 === x4 && y1 === y4)
    ||
    (x2 === x3 && y2 === y3 || x2 === x4 && y2 === y4)
  ) return false;
  
  denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
  if (denom === 0) return false;
  
  ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
  ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;

  return ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1;
}

/**
 * Brief description. Long description. 
 * 
 * @param {int} x: Starting x position  
 * @param {int} y: Starting y position  
 * @param {int} x2: End x position  
 * @param {int} y2: End y position  
 * @return {object} Return the vector object
 */
function vector(x, y, x2, y2) {
  return({ x: x, y: y, x2: x2, y2: y2 });
}

/**
 * Check distance between two vectors
 * 
 * @param {float} v: vector
 * @param {float} v2: other vector
 * @return {float} distance
 */
function checkDistance(v, v2) {
  return Math.sqrt(Math.pow(v.x - v2.x, 2) + Math.pow(v.y - v2.y, 2));
}

/**
 * Brief description. Long description. 
 * 
 * @param {int} num: Number to map
 * @param {int} inMin: Range to map from minimum
 * @param {int} inMax: Range to map from in maximum
 * @param {int} outMin: Range to map to minimum
 * @param {int} outMax: Range to map to maximum
 * @return 
 */
function mapNumberToRange(num, inMin, inMax, outMin, outMax) {
  return (num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

// Set some variables for use in particle calculations
// Reusing saves a lot on Garbage Collection!
var lines = [];
var distance = 0;
var intersects = false;
var count = 0;
var speed = 0;

// Make All the glorious particles!
class Particle{
  constructor(canvasWidth, canvasHeight){
    this.size = 1;
    this.color =  'rgb(255, 255, 255)';
    this.linewidth = 2;
    this.region = 50;
    this.minvel = Math.random(.7) * 1;
    this.maxvel = 5;
    this.vel = this.minvel;
    this.angle = (Math.random() * 360);
    this.newAngle = 0;

    // Create a new vector for the particle
    this.vector = vector(
      Math.random() * canvasWidth,
      Math.random() * canvasHeight,
      Math.random() * canvasWidth,
      Math.random() * canvasHeight
    );

    // Calculate the new position based on angles,
    // Usable in different shid
    // ~~(x + (Math.cos( this.angle * (Math.PI / 180)) * this.region)),
    // ~~(y + (Math.sin( this.angle * (Math.PI / 180)) * this.region))
    
    this.heading = Math.atan2(this.vector.y - this.vector.y2, this.vector.x - this.vector.x2);
  }

  /**
   * Check if the pixel is outside of the boundaries of the canvas.
   * If it is, move it to the other side of the canvas.
   * 
   * @param {object} canvas: Canvas node
   * @return {void} 
   */
  boundaries(canvas) {
    
    // Check for X boundaries
    if (this.vector.x < 0 - this.size) {
      this.vector.x = canvas.width + this.size;
    } else if (this.vector.x > canvas.width + this.size) {
      this.vector.x = 0 - this.size;
    }

    // Check for Y boundaries
    if (this.vector.y < 0 - this.size) {
      this.vector.y = canvas.height + this.size;
    } else if (this.vector.y > canvas.height + this.size) {
      this.vector.y = 0 - this.size;
    }
  }
  
  /**
   * Check if the mouse is near a pixel.
   * 
   * @param {object} mouse: Mouse position vector
   * @return {void}
   */
  mouseRegion(mouse) {
    
    // Check for mouse inside a region
    distance = checkDistance(this.vector, mouse);
    if (distance < this.region) {

      // Map the distance to the interaction region, so that the smaller it is, the larger the speed
      speed = this.vel + ((this.region - distance) / this.region);

      // Make sure speed won't go over min/max
      this.vel = speed > this.maxvel ? this.maxvel : speed <  this.minvel ? this.minvel : speed;
    }
  }

  /**
   * Update the pixels position
   *  
   * @return {void} 
   */
  update() {

    // Update the position
    this.vector.x += Math.cos(this.heading) * this.vel;
    this.vector.y += Math.sin(this.heading) * this.vel;

    // Gradually decrease velocity back to minimum velocity
    if (this.vel > this.minvel) {
      this.vel = this.vel - 0.005;
    }
  }

  /**
   * Draw the particle
   * 
   * @param {object} ctx: 2D Context of the canvas
   * @return {void}
   */
  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.linewidth;
    ctx.arc(this.vector.x, this.vector.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }
}

// Vertice colors
var alpha = 0;
var r = 0;
var g = 0;
var b = 0;
/**
 * Draw a lines between particles
 * 
 * @param {array} particles: Array of particles
 * @param {object} ctx: Canvas context
 * @param {int} threshold: line length threshold
 * @param {string} color: line color as rgb numbers
 * @param {float} lineWidth: the line width
 * @param {int} maxVertices: Maximum amount of lines from one particle
 * @return 
 */
function vertices(
  particles,
  ctx,
  threshold = 100,
  lineWidth = 0.5,
  maxVertices = 5
) {
  
  // Check if the particles i & j are close enough to be connected to each other
  for (let i = particles.length - 1; i > 0; i--) {
    const p = particles[i];
    count = 0;
    
    for (let j = i - 1; j >= 0; j--) {
      if (count > maxVertices) break;
      const p2 = particles[j];
      intersects = false;

      // Check if distance between points is larger than treshold
      distance = checkDistance(p.vector, p2.vector);

      if (distance > threshold) continue; // if too long, abort

      // Check if this line intersects with already existing lines
      for (let k = 0; k < lines.length; k++) {
        const line = lines[k];

        // Check if current particle is out of threshold * 2 of vector
        const distance1 = checkDistance(p.vector, line.p);
        const distance2 = checkDistance(p.vector, line.p2);
        if (distance1 > (threshold * 2) && distance2 > (threshold * 2)) continue;

        // Check if lines intersects
        if (line_intersect(
          p.vector.x, p.vector.y,
          p2.vector.x, p2.vector.y,
          line.p.x, line.p.y,
          line.p2.x, line.p2.y
        )) {
          intersects = true;
          break;
        }
      }

      // If all is clear, then add line to the draw list
      if (!intersects) {
        lines.push({
          p: p.vector,
          p2: p2.vector,
          d: distance
        });
        
        count++;
      }
    }
  }

  // Draw all the lines!
  for (let l = 0; l < lines.length; l++) {
    const p = lines[l].p;
    const p2 = lines[l].p2;
    const width = ctx.canvas.width;

    if (p.x > width - (width / 3) / 2) {
      r = mapNumberToRange(p.x, width - (width / 3) / 2, width, 0, 255);
    } else {
      r = mapNumberToRange(p.x, 0, width / 3 + (width / 3), 255, 0);
    }

    if (p.x > width / 2) {
      b =  mapNumberToRange(p.x, width / 2, width - width / 3 + (width / 3), 255, 0);
    } else {
      b =  mapNumberToRange(p.x, width / 3 - (width / 3), width / 2, 0, 255);
    }

    if (p.x < (width / 3) / 2) {
      g = mapNumberToRange(p.x, 0, (width / 3) / 2, 255, 0);
    } else{
      g = mapNumberToRange(p.x, width  - width / 3 - (width / 3), width, 0, 255);
    }

    alpha = 1 - (lines[l].d / threshold);

    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = `rgb(${r},${g},${b},${alpha})`;

    ctx.moveTo(~~(p.x + 0.5), ~~(p.y + 0.5));
    ctx.lineTo(~~(p2.x + 0.5), ~~(p2.y + 0.5));
    ctx.stroke();
  }

  // Empty out lines array after drawing is finished
  lines = [];
}

// Set variables for some global mouse data
var mouseCoords;
var rect;

/**
 * Add the mouse events to the canvas
 * 
 * @param {canvas} object: Canvas object
 * @return {void}
 */
function mouseInit(canvas) {

  // Get the mouse position inside of the canvas
  document.addEventListener('mousemove', function(e) {

    // Initialize coordinates
    rect = canvas.getBoundingClientRect();
    mouseCoords = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };

    // Bind mouse position to the canvas
    if (mouseCoords.x > canvas.width){
      mouseCoords.x = canvas.width;
    } else if (mouseCoords.x < 0) {
      mouseCoords.x = 0;
    }

    if (mouseCoords.y > canvas.height) {
      mouseCoords.y = canvas.height;
    } else if (mouseCoords.y < 0) {
      mouseCoords.y = 0;
    }

  }, false);
}

/**
 * Initialize particle field drawing
 * 
 * @param {int} amount: Amount of particles
 * @param {string} id: id of canvas
 * @param {int} width: width of canvas
 * @param {int} height: height of canvas
 * @param {object} target: target container for the canvas
 * @return {void}
 */
export default function initDrawing(
  amount = 400,
  id = 'particleField',
  width = window.innerWidth,
  height = window.innerHeight / 2,
  target = document.body
) {

  // Add canvas to DOM body
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d', { alpha : false });
  canvas.id = id;
  canvas.width = width;
  canvas.height = height;
  target.appendChild(canvas);

  // Make rendering canvas
  const renderCanvas = document.createElement('canvas');
  const renderContext = renderCanvas.getContext('2d', { alpha : false });
  renderCanvas.width = width;
  renderCanvas.height = height;
  
  // Do mouse events
  mouseInit(canvas);

  // Make particles
  let particles = [];
  for (let i = 0; i < amount; i++) {
    particles.push(new Particle(canvas.width, canvas.height));
  }
  
  // Setup a simple rendering engine
  const frameTarget = 60.0;
  const updateCap = 1.0 / frameTarget;
  let firstTime = 0.0;
  let lastTime = window.performance.now() / 1000.0;
  let passedTime = 0.0;
  let unprocessedTime = 0.0;
  let frameTime = 0.0;
  let frames = 0;
  let fps = 0;
  let render = true;
  let fpsString = '';
  let missedFrameCount = 0;
  let missedFramesString = '';

  /**
   * Animation loop function
   * 
   * @return {void} 
   */
  function step() {
    render = false;

    // Set timers
    firstTime = window.performance.now() / 1000.0;
    passedTime = firstTime - lastTime;
    lastTime = firstTime;
    unprocessedTime += passedTime;
    frameTime += passedTime;
    
    // If engine skips frames, update untill caught up
    while (unprocessedTime >= updateCap) {
      unprocessedTime -= updateCap;
      render = true;

      // Update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (mouseCoords) {
          p.mouseRegion(mouseCoords);
        }
        p.boundaries(canvas);
        p.update();
      }

      // Update FPS
      if (frameTime >= 1.0) {
        frameTime = 0;
        fps = frames;
        frames = 0;
        fpsString = `FPS: ${fps}`;

        // Check how many frames were missed
        missedFrameCount = frameTarget - fps;
        if (missedFrameCount > 0) {
          missedFramesString = `Missed frames: ${missedFrameCount}`;
        }
        console.log(`%c${fpsString} %c${missedFramesString}`, 'color: green', 'color: red');
      }
    }

    // Do render actions
    if (render) {

      // Not optimal, but clear canvas anyway
      renderContext.fillStyle = 'rgb(0, 0, 0)';
      renderContext.fillRect(0, 0, canvas.width, canvas.height);

      // Draw each particle
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (mouseCoords) {
          p.mouseRegion(mouseCoords);
        }
        p.boundaries(canvas);
        p.update();
        p.draw(renderContext);
      }

      // Draw lines between the particles
      vertices(particles, renderContext);

      context.drawImage(renderCanvas, 0, 0);

      frames++;
    }

    window.requestAnimFrame(step);
  }

  // Initialize animation
  step();
}
