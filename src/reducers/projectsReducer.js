import { projectsPromise } from '../helpers/fetch.js';
import parser from '../helpers/parser';

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_PROJECTS':
    return action.data;
  default:
    return state;
  }
};

export const initProjects = () => {
  return async dispatch => {
    try {
      const projects = parser(await projectsPromise);

      // Initialize app
      dispatch({
        type: 'INIT_PROJECTS',
        data: projects,
      });
    } catch (er) {
      console.log(er);
    }
  };
};


export default reducer;
