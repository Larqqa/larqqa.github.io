import {
  lineIntersect,
  vector,
  checkDistance,
  mapNumberToRange
} from './helpers';

/**
 * The Particle constructor
 */

// Set some variables
var p2 = {};
var line = {};
var intersects = false;
var distance = 0.0;
var speed = 0.0;
var count = 0;
var alpha = 0.0;
var r = 0;
var g = 0;
var b = 0;

// Blueprint for all the glorious particles!
export default class Particle{
  constructor(canvasWidth, canvasHeight){
    this.size = 1;
    this.color =  'rgb(255, 255, 255)';
    this.linewidth = 2;
    this.region = 100;
    this.minvel = Math.random(.7) * 1;
    this.maxvel = 5;
    this.vel = this.minvel;
    this.angle = (Math.random() * 360);
    this.newAngle = 0;
    this.maxVertices = 5;

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
   * @return {array} Array of line objects
   */
  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.linewidth;
    ctx.arc(this.vector.x, this.vector.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  /**
   * Update the vertices
   * 
   * @param {array} particles:
   * @param {int} index: index of current particle
   * @param {array} globalLines: List of all vertices for checking intersections
   * @param {int} maxVertices: Maximum amount of vertices per particle
   * @param {boolean} noIntersect: if should check for intersecting vertices
   * @return {array} return the array of vertices
   */
  updateVertices(particles, index, globalLines, maxVertices = false, noIntersect = false) {
    count = 0;
    this.lines = [];

    // Loop through all the particles that come after the current particle
    for (let j = index - 1; j >= 0; j--) {

      // Check if vertice count is over maximum count
      // if (count > this.maxVertices) break;
      if (maxVertices && count > maxVertices) break;
      
      p2 = particles[j];
      intersects = false;

      // Check if distance between points is larger than treshold
      distance = checkDistance(this.vector, p2.vector);

      if (distance > this.region) continue; // if too long, abort

      // Check if this line intersects with already existing lines
      if (noIntersect) {
        for (let k = 0; k < globalLines.length; k++) {
          line = globalLines[k];

          // Check if current particle is farther than threshold * 2 of the already made lines
          if (
            checkDistance(this.vector, line.p) > (this.region * 2) &&
              checkDistance(this.vector, line.p2) > (this.region * 2)
          ) continue;

          // Check if lines intersect
          if (lineIntersect(this.vector, p2.vector, line.p, line.p2)) {
            intersects = true;
            break;
          }
        }
      }

      // If all is clear, then add line to the draw list
      if (!intersects) {
        this.lines.push({
          p: this.vector,
          p2: p2.vector,
          d: distance
        });

        count++;
      }
    }

    return this.lines;
  }

  /**
   * Draw all the lines between the particles
   * 
   * @param {object} p: First vector
   * @param {object} p2: Second vector
   * @param {float} length: Length of line
   * @param {object} ctx: Canvas context
   * @param {int} width: Canvas widht
   * @return {void}
   */
  drawVertices(p, p2, length, ctx, width) {

    // Map a color range based on positional X value:
    
    // start to 1/3 and last 1/5 to end
    if (p.x > width - (width / 3) / 2) {
      r = mapNumberToRange(p.x, width - (width / 3) / 2, width, 0, 255);
    } else {
      r = mapNumberToRange(p.x, 0, width / 3 + (width / 3), 255, 0);
    }

    // 1/3 to 2/3
    if (p.x > width / 2) {
      b =  mapNumberToRange(p.x, width / 2, width - width / 3 + (width / 3), 255, 0);
    } else {
      b =  mapNumberToRange(p.x, width / 3 - (width / 3), width / 2, 0, 255);
    }

    // 2/3 to end and start to 1/5
    if (p.x < (width / 3) / 2) {
      g = mapNumberToRange(p.x, 0, (width / 3) / 2, 255, 0);
    } else{
      g = mapNumberToRange(p.x, width  - width / 3 - (width / 3), width, 0, 255);
    }

    // The length of the vertice mapped from 0 to 1
    alpha = 1 - (length / 100);

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = `rgb(${r},${g},${b},${alpha})`;
    ctx.moveTo(~~(p.x + 0.5), ~~(p.y + 0.5));
    ctx.lineTo(~~(p2.x + 0.5), ~~(p2.y + 0.5));
    ctx.stroke();
  }
}
