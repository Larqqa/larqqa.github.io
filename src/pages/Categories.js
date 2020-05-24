import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import SelectSorting from '../components/SelectSorting';
import Pagination from '../components/Pagination';
import { connectPagination } from '../helpers/connects';
import { sortByDate, sortByCategory } from '../helpers/sorts';

function Categories({ categories, page, amount, posts }) {
  const [ selectedPosts, setSelectedPosts ] = useState([]);
  const [ selected, setSelected ] = useState([]);

  /**
   * Sort posts by selection
   * If nothing selected default to all posts sorted by date
   * 
   * @return {void}
   */
  function setSelection() {
    if (selected.length) {
      setSelectedPosts(sortByCategory(posts, selected));
    } else {
      setSelectedPosts(sortByDate(posts, true));
    }
  }
  
  useEffect(() => {
    setSelectedPosts(sortByDate(posts, true));
  }, [ posts ]);

  /**
   * Toggle checkboxes and sort posts
   * 
   * @param {object} e: event object
   * @return {void}
   */
  function sortBySelected(e) {
    const value = e.target.value;

    // Toggle checkbox states based on value
    // Selected is an array of selected categories
    if (selected.includes(value)) {
      selected.splice(selected.indexOf(value), 1);
      setSelected(selected);
    } else {
      selected.push(value);
      setSelected(selected);
    }
    setSelection();
  }

  return (
    <div>
      {categories && categories.map((c, i) => {
        return (
          <span key={i}>
            <input type="checkbox" id={`cat-${c}`} value={c} key={'input'+i}
              checked={selected.includes(c)} onChange={sortBySelected}/>

            <label htmlFor={`cat-${c}`} key={'label'+i}>{c}</label>
          </span>);
      })}
      <SelectSorting posts={selectedPosts} setPosts={setSelectedPosts} />
      <hr/>
      <Pagination posts={selectedPosts} page={page} amount={amount} />
    </div>
  );
}

export default connect(
  function(state, props) {
    let all = [ ...state.blog, ...state.projects, ...state.pages ];
    return connectPagination(state, props, all);
  }
)( Categories );
