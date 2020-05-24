import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import SelectSorting from '../components/SelectSorting';
import Pagination from '../components/Pagination';
import { connectPagination } from '../helpers/connects';
import { sortByDate } from '../helpers/sorts';

function Posts({ posts, amount, page }) {
  const [ selectedPosts, setSelectedPosts ] = useState([]);
  
  useEffect(() => {
    setSelectedPosts(sortByDate(posts, true));
  }, [ posts ]);
  
  return(
    <div>
      <h1>Blog Posts</h1>
      <SelectSorting posts={selectedPosts} setPosts={setSelectedPosts}/>
      <Pagination posts={selectedPosts} page={page} amount={amount} />
    </div>
  );
}

export default connect(
  (state, props) => {
    return connectPagination(state, props, state.blog);
  }
)( Posts );
