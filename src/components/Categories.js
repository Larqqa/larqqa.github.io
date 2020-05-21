import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLanguage } from '../helpers/misc';
import { sortByDate, sortByName } from '../helpers/sorts';

function Categories({}) {
  return (<h1>categories</h1>);
}

export default connect(
  (state, props) => {
    let categories = [];

    /**
     * Add categories, to category list
     * 
     * @param {array} cats: categories of posts
     * @return {void}
     */
    function addToCats(cats) {
      if (!cats) return;
      
      for (var i = 0; i < cats.length; i++) {
        const cat = cats[i];
        if (!categories.find(c => c === cat)) {
          categories.push(cat);
        }
      }
    }

    state.blog.map(b => addToCats(b.meta.categories));
    state.projects.map(p => addToCats(p.meta.categories));
    state.pages.map(p => addToCats(p.meta.categories));

    console.log(categories);

    return {};

  }
)( Categories );
