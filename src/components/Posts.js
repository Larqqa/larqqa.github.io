import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SelectSorting from './SelectSorting';
import { getLanguage } from '../helpers/misc';
import { sortByDate } from '../helpers/sorts';

function Posts({ children, blog, link, sortable }) {
  const [ sortedPosts, setSortedPosts ] = useState([]);

  useEffect(() => {
    setSortedPosts(sortByDate(blog));
  }, [ blog ]);
  
  return(
    <div className={link}>
      {children}
      {sortable && <SelectSorting posts={sortedPosts} setPosts={setSortedPosts}/>}
      <ul>
        {sortedPosts.map((post, i) => {
          return (
            <li key={i}>
              <Link to={`/${link}/${post.meta.name}`}>
                {post.meta.title}
              </Link>
              <p>{post.meta.date.toLocaleDateString(getLanguage())}</p>
              {post.meta.excerpt && <p>{post.meta.excerpt}</p>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default connect(
  (state, props) => {
    if (!props.blog) {
      return {
        blog: sortByDate(state.blog),
        link: 'blog',
        children: (<h1>Blog posts</h1>),
        sortable: true
      };
    } else return {};
  }
)( Posts );
