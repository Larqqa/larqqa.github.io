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
  }, [ posts, pageNumber, amount ]);

  /**
   * Change the pagination page
   * 
   * @param {int} direction: the direction to change the page 
   * @return {void}
   */
  function changePage(direction) {
    let num = pageNumber + direction;
    setPageNumber(num <= 0 ? 1 : num > maxPage ? maxPage : num);
  }

  /**
   * Add pagination navigation for navigating pagination pages
   * 
   * @return {void} 
   */
  function PaginationNav() {
    if (maxPage <= 1) return null; // If only one page, dont show pagination nav
    return (
      <>
        {pageNumber > 1 && <button onClick={()=>setPageNumber(1)}>First</button>}
        {pageNumber > 1 && <button onClick={()=>changePage(-1)}>PREV</button>}
        {pageNumber - 2 > 0 && <button onClick={()=>setPageNumber(pageNumber - 2)}>{pageNumber - 2}</button>}
        {pageNumber - 1 > 0 && <button onClick={()=>setPageNumber(pageNumber - 1)}>{pageNumber - 1}</button>}
        <p>{pageNumber}</p>
        {pageNumber + 1 <= maxPage && <button onClick={()=>setPageNumber(pageNumber + 1)}>{pageNumber + 1}</button>}
        {pageNumber + 2 <= maxPage && <button onClick={()=>setPageNumber(pageNumber + 2)}>{pageNumber + 2}</button>}
        {pageNumber < maxPage && <button onClick={()=>changePage(1)}>NEXT</button>}
        {pageNumber < maxPage && <button onClick={()=>setPageNumber(maxPage)}>Last</button>}
      </>
    );
  }

  return (
    <>
      {paginatedPosts.map((s, i) => {
        const url = s.meta.baseURL ? `/${s.meta.baseURL}/${s.meta.name}` : `/${s.meta.name}`;
        return (
          <div key={i}>
            {s.meta.thumbnail && <img src={s.meta.thumbnail}/>}
            <Link key={'name'+i} to={url}>{s.meta.title}</Link>
            <p key={'date'+i}>{s.meta.date.toLocaleDateString(getLanguage())}</p>
            {s.meta.excerpt && <p key={'excerpt'+i}>{s.meta.excerpt}</p>}
          </div>
        );
      })}
      <PaginationNav />
    </>
  );
}

export default Pagination;
