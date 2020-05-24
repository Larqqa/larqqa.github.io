import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import SelectSorting from '../components/SelectSorting';
import Pagination from '../components/Pagination';
import { connectPagination } from '../helpers/connects';
import { sortByDate } from '../helpers/sorts';

function Projects({ posts, amount, page }) {
  const [ selectedProjects, setSelectedProjects ] = useState([]);

  useEffect(() => {
    setSelectedProjects(sortByDate(posts, true));
  }, [ posts ]);
  
  return (
    <div>
      <h1>Projects</h1>
      <SelectSorting posts={selectedProjects} setPosts={setSelectedProjects}/>
      <Pagination posts={selectedProjects} page={page} amount={amount} />
    </div>
  );
}

export default connect(
  (state, props) => {
    return connectPagination(state, props, state.projects);
  }
)( Projects );
