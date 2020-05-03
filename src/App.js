import React, { useEffect }from 'react';
import { connect } from 'react-redux';
import { initPages } from './reducers/pageReducer';
import { initProjects } from './reducers/projectsReducer';
import { initBlogs } from './reducers/blogReducer';
import Page from './components/Page';
import Projects from './components/Projects';
import Blog from './components/Blog';

const App = (props) => {

  useEffect(() => {
    const init = async () => {
      await props.initPages();
      await props.initProjects();
      await props.initBlogs();
    };

    init();
  }, []);
     

  return (
    <div className="App">
      <header className="App-header">
        <h1>Kek</h1>
      </header>
      <Page />
      <Projects />
      <Blog />
    </div>
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
