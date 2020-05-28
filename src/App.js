import React, { useEffect }from 'react';
import { connect } from 'react-redux';
import { initPages } from './reducers/pageReducer';
import { initProjects } from './reducers/projectsReducer';
import { initBlogs } from './reducers/blogReducer';
import { initCategories } from './reducers/categoriesReducer';
import Routes, { NavLinks } from './Routes';

function App(props) {

  useEffect(() => {
    props.initPages();
    props.initProjects();
    props.initBlogs();
    props.initCategories();
  }, [ props ]);
     
  return (
    <>
      <header className="app-header">
        <NavLinks />
      </header>
      <Routes />
    </>
  );
}

export default connect(
  null,
  {
    initPages,
    initBlogs,
    initProjects,
    initCategories
  }
)( App );
