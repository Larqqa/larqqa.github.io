import { aboutPromise } from '../fetch.js';

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_ABOUT':
    return action.data;
  default:
    return state;
  }
};

export const initAbout = () => {
  return async dispatch => {
    try {

      const abouts = await aboutPromise;

      // Initialize app
      dispatch({
        type: 'INIT_ABOUT',
        data: abouts,
      });
    } catch (er) {
      console.log(er);
    }
  };
};


export default reducer;
