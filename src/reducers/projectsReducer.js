import { projectsPromise } from '../helpers/fetch.js';

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

      const projects = await projectsPromise;

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
