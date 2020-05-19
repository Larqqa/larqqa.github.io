import Particle from './Particle';
import mouseInit, { mouseCoords } from './mouse';

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

/**
 * A simple 2D rendering engine
 */

// Some vars
var globalLines = [];
var rect = {};
var p = {};

/**
 * Updating for the particle animations
 * 
 * @param 
 * @return 
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
 * @param 
 * @return 
 */
function render(particles, ctx, canvas) {

  // Make & draw vertices & draw particles
  for (let i = particles.length - 1; i >= 0; i--) {
    p = particles[i];

    // Make & save vertices
    globalLines.push(...p.updateVertices(particles, i, globalLines));

    // For each vertice, draw vertice
    for (let j = 0; j < p.lines.length; j++) {
      p.drawVertices(
        p.lines[j].p, p.lines[j].p2, p.lines[j].d,
        ctx, canvas.width
      );
    }

    // Draw particle
    p.draw(ctx);
  }
  globalLines = [];
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
export default function initEngine(
  amount = 300,
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
  rect = canvas.getBoundingClientRect();
  mouseInit(canvas, rect);

  // Make particles
  var particles = [];
  for (let i = 0; i < amount; i++) {
    particles.push(new Particle(canvas.width, canvas.height));
  }
  
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
  var engine;
  
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
      renderContext.fillStyle = 'rgb(0, 0, 0)';
      renderContext.fillRect(0, 0, renderCanvas.width, renderCanvas.height);

      // Do render things
      render(particles, renderContext, renderCanvas);

      // Draw image on main canvas from render canvas
      context.drawImage(renderCanvas, 0, 0);

      frames++;
    }

    // Ask browser nicely to give us the next frame
    engine = window.requestFrame(step);
  }

  // Initialize animation
  function start() {
    step();
  }

  function stop() {
    window.cancelRequestFrame(engine);
  }

  function frame() {
    stop();
    start();
  }

  start();
}
