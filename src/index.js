import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import pageReducer from './reducers/pageReducer';
import blogReducer from './reducers/blogReducer';
import projectsReducer from './reducers/projectsReducer';
import categoriesReducer from './reducers/categoriesReducer';
import App from './App';

const reducer = combineReducers({
  pages: pageReducer,
  projects: projectsReducer,
  blog: blogReducer,
  categories: categoriesReducer
});

ReactDOM.render(
  <Provider store={ createStore(reducer, applyMiddleware(thunk)) }>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

