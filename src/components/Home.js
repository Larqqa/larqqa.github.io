/**
 * Brief description. Long description. 
 * 
 * @param 
 * @return 
 */import React, { useState, useEffect }from 'react';
import Page from './Page';

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
   * @param 
   * @return 
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

    if (Math.floor(this.tan) != Math.floor(this.angle)) {
      if (this.angle > this.tan) {
        this.tan += 0.1;
      } else if (this.angle < this.tan) {
        this.tan -= 0.1;
      }
    }

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
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size / Math.PI, 0, 2 * Math.PI);
    ctx.stroke();
  }
}

const Home = () => {
  const Animation = () => {
    const [ canvas, setCanvas ] = useState(null);
    let mouseCoords;

    const initDrawing = (amount) => {

      // Get the mouse position inside of the canvas
      document.addEventListener('mousemove', function(e) {

        // Initialize coordinates
        const rect = canvas.getBoundingClientRect();
        mouseCoords = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };

        // Check X mouse positions boundaries
        if (mouseCoords.x > canvas.width){
          mouseCoords.x = canvas.width;
        } else if (mouseCoords.x < 0) {
          mouseCoords.x = 0;
        }

        // Check Y mouse position boundaries
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

      // Loop @ 24 FPS
      setInterval(() => {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.map(p => {
          if (mouseCoords) {
            p.mouseClose(mouseCoords);
          }
          p.boundaries(canvas);
          p.update();
          p.draw(ctx);
        });
      },1000 / 24);
    };

    // Wait for canvas to be drawn
    useEffect(() => {
      setCanvas(document.getElementById('particle-field'));
      if (canvas) {
        canvas.style.background = 'black';
        initDrawing(1000);
      }
    }, [ canvas ]);
    
    return (
      <canvas id="particle-field" width="1000" height="500"></canvas>
    );
  };
  
  return (
    <>
      <h1>Home</h1>
      <Page content="home" />

      <Animation />
    </>
  );
};

export default Home;
