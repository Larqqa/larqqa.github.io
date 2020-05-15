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
  
  const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
  if (denom === 0) return false;
  
  let ua, ub = denom;
  ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
  ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;

  return ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1;
}

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
    this.x = Math.floor(Math.random() * canvasWidth);
    this.y = Math.floor(Math.random() * canvasHeight);
    this.headingX = this.x + (Math.cos( this.angle * (Math.PI / 180)) * this.size);
    this.headingY = this.y + (Math.sin( this.angle * (Math.PI / 180)) * this.size);
    this.heading = Math.atan2(this.y - this.headingY, this.x - this.headingX);
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
    if (this.x < 0 - this.size) {
      this.x = canvas.width + this.size;
    } else if (this.x > canvas.width + this.size) {
      this.x = 0 - this.size;
    }

    // Check for Y boundaries
    if (this.y < 0 - this.size) {
      this.y = canvas.height + this.size;
    } else if (this.y > canvas.height + this.size) {
      this.y = 0 - this.size;
    }
  }

  /**
   * Check if the mouse is near a pixel.
   * 
   * @param {object} mouse: Mouse object
   * @return {void}
   */
  mouseClose(mouse) {
    const offsetX = Math.floor(this.x - mouse.x);
    const offsetY = Math.floor(this.y - mouse.y);

    // Check for mouse inside a region
    const distance = Math.sqrt( offsetX * offsetX + offsetY * offsetY );
    if (distance < this.region) {
      
      // TODO Make mouse interaction BETTER
      // const newHeading = Math.atan2(mouse.y - this.y, mouse.x - this.x) * 180 / Math.PI;      
      // this.headingX = this.x + (Math.cos( newHeading * (Math.PI / 180)));
      // this.headingY = this.y + (Math.sin( newHeading * (Math.PI / 180)));
      // this.newAngle = Math.atan2(this.y - this.headingY, this.x - this.headingX);

      // Map the distance to the interaction region, so that the smaller it is, the larger the speed
      const speed = this.vel + ((this.region - distance) / this.region);

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
    this.x += Math.cos(this.heading) * this.vel;
    this.y += Math.sin(this.heading) * this.vel;

    // TODO With mouse interactions
    // Gradually change the current angle to the new angle
    // if (Math.floor(this.heading) !== Math.floor(this.newAngle)) {

    //   // Use the shortest path, to change direction
    //   if (this.newAngle > this.heading) {
    //     this.heading += 0.1;
    //   } else if (this.newAngle < this.heading) {
    //     this.heading -= 0.1;
    //   }
    // }

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
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
  }
}

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
  color = '255,255,0',
  lineWidth = 0.5,
  maxVertices = 5
) {
  let lines = [];

  // Check if the particles i & j are close enough to be connected to each other
  for (let i = particles.length - 1; i > 0; i--) {
    const p = particles[i];
    let count = 0;
    
    for (let j = i - 1; j >= 0; j--) {
      if (count > maxVertices) break;
      const p2= particles[j];
      let intersects = false;

      // Check if distance between points is larger than treshold
      const offsetX = p.x - p2.x;
      const offsetY = p.y - p2.y;
      const distance = Math.floor(Math.sqrt( offsetX * offsetX + offsetY * offsetY ));

      if (distance > threshold) continue; // if too long, abort

      // Check if this line intersects with already existing lines
      for (let k = 0; k < lines.length; k++) {
        if (line_intersect(
          p.x, p.y,
          p2.x, p2.y,
          lines[k][0].x, lines[k][0].y,
          lines[k][1].x, lines[k][1].y
        )) {
          intersects = true;
          break;
        }
      }

      // If all is clear, then add line to the draw list
      if (!intersects) {
        lines.push([
          { x: p.x, y: p.y },
          { x: p2.x, y: p2.y },
          distance
        ]);
        
        count++;
      }
    }
  }

  // Draw all the lines!
  for (let l = 0; l < lines.length; l++) {

    // Normalize distance to 0-1
    const alpha = 1 - (lines[l][2] / threshold);

    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = `rgb(${color},${alpha})`;
    ctx.moveTo(~~lines[l][0].x + 0.5, ~~lines[l][0].y + 0.5);
    ctx.lineTo(~~lines[l][1].x + 0.5, ~~lines[l][1].y + 0.5);
    ctx.stroke();
    ctx.closePath();
  }
}

// Set some global mouse data
var mouseCoords;

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
    const rect = canvas.getBoundingClientRect();
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
 * @return {void}
 */
export default function initDrawing(
  amount = 100,
  id = 'particleField',
  width = window.innerWidth,
  height = window.innerHeight / 2
) {

  // Add canvas to DOM body
  const canvas = document.createElement('canvas');
  canvas.id = id;
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);

  // Do mouse events
  mouseInit(canvas);

  // Make particles
  let particles = [];
  for (let i = 0; i < amount; i++) {
    particles.push(new Particle(canvas.width, canvas.height));
  }
  
  // Get 2D context
  const ctx = canvas.getContext('2d', { alpha : false });

  /**
   * Animation loop function
   * 
   * @return {void} 
   */

  // Setup a simple rendering engine
  const updateCap = 1.0 / 60.0;
  let firstTime = 0;
  let lastTime = window.performance.now() / 1000.0;
  let passedTime = 0;
  let unprocessedTime = 0;
  let frameTime = 0.0;
  let frames = 0;
  let fps = 0;
  let render = true;

  function step() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
        p.update();
      }

      // Update FPS
      if (frameTime >= 1.0) {
        frameTime = 0;
        fps = frames;
        frames = 0;
        console.log('FPS: ', fps);
      }
    }

    // Do render actions
    if (render) {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // If mouse data exists, do mouse proximity checks
        if (mouseCoords) {
          p.mouseClose(mouseCoords);
        }
        p.boundaries(canvas);
        p.update();
        p.draw(ctx);
      }

      // Draw lines between particles
      vertices(particles, ctx);

      frames++;
    } else {
      setTimeout(1);
    }

    window.requestAnimFrame(step);
  }

  // Initialize animation
  step();
}
