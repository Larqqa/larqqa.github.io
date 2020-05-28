/**
 * Reducer for handling category actions
 */
const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_CATEGORIES':
    return action.data;
  default:
    return state;
  }
};

/**
 * Handler for initializing the blog
 */
export const initCategories = () => {
  return dispatch => {
    try {
      const categories = [];

      // Initialize app
      dispatch({
        type: 'INIT_CATEGORIES',
        data: categories,
      });
    } catch (er) {
      console.log(er);
    }
  };
};

export default reducer;
