import { sortByCategory } from '../helpers/sorts';

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

/**
 * Sanitize numbers to integer
 * if not number return false
 * 
 * @param {int} number: A number to sanitize
 * @return {int || false} If number return int, else false
 */
export function sanitizeInt(number) {
  return isNaN(number) ? false : parseInt(number);
}

/**
 * Pagination function to use in connect of post lists
 * 
 * @param 
 * @return 
 */
export function connectPagination(state, props, all) {

  // Get categories from url or posts
  const params = props.match.params.categories;
  let categories = [];
  let page = false;
  let amount = false;

  /**
   * Sort URL Parameters to their respective value
   * categories are not marked, and are split with a +
   * Page number is page={int}
   * Amount of posts is amount={int} 
   *
   * @param {array} params: array of parameters
   * @return {object} sorted parameters
   */
  function sortParams(params) {
    const sortedParams = {};

    for (let param of params) {
      const split = param.split('=');

      // Try splits with = to find params
      if (split[0] === 'page' && split[1]) {
        sortedParams.page = sanitizeInt(split[1]);
      } else if (split[0] === 'amount' && split[1]) {
        sortedParams.amount = sanitizeInt(split[1]);

        // Try if params are categories
      } else if (split.length === 1 && split[0]) {
        sortedParams.categories = param.split('+');
      }
    }
    
    return sortedParams;
  }
  
  // If params, only use params
  if (params){
    const sortedParams = sortParams(params.split('&'));
    
    page = sortedParams.page ? sortedParams.page : false;
    amount = sortedParams.amount ? sortedParams.amount : false;

    // If categories in params, sort posts by categories
    if (sortedParams.categories && sortedParams.categories.length) {
      all = sortByCategory(all, sortedParams.categories);

      // If requested page number is higher than possible page number
      // Set page number to maximum possible page number
      const maxPage = Math.ceil(all.length / amount);
      page = page > maxPage ? maxPage : page;
    }

  } else {
    categories = getCategories(all); // Use all posts if no params

    // Add a nothing category, if using all categories
    categories.push('none');
  }
  
  return {
    categories: categories,
    page: page ? page : 1,
    amount: amount ? amount : 5,
    posts: all
  };
}
