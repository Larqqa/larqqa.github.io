import React, { useState } from 'react';
import { sortByDate, sortByName } from '../helpers/sorts';

/**
 * Select sorting of post lists
 * 
 * @param {array} posts: array of posts
 * @param {function} setPosts: function of useState to set posts
 * @return {elements} Selection elements
 */
function SelectSorting({ posts, setPosts }) {
  const [ sorting, setSorting ] = useState('date');
  const [ order, setOrder ] = useState(true);

  // Sort by post names
  function sortNames() {
    if (sorting !== 'name') {
      setSorting('name');
      setPosts([ ...sortByName(posts, order) ]);
    } else {
      setPosts([ ...sortByName(posts, order) ]);
    }
  }

  // Sort by post dates
  function sortDates() {
    if (sorting !== 'date') {
      setSorting('date');
      setPosts([ ...sortByDate(posts, order) ]);
    } else {
      setPosts([ ...sortByDate(posts, order) ]);
    }
  }

  function switchOrder() {
    setOrder(!order);

    // Switch order based on the last sorting type
    if (sorting === 'date') {
      setPosts([ ...sortByDate(posts, !order) ]);
    } else {
      setPosts([ ...sortByName(posts, !order) ]);
    }
  }


  return (
    <div>
      <button onClick={sortNames}>Sort by Name</button>
      <button onClick={sortDates}>Sort by date</button>
      <button onClick={switchOrder}>Order: {order ? 'descending' : 'ascending'}</button>
    </div>
  );
}

export default SelectSorting;
