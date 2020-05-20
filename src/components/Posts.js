import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLanguage } from '../helpers/misc';
import { sortByDate, sortByName } from '../helpers/sorts';

function Posts({ children, blog, link }) {
  const [ sorting, setSorting ] = useState('date');
  const [ order, setOrder ] = useState(true);
  const [ sortedPosts, setSortedPosts ] = useState([]);

  useEffect(() => {
    setSortedPosts(sortByDate(blog, order));
  }, [ blog ]);

  function sortNames() {
    if (sorting !== 'name') {
      setSorting('name');
      setSortedPosts(sortByName(blog, true));
      setOrder(true);
    } else {
      setSortedPosts(sortByName(blog, !order));
      setOrder(!order);
    }
  }

  function sortDates() {
    if (sorting !== 'date') {
      setSorting('date');
      setSortedPosts(sortByDate(blog, true));
      setOrder(true);
    } else {
      setSortedPosts(sortByDate(blog, !order));
      setOrder(!order);
    }
  }
  
  return(
    <div className={link}>
      {children}
      <button onClick={sortNames}>Sort by Name</button>
      <button onClick={sortDates}>Sort by date</button>
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
        children: (<h1>Blog posts</h1>)
      };
    } else return {};
  }
)( Posts );
