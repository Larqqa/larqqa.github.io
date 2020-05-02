import { blogPromise } from '../fetch.js';

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOG':
    return action.data;
  default:
    return state;
  }
};

export const initBlogs = () => {
  return async dispatch => {
    try {

      const blogs = await blogPromise;

      // Initialize app
      dispatch({
        type: 'INIT_BLOG',
        data: blogs,
      });
    } catch (er) {
      console.log(er);
    }
  };
};


export default reducer;
