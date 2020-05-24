import { pagesPromise } from '../helpers/fetch';
import parser from '../helpers/parser';

/**
 * Reducer for handling page actions
 */
const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_PAGES':
    return action.data;
  default:
    return state;
  }
};

/**
 * Handler for initializing the pages
 */
export const initPages = () => {
  return async dispatch => {
    try {
      const pages = parser(await pagesPromise, '');
     
      // Initialize app
      dispatch({
        type: 'INIT_PAGES',
        data: pages,
      });
    } catch (er) {
      console.log(er);
    }
  };
};

export default reducer;
