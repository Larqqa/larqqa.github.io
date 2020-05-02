import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import aboutReducer from './reducers/aboutReducer';
import blogReducer  from './reducers/blogReducer';
import projectsReducer  from './reducers/projectsReducer';
import App from './App';

const reducer = combineReducers({
  about: aboutReducer,
  projects: projectsReducer,
  blog: blogReducer
});

const store = () => {
  return createStore(reducer, applyMiddleware(thunk));
};

ReactDOM.render(
  <Provider store={ store() }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

