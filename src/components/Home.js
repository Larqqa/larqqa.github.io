import React, { useEffect }from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { sortByDate } from '../helpers/sorts';
import Page from './Page';
import Engine from '../particles/engine';

function Home({ blog, projects }) {

  useEffect(() => {

    // TODO: Currently engine keeps running, while changing pages.
    if (!document.getElementById('particleField')) {
      // Engine({
      //   target: 'header'
      // });
    }
  });

  function Posts({ children, array, link }) {
    return(
      <div className={link}>
        {children}
        <ul>
          {array.map((a, i) => {
            return (
              <li key={i}>
                <Link to={`/${link}/${a.meta.name}`}>{a.meta.title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <>
      <header id="header">
        <h1>Home</h1>
      </header>
      <div className="main">
        <Page content="home" />
        <Posts array={projects} link="projects">
          <h1>Projects</h1>
        </Posts>
        <Posts array={blog} link="blog">
          <h1>Blogposts</h1>
        </Posts>
      </div>
    </>
  );
}

export default connect(
  state => {
    return {
      blog: sortByDate(state.blog, 5),
      projects: sortByDate(state.projects, 5)
    };
  }
)( Home );
