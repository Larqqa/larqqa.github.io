
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
 * @param {x, y * 4} Coords of two lines
 * @return {boolean} if true
 */
function line_intersect(x1, y1, x2, y2, x3, y3, x4, y4) {

  // Disregard if points are in the same index
  if (x1 === x3 && y1 === y3) return false;
  if (x1 === x4 && y1 === y4) return false;
  if (x2 === x3 && y2 === y3) return false;
  if (x2 === x4 && y2 === y4) return false;
  
  var ua, ub, denom = (y4 - y3)*(x2 - x1) - (x4 - x3)*(y2 - y1);
  if (denom === 0) {
    return false;
  }
  ua = ((x4 - x3)*(y1 - y3) - (y4 - y3)*(x1 - x3))/denom;
  ub = ((x2 - x1)*(y1 - y3) - (y2 - y1)*(x1 - x3))/denom;

  return {
    seg1: ua >= 0 && ua <= 1,
    seg2: ub >= 0 && ub <= 1
  };
}

class Particle{
  constructor(width, height){
    this.size = 3;
    this.color =  'rgb(255, 255, 255)';

    this.minvel = 0.5;
    this.maxvel = 2;
    this.vel = this.minvel;
    this.heading = (Math.random() * 360);
    this.x = Math.floor(Math.random() * width);
    this.y = Math.floor(Math.random() * height);
    this.headingX = this.x + (Math.cos( this.heading * (Math.PI / 180)) * this.size);
    this.headingY = this.y + (Math.sin( this.heading * (Math.PI / 180)) * this.size);
    this.tan = Math.atan2(this.y - this.headingY, this.x - this.headingX);
  }

  /**
   * Check if the pixel is outside of the boundaries of the canvas 
   * 
   * @param {object} canvas: Canvas node
   * @return {void} 
   */
  boundaries(canvas) {

    if (this.x < 0 - this.size) {
      this.x = canvas.width + this.size;
    } else if (this.x > canvas.width + this.size) {
      this.x = 0 - this.size;
    }
    
    if (this.y < 0 - this.size) {
      this.y = canvas.height + this.size;
    } else if (this.y > canvas.height + this.size) {
      this.y = 0 - this.size;
    }
  }

  /**
   * Check if the mouse is near. 
   * 
   * @param {object} mouse: Mouse object
   * @return {void}
   */
  mouseClose(mouse) {
    const offsetX = Math.floor(this.x - mouse.x);
    const offsetY = Math.floor(this.y - mouse.y);

    // Check for mouse inside a region
    const region = 50;
    if ((offsetX < region && offsetX > -region) && (offsetY < region && offsetY > -region)) {

      const newHeading = Math.atan2(mouse.y - this.y, mouse.x - this.x) * 180 / Math.PI;

      this.headingX = this.x + (Math.cos( newHeading * (Math.PI / 180)));
      this.headingY = this.y + (Math.sin( newHeading * (Math.PI / 180)));
      this.angle = Math.atan2(this.y - this.headingY, this.x - this.headingX);

      const length = Math.floor(Math.sqrt( offsetX * offsetX + offsetY * offsetY ));
      const speed = this.vel + ((region - length) / region);

      // Make sure speed won't go over min/max
      this.vel = speed > this.maxvel ? this.maxvel : speed < 0 ? this.minvel : speed;
    }
  }

  /**
   * Update the pixels position
   *  
   * @return {void} 
   */
  update() {
    this.x += Math.cos(this.tan) * this.vel;
    this.y += Math.sin(this.tan) * this.vel;

    // Gradually change the angle to be opposite to the mouse
    if (Math.floor(this.tan) !== Math.floor(this.angle)) {
      if (this.angle > this.tan) {
        this.tan += 0.1;
      } else if (this.angle < this.tan) {
        this.tan -= 0.1;
      }
    }

    // Gradually decrease velocity back to minimum
    if (this.vel > this.minvel) {
      this.vel = this.vel - 0.005;
    }
  }

  /**
   * Brief description. Long description. 
   * 
   * @param {object} ctx: 2D Context of the canvas
   * @return {void}
   */
  draw(ctx) {
    ctx.strokeStyle = 'rgb(255,255,0)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, 1, 0, 2 * Math.PI);
    ctx.stroke();
  }
}

/**
 * Draw a line from particle to particle
 * 
 * @param 
 * @return 
 */
function vertices(particles, ctx) {
  let count = 0;
  let lines = [];
  console.log('yeets');
  
  // Check if the particles are close enough to be connected
  for (var i = particles.length - 1; i > 0; i--) {
    const p = particles[i];
    
    for (var j = i - 1; j >= 0; j--) {
      const p2= particles[j];
      let intersects = false;

      // Check if length is larger than treshold
      const offsetX = p.x - p2.x;
      const offsetY = p.y - p2.y;
      const length = Math.floor(Math.sqrt( offsetX * offsetX + offsetY * offsetY ));
      if (length > 100) continue;

      // Check if this line intersects with existing lines
      for (var k = 0; k < lines.length; k++) {
        const p3 = lines[k][0];
        const p4 = lines[k][1];

        const segs = line_intersect(p.x, p.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
        if (segs.seg1 && segs.seg2) {
          intersects = true;
          break;
        }
      }

      if (!intersects) lines.push([
        { x: p.x, y: p.y },
        { x: p2.x, y: p2.y }
      ]);
    }
  }
  
  for (var l = 0; l < lines.length; l++) {
    const p = lines[l][0];
    const p2 = lines[l][1];
    
    // ctx.strokeStyle = 'rgba(0,255,255,0.2)';
    ctx.strokeStyle = 'rgb(255,255,0)';
    ctx.lineWidth = 0.1;
    ctx.beginPath();
    ctx.moveTo(~~p.x + 0.5, ~~p.y + 0.5);
    ctx.lineTo(~~p2.x + 0.5, ~~p2.y + 0.5);
    ctx.stroke();
    ctx.closePath();
  }
}


let mouseCoords;
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight / 2;
document.body.appendChild(canvas);

export const  initDrawing = (amount) => {
  
  // Get the mouse position inside of the canvas
  document.addEventListener('mousemove', function(e) {

    // Initialize coordinates
    const rect = canvas.getBoundingClientRect();
    mouseCoords = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };

    // Check mouse positions boundaries
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

  // Set particles
  let particles = [];
  for (let i = 0; i < amount; i++) {
    particles.push(new Particle(canvas.width, canvas.height));
  }

  // Get 2D context
  const ctx = canvas.getContext('2d', { alpha : false });

  // Loop @ 24 FPS
  const step = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.map(p => {
      if (mouseCoords) {
        p.mouseClose(mouseCoords);
      }
      p.boundaries(canvas);
      p.update();
      p.draw(ctx);
    });

    // Draw lines between particles
    vertices(particles, ctx);

    window.requestAnimationFrame(step);
  };
  step();
};
