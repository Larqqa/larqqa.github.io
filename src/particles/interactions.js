import {
  checkDistance,
  mapNumberToRange
} from './helpers';

// Vars
var distance = 0.0;
var r = 0;
var g = 0;
var b = 0;
var alpha = 0;

/**
 * Update the vertices
 * 
 * @param {object} pVector: vector
 * @param {object} p2Vector: vector to compare to
 * @param {int} region: Region around particle to check
 * @return {array} return the array of vertices
 */
export function makeVertices(pVector, p2Vector, region) {

  // Check if distance between points is larger than treshold
  distance = checkDistance(pVector, p2Vector);
  if (distance > region) return false; // if too long, abort

  // Add line to the draw list
  return ({
    p: pVector,
    p2: p2Vector,
    d: distance
  });
}

/**
 * Draw all the lines between the particles
 * 
 * @param {object} line: line object
 * @param {int} region: max length of vertice
 * @param {object} ctx: Canvas context
 * @param {int} width: Canvas widht
 * @return {void}
 */
export function drawVertices(line, region, ctx, width) {
  const offset = width / 4;
  const halfOffset = offset / 2;
  
  const firstThird = [ halfOffset, offset + offset ];
  const middleFirst = [ offset - halfOffset, width / 2 ];
  const middleLast = [ width / 2, width - halfOffset ];
  const lastThird = [ width - (offset * 2), width ];

  // Red section
  if (line.p.x > width - halfOffset) {
    r = mapNumberToRange(line.p.x, width - halfOffset, width, 0, 255);
  } else {
    r = mapNumberToRange(line.p.x, firstThird[0], firstThird[1], 255, 0);
  }

  // Green section
  if (line.p.x < middleFirst[1]) {
    g = mapNumberToRange(line.p.x, middleFirst[0], middleFirst[1], 0, 255);
  } else {
    g = mapNumberToRange(line.p.x, middleLast[0], middleLast[1], 255, 0);
  }

  // Blue section
  if (line.p.x < halfOffset) {
    b = mapNumberToRange(line.p.x, 0, halfOffset, 255, 0);
  } else {
    b = mapNumberToRange(line.p.x, lastThird[0], lastThird[1], 0, 255);
  }

  // The length of the vertice mapped from 0 to 1
  alpha = mapNumberToRange(line.d, 0, region, 1, 0);
  
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = `rgb(${r},${g},${b},${alpha})`;
  ctx.moveTo(~~(line.p.x + 0.5), ~~(line.p.y + 0.5));
  ctx.lineTo(~~(line.p2.x + 0.5), ~~(line.p2.y + 0.5));
  ctx.stroke();
}
