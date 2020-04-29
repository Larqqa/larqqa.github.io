import React, { useState, useEffect }from 'react';
import ReactMarkdown from 'react-markdown';
import { aboutPromise, projectsPromise, blogPromise } from './fetch';

const App = () => {
  const [ about, setAbout ] = useState([]);
  const [ projects, setProjects ] = useState([]);
  const [ blog, setBlog ] = useState([]);

  // Initialize the markdown data
  useEffect(() => {
    if (about.length === 0) getText(aboutPromise, setAbout);
    if (projects.length === 0) getText(projectsPromise, setProjects);
    if (blog.length === 0) getText(blogPromise, setBlog);
  }, []);

  // Fetch the text from promise
  const getText = async (path, callback) => {
    const posts = await path;
    callback( posts );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Kek</h1>
      </header>
      {about.map(m => (
        <ReactMarkdown source={m}/>
      ))}
      {projects.map(m => (
        <ReactMarkdown source={m}/>
      ))}
      {blog.map(m => (
        <ReactMarkdown source={m}/>
      ))}
    </div>
  );
};

export default App;
