/**
 * Redux connect functions
 */

import { sortByCategory } from '../helpers/sorts';
import { sanitizeInt, getCategories } from '../helpers/misc';

/**
 * Pagination function to get stuffs
 * 
 * @param 
 * @return 
 */
export function connectPagination(state, props, all = []) {

  // Get categories from url or posts
  const params = props.match.params.options;
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
