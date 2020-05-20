import makeParticles from './Particle';
import mouseInit, { mouseCoords } from './mouse';
import { makeVertices, drawVertices } from './interactions';

// RequestAnimationFrame prefix checking
window.requestFrame = (function(){
  return  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(callback){
      window.setTimeout(callback, 1000 / 60);
    };
})();

window.cancelRequestFrame = ( function() {
  return window.cancelAnimationFrame         ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame    ||
    window.oCancelRequestAnimationFrame      ||
    window.msCancelRequestAnimationFrame     ||
    clearTimeout;
} )();

// Vars
var p = {};
var p2 = {};
var line = {};
var lines = [];
var width = 0;

/**
 * Updating for the particle animations
 * 
 * @param {array} particles: particles array
 * @param {object} canvas: canvas object
 * @return {void}
 */
function update(particles, canvas) {
  for (let i = particles.length - 1; i >= 0; i--) {
    p = particles[i];
    if (mouseCoords) {
      p.mouseRegion(mouseCoords);
    }
    p.boundaries(canvas);
    p.update();
  }
}

/**
 * Rendering for the particle animations
 * 
 * @param {array} particles: particles array
 * @param {object} ctx: canvas context
 * @return {void}
 */
function render(particles, ctx) {
  width = ctx.canvas.width;
  
  for (let i = particles.length - 1; i >= 0; i--) {
    p = particles[i];
    lines = [];

    // Make vertices
    for (let j = i - 1; j >= 0; j--) {
      p2 = particles[j];
      line = makeVertices(p.vector, p2.vector, p.region);

      // if false, don't add to list
      if (line) lines.push(line);
    }

    // For each vertice, draw vertice
    for (let j = 0; j < lines.length; j++) {
      drawVertices(lines[j], p.region, ctx, width);
    }

    // Draw particle
    p.draw(ctx);
  }
}

/**
 * Initialize particle field drawing
 * 
 * Params in the settings object:
 * @param {int} amount: Amount of particles
 * @param {string} id: id of canvas
 * @param {int} width: width of canvas
 * @param {int} height: height of canvas
 * @param {object} target: target container for the canvas
 * @return {void}
 */
export default function Engine(s = {}) {

  // Settings
  const amount = s.amount ? s.amount : 100;
  const id = s.id ? s.id : 'particleField';
  const width = s.width ? s.width : window.innerWidth;
  const height = s.height ? s.height : window.innerHeight / 2;
  const target = s.target ? document.getElementById(s.target) : document.body;
  const color = s.color ? s.color : 'rgb(0,0,0)';

  // Add canvas to DOM body
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d', { alpha : false });
  canvas.id = id;
  canvas.width = width;
  canvas.height = height;
  target.appendChild(canvas);

  // Make rendering canvas
  const renderCanvas = canvas;
  const renderContext = renderCanvas.getContext('2d', { alpha : false });

  // Make particles
  const particles = makeParticles(amount, renderCanvas.width, renderCanvas.height);
  
  // Do mouse events
  var rect = canvas.getBoundingClientRect();
  mouseInit(canvas, rect);
  
  // Setup a simple rendering engine
  const frameTarget = 60.0;
  const updateCap = 1.0 / frameTarget;
  var firstTime = 0.0;
  var lastTime = window.performance.now() / 1000.0;
  var passedTime = 0.0;
  var unprocessedTime = 0.0;
  var frameTime = 0.0;
  var frames = 0;
  var fps = 0;
  var shouldRender = true;
  var fpsString = '';
  var missedFrameCount = 0;
  var missedFramesString = '';
  
  /**
   * Animation loop function
   * 
   * @return {void} 
   */
  function step() {
    shouldRender = false;

    // Set timers
    firstTime = window.performance.now() / 1000.0;
    passedTime = firstTime - lastTime;
    lastTime = firstTime;
    unprocessedTime += passedTime;
    frameTime += passedTime;

    // If engine skips frames, update untill caught up
    while (unprocessedTime >= updateCap) {
      unprocessedTime -= updateCap;
      shouldRender = true;

      // Do update things
      update(particles, renderCanvas);

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
    if (shouldRender) {

      // Not optimal, but clear canvas anyway
      renderContext.fillStyle = color;
      renderContext.fillRect(0, 0, renderCanvas.width, renderCanvas.height);

      // Do render things
      render(particles, renderContext);

      // Draw image on main canvas from render canvas
      context.drawImage(renderCanvas, 0, 0);

      frames++;
    }

    // Ask browser nicely to give us the next frame
    window.requestFrame(step);
  }

  // Init
  step();
}
