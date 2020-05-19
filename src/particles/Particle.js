import {
  vector,
  checkDistance,
} from './helpers';

// Vars
var distance = 0.0;
var speed = 0.0;

/**
 * The Particle constructor
 */
export class Particle{
  constructor(canvasWidth, canvasHeight){
    this.size = 1;
    this.color =  'rgb(255, 255, 255)';
    this.linewidth = 2;
    this.region = 100;
    this.minvel = Math.random(.7) * 1;
    this.maxvel = 5;
    this.vel = this.minvel;
    this.angle = Math.random() * 360;
    this.maxVertices = 5;
    this.lines = [];
    
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
}

/**
 * Make the particles
 * 
 * @param {int} amount: amount of particles 
 * @return {array} array of particles
 */
export default function makeParticles(amount = 100, width, height) {
  var particles = [];
  for (let i = 0; i < amount; i++) {
    particles.push(new Particle(width, height));
  }
  return particles;
}
