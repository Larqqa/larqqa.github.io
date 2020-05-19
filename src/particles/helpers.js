/**
 * Some helpers for the particle calculations
 */

var ua = 0.0;
var ub = 0.0;
var denom = 0.0;

/**
 * Check if two lines intersect
 *
 * Resources used:
 *   http://paulbourke.net/geometry/pointlineplane/
 *   https://stackoverflow.com/questions/13937782/calculating-the-point-of-intersection-of-two-lines
 * @param {object} v1: Vector object of first line
 * @param {object} v2: Vector object of first line
 * @param {object} v3: Vector object of second line
 * @param {object} v4: Vector object of second line
 * @return {boolean} if true
 */
export function lineIntersect(v1, v2, v3, v4) {

  // Disregard if vectors are in the same location
  if (v1 === v3 || v1 === v4) return false;
  if (v2 === v3 || v2 === v4) return false;
  
  denom = (v4.y - v3.y) * (v2.x - v1.x) - (v4.x - v3.x) * (v2.y - v1.y);
  if (denom === 0) return false;
  
  ua = ((v4.x - v3.x) * (v1.y - v3.y) - (v4.y - v3.y) * (v1.x - v3.x)) / denom;
  ub = ((v2.x - v1.x) * (v1.y - v3.y) - (v2.y - v1.y) * (v1.x - v3.x)) / denom;

  return ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1;
}

/**
 * Make a new vector
 * 
 * @param {int} x: Starting x position  
 * @param {int} y: Starting y position  
 * @param {int} x2: End x position  
 * @param {int} y2: End y position  
 * @return {object} Return the vector object
 */
export function vector(x, y, x2, y2) {
  return({ x: x, y: y, x2: x2, y2: y2 });
}

/**
 * Check distance between two vectors
 * 
 * @param {float} v: vector
 * @param {float} v2: other vector
 * @return {float} distance
 */
export function checkDistance(v, v2) {
  return Math.sqrt(Math.pow(v.x - v2.x, 2) + Math.pow(v.y - v2.y, 2));
}

/**
 * Map a value from a range to a different range
 * 
 * @param {int} num: Number to map
 * @param {int} inMin: Range to map from minimum
 * @param {int} inMax: Range to map from in maximum
 * @param {int} outMin: Range to map to minimum
 * @param {int} outMax: Range to map to maximum
 * @return 
 */
export function mapNumberToRange(num, inMin, inMax, outMin, outMax) {
  return (num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}
