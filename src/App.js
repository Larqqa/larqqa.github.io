import React, { useState, useEffect }from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { initAbout } from './reducers/aboutReducer';
import { initProjects } from './reducers/projectsReducer';
import { initBlogs } from './reducers/blogReducer';

const App = (props) => {
  const [ about, setAbout ] = useState([]);
  const [ projects, setProjects ] = useState([]);
  const [ blog, setBlog ] = useState([]);

  useEffect(() => {
    props.initAbout();
    props.initProjects();
    props.initBlogs();

    if (props.about) setAbout([ ...props.about ]);
    if (props.projects) setProjects([ ...props.projects ]);
    if (props.blog) setBlog([ ...props.blog ]);
  }, [ props ]);
     

  return (
    <div className="App">
      <header className="App-header">
        <h1>Kek</h1>
      </header>
      {about.map(m => <ReactMarkdown source={m} />)}
      {projects.map(m => <ReactMarkdown source={m} />)}
      {blog.map(m => <ReactMarkdown source={m} />)}
    </div>
  );
};

export default connect(
  (state) => state,
  {
    initAbout,
    initBlogs,
    initProjects
  }
)( App );
