/**
 * Sort the given array by date
 * 
 * @param {array} array: array of post objects
 * @param {boolean} order: true is decending false is ascending
 * @param {int} length: the length of the new array, default to array length
 * @return {array} Return new sorted array 
 */
export function sortByDate(array, order = true, length = array.length) {

  // Make posts alphabetical first
  array = sortByName(array);

  if (order) {
    return array.slice(0, length).sort((a, b) => b.meta.date - a.meta.date);
  } else {
    return array.slice(0, length).sort((a, b) => a.meta.date - b.meta.date);
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
export function sortByName(array, order = true, length = array.length) {
  if (order) {
    return array.slice(0, length).sort((a, b) => a.meta.title.localeCompare(b.meta.title));
  } else {
    return array.slice(0, length).sort((a, b) => b.meta.title.localeCompare(a.meta.title));
  }
}

/**
 * Sort the given array by categories
 * 
 * @param {array} array: array of post objects
 * @param {array} categories: array of categories
 * @return {array} sorted array
 */
export function sortByCategory(array, categories = []) {
  return array.filter(a => {
    if (!a.meta.categories) {
      if (categories.includes('none')) return true;
      return false;
    } else if (a.meta.categories.some(c => categories.includes(c))) return true;
    return false;
  });
}

