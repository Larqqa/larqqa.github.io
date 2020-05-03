import { aboutPromise } from '../helpers/fetch.js';

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
      const parsed = abouts.map(string => {
        let header = '{' + abouts[1].match( /---\n(.*)\n---/s)[1] + '}';
        header = JSON.parse(header.replace('\n', ','));

        const parsedString = string.replace(/---\n(.*)---\n/s, '');

        console.log(header, parsedString);
        return {
          'meta': header,
          'content': parsedString
        };
      });

      // console.log(parsed);

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
