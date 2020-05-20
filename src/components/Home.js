import React, { useEffect }from 'react';
import { connect } from 'react-redux';
import Posts from './Posts';
import Page from './Page';
import Projects from './Projects';
import { sortByDate } from '../helpers/sorts';
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

  return (
    <>
      <header id="header">
      </header>
      <div className="main">
        <Page content="home" />
        <Projects projects={projects} link="projects">
          <h2>Recent projects</h2>
        </Projects>
        <Posts blog={blog} link="blog">
          <h2>Recent posts</h2>
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
