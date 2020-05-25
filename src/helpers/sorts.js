/**
 * Sort the given array by date
 * 
 * @param {array} array: array of post objects
 * @param {boolean} order: true is decending false is ascending
 * @param {int} length: the length of the new array, default to array length
 * @return {array} Return new sorted array 
 */
export function sortByDate(array, order = true) {

  // Make posts alphabetical first
  array = sortByName(array);

  if (order) {
    return array.sort((a, b) => b.meta.date - a.meta.date);
  } else {
    return array.sort((a, b) => a.meta.date - b.meta.date);
  }
}

/**
 * Sort the given array by name
 * 
 * @param {array} array: array of post objects
 * @param {boolean} order: true is decending false is ascending
 * @param {int} length: the length of the new array, default to array length
 * @return {array} Return new sorted array 
 */
export function sortByName(array, order = true) {
  if (order) {
    return array.sort((a, b) => a.meta.title.localeCompare(b.meta.title));
  } else {
    return array.sort((a, b) => b.meta.title.localeCompare(a.meta.title));
  }
}

/**
 * Sort the given array by categories
 * 
 * @param {array} array: array of post objects
 * @param {array} categories: array of categories
 * @return {array} sorted array
 */
export function sortByCategory(array, categories = [], exclusive = true) {
  if (exclusive) {
    return array.filter(a => {
      if (a.meta.categories && categories.every(c => a.meta.categories.includes(c))) {
        return true;
      } else return false;
    });
  } else {
    return array.filter(a => {
      if (a.meta.categories && a.meta.categories.some(c => categories.includes(c))) {
        return true;
      } else return false;
    });
  }
}

/**
 * Slice array based on the limiting values
 * 
 * @param {array} array: array of posts
 * @param {int} limiter: starting index
 * @param {int} length: ending index
 * @return {array} Sliced array
 */
export function sliceArray(array, limiter = 0, length = array.length) {
  return array.slice(limiter, length);
}
