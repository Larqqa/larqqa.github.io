import React from 'react';
import { Link } from 'gatsby';
import '../styles/components/pagination.scss';

function Pagination ({ isFirst, isLast, prevPage, nextPage, numPages, currentPage, link }) {
  return (
    <div className="pagination">
      {!isFirst && (
        <Link className="previous" to={prevPage} rel="prev">
          Previous
        </Link>
      )}

      <div className="num-wrap">
        {currentPage > 2 &&
          <Link to={`${link}`}>
            1{currentPage > 3 && '..'}
          </Link>}

        {numPages > 1 && Array.from([ -1, 0, 1 ], i => {
          if (currentPage + i < 1) {
            return;
          } else if (currentPage + i > numPages) {
            return;
          } else {
            return(
              <Link
                className={i === 0 ? 'active' : ''}
                key={`pagination-number${i + 1}`}
                to={`${link}${currentPage + i === 1 ? '' : currentPage + i}`}
              >
                {currentPage + i}
              </Link>
            );
          }
        })}

        {currentPage < numPages - 1 &&
          <Link to={`${link}${numPages}`}>
            {numPages - 1 != currentPage + 1 && '..'}{numPages}
          </Link>}
      </div>

      {!isLast && (
        <Link className="next" to={nextPage} rel="next">
          Next
        </Link>
      )}
    </div>
  );
}
export default Pagination;