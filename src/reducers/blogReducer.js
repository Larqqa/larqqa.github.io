import { blogPromise } from '../helpers/fetch.js';
import parser from '../helpers/parser';

/**
 * Reducer for handling blog actions
 */
const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOG':
    return action.data;
  default:
    return state;
  }
};

/**
 * Handler for initializing the blog
 */
export const initBlogs = () => {
  return async dispatch => {
    try {
      const blog = parser(await blogPromise);

      // Initialize app
      dispatch({
        type: 'INIT_BLOG',
        data: blog,
      });
    } catch (er) {
      console.log(er);
    }
  };
};

export default reducer;
