import React, { useEffect }from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Page from './Page';
import { sortByDate, sliceArray } from '../helpers/sorts';
import { getLanguage } from '../helpers/misc';
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

  function Posts({ posts, postsClass, children }) {
    return(
      <div className={postsClass}>
        {children}
        {posts.map((p, i) => {
          return (
            <div key={i}>
              {p.meta.thumbnail && <img src={p.meta.thumbnail}/>}
              <Link key={'name'+i} to={`/project/${p.meta.name}`}>{p.meta.title}</Link>
              <p key={'date'+i}>{p.meta.date.toLocaleDateString(getLanguage())}</p>
              {p.meta.excerpt && <p key={'excerpt'+i}>{p.meta.excerpt}</p>}
            </div>
          );
        })}
      </div>
    );
  }


  return (
    <>
      <header id="header">
      </header>
      <div className="main">
        <Page content="home" />
        <Posts posts={projects} postsClass="yeet">
          <h2>Recent projects</h2>
        </Posts>
        <Posts posts={blog} postsClass="yeet">
          <h2>Recent blog posts</h2>
        </Posts>
      </div>
    </>
  );
}

export default connect(
  state => {
    const limit = 3;
    return {
      blog: sliceArray(sortByDate(state.blog), 0, limit),
      projects: sliceArray(sortByDate(state.projects), 0, limit)
    };
  }
)( Home );
