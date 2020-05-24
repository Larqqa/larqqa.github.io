import React, { useState, useEffect } from 'react';
import { sliceArray } from '../helpers/sorts';
import { Link } from 'react-router-dom';
import { getLanguage } from '../helpers/misc';

function Pagination({ posts, page, amount }) {
  const [ paginatedPosts, setPaginatedPosts ] = useState([]);
  const [ maxPage, setMaxPage ] = useState(0);
  const [ pageNumber, setPageNumber ] = useState(page);
  
  useEffect(() => {
    setMaxPage(Math.ceil(posts.length / amount));
    setPaginatedPosts(sliceArray(posts, (amount * pageNumber) - amount, amount * pageNumber));
  }, [ posts, pageNumber ]);

  function changePage(direction) {
    let num = pageNumber + direction;
    setPageNumber(num <= 0 ? 1 : num > maxPage ? maxPage : num);
  }

  return (
    <>
      {paginatedPosts.map((s, i) => {
        return (
          <div key={i}>
            <Link key={'name'+i} to="#">{s.meta.title}</Link>
            <p key={'date'+i}>{s.meta.date.toLocaleDateString(getLanguage())}</p>
            {s.meta.excerpt && <p key={'excerpt'+i}>{s.meta.excerpt}</p>}
          </div>
        );
      })}
      <button onClick={()=>changePage(-1)}>PREV</button>
      <p>{pageNumber}/{maxPage}</p>
      <button onClick={()=>changePage(1)}>NEXT</button>
    </>
  );
}

export default Pagination;
