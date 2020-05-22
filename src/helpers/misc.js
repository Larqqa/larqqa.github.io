/**
 * Miscellianous helper functions
 */

/**
 * Get the locale string from the browser
 * 
 * @return {string} Locale string 
 */
export function getLanguage() {
  if (navigator.languages !== undefined) {
    return navigator.languages[0];
  } else if (navigator.language) {
    return navigator.language;
  } else {
    return 'fi-FI';
  }
}

/**
 * Get all categories from all posts in array
 * 
 * @param {array} cats: categories of posts
 * @return {array} Array of categories
 */
export function getCategories(array) {
  let categories = [];

  // Filter out empty lists
  array = array.filter(a => a.meta.categories);

  // Add each non duplicate to list
  for (let a of array) {
    for (let cat of a.meta.categories) {
      if (!categories.includes(cat)) {
        categories.push(cat);
      }
    }
  }

  return categories;
}
