import React from 'react';
import { Link } from 'gatsby';

function Pagination ({ isFirst, isLast, prevPage, nextPage, numPages, currentPage, link }) {

  console.log(numPages);
  return (
    <div className="pagination">
      {!isFirst && (
        <Link to={prevPage} rel="prev">
          ← Previous Page
        </Link>
      )}
      {Array.from({ length: numPages }, (_, i) => (
        <Link className={(currentPage - 1) === i ? 'active' : ''} key={`pagination-number${i + 1}`} to={`${link}${i === 0 ? '' : i + 1}`}>
          {i + 1}
        </Link>
      ))}
      {!isLast && (
        <Link to={nextPage} rel="next">
          Next Page →
        </Link>
      )}
    </div>
  );
}
export default Pagination;