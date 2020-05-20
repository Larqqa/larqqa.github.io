import React, { useEffect }from 'react';
import { connect } from 'react-redux';
import { initPages } from './reducers/pageReducer';
import { initProjects } from './reducers/projectsReducer';
import { initBlogs } from './reducers/blogReducer';
import Routes, { NavLinks } from './Routes';

function App(props) {

  useEffect(() => {
    const init = async () => {
      await props.initPages();
      await props.initProjects();
      await props.initBlogs();
    };

    init();
  }, [ props ]);
     

  return (
    <>
      <header className="App-header">
        <NavLinks />
      </header>
      <Routes />
    </>
  );
};

export default connect(
  null,
  {
    initPages,
    initBlogs,
    initProjects
  }
)( App );
