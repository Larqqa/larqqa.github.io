import { projectsPromise } from '../helpers/fetch.js';
import parser from '../helpers/parser';

/**
 * Reducer for handling project actions
 */
const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_PROJECTS':
    return action.data;
  default:
    return state;
  }
};

/**
 * Handler for initializing the projects
 */
export const initProjects = () => {
  return async dispatch => {
    try {
      const projects = parser(await projectsPromise, 'project');

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
