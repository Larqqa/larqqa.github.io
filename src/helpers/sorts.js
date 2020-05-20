/**
 * Sort the given array by date
 * Return whole array by default
 * 
 * @param {array} array: the array to sort
 * @param {boolean} order: true is decending false is ascending
 * @param {int} length: the length of the new array, default to array length
 * @return {array} Return new sorted array 
 */
export function sortByDate(array, order = true, length = array.length) {
  if (order) {
    return array.slice(0, length).sort((a, b) => b.meta.date - a.meta.date);
  } else {
    return array.slice(0, length).sort((a, b) => a.meta.date - b.meta.date);
  }
}

/**
 * Sort the given array by name
 * Return whole array by default
 * 
 * @param {array} array: the array to sort
 * @param {boolean} order: true is decending false is ascending
 * @param {int} length: the length of the new array, default to array length
 * @return {array} Return new sorted array 
 */
export function sortByName(array, order = true, length = array.length) {
  if (order) {
    return array.slice(0, length).sort((a, b) => a.meta.name.localeCompare(b.meta.name));
  } else {
    return array.slice(0, length).sort((a, b) => b.meta.name.localeCompare(a.meta.name));
  }
}
