/**
 * Sort the given array by date
 * Return whole array by default
 * 
 * @param {array} array: the array to sort
 * @param {boolean} order: the order of dates, true is decending false is ascending
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
