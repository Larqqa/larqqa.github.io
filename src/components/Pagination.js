import React from 'react';
import { Link } from 'gatsby';
import '../styles/components/pagination.scss';

function Pagination ({ isFirst, isLast, prevPage, nextPage, numPages, currentPage, link }) {

  console.log(numPages);
  return (
    <div className="pagination">
      {!isFirst && (
        <Link className="previous" to={prevPage} rel="prev">
          ← Previous Page
        </Link>
      )}
      <div className="num-wrap">
        {Array.from({ length: numPages }, (_, i) => (
          <Link className={(currentPage - 1) === i ? 'active' : ''} key={`pagination-number${i + 1}`} to={`${link}${i === 0 ? '' : i + 1}`}>
            {i + 1}
          </Link>
        ))}
      </div>
      {!isLast && (
        <Link className="next" to={nextPage} rel="next">
          Next Page →
        </Link>
      )}
    </div>
  );
}
export default Pagination;