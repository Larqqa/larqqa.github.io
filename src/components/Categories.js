import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLanguage, getCategories } from '../helpers/misc';
import { sortByDate, sortByName, sortByCategory } from '../helpers/sorts';

function Categories({ categories, posts }) {
  const [ sorting, setSorting ] = useState('date');
  const [ order, setOrder ] = useState(true);
  const [ sorted, setSorted ] = useState([]);
  const [ selected, setSelected ] = useState([]);

  useEffect(() => {
    if (categories) {
      setSorted(sortByDate(sortByCategory(posts, categories)));
    } else {
      setSorted(sortByDate(posts));
    }
  }, [ posts, categories ]);

  /**
   * Toggle checkboxes and sort posts
   * 
   * @param {object} e: event object
   * @return {void}
   */
  function sortBySelected(e) {
    const value = e.target.value;
    let arr = [];

    // Toggle checkbox states based on value
    if (selected.includes(value)) {
      selected.splice(selected.indexOf(value), 1);
      arr = [ ...selected ];
      setSelected(arr);
    } else {
      arr = [ ...selected, value ];
      setSelected(arr);
    }

    // If categories selected, sort by categories
    if (arr.length) {
      setSorted(sortByCategory(posts, arr));
    } else {

      // Else use the posts
      setSorted(posts);
    }
  }

  function sortNames() {
    if (sorting !== 'name') {
      setSorting('name');
      setSorted(sortByName(sorted, true));
      setOrder(true);
    } else {
      setSorted(sortByName(sorted, !order));
      setOrder(!order);
    }
  }

  function sortDates() {
    if (sorting !== 'date') {
      setSorting('date');
      setSorted(sortByDate(sorted, true));
      setOrder(true);
    } else {
      setSorted(sortByDate(sorted, !order));
      setOrder(!order);
    }
  }

  return (
    <div>
      {categories && categories.map((c, i) => {
        return (
          <span key={i}>
            <input
              type="checkbox"
              id={`cat-${c}`}
              value={c}
              key={'input'+i}
              checked={selected.includes(c)}
              onChange={sortBySelected}
            />
            <label
              htmlFor={`cat-${c}`}
              key={'label'+i}
            >{c}</label>
          </span>);
      })}

      <button onClick={sortNames}>Sort by Name {order ? '↑' : '↓'}</button>
      <button onClick={sortDates}>Sort by date {order ? '↑' : '↓'}</button>

      <hr/>
      {sorted.map((s, i) => {
        return (
          <div key={i}>
            <Link key={'name'+i} to="#">{s.meta.title}</Link>
            <p key={'date'+i}>{s.meta.date.toLocaleDateString(getLanguage())}</p>
            {s.meta.excerpt && <p key={'excerpt'+i}>{s.meta.excerpt}</p>}
          </div>
        );
      })}
    </div>
  );
}

export default connect(
  (state, props) => {

    // Get all posts
    let all = [ ...state.blog, ...state.projects, ...state.pages ];

    // Get categories from url or posts
    const params = props.match.params.categories;
    let categories = false;

    // If params, only use params
    if (params){
      all = sortByCategory(all, params.split('+'));
    } else {
      categories = getCategories(all);

      // Also add a nothing category if using all categories
      categories.push('none');
    }

    
    return {
      categories: categories,
      posts: all
    };
  }
)( Categories );
