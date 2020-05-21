import React from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { Redirect } from 'react-router-dom';

function Page({ page }) {
  if (!page) return null;
  
  return (
    <>
      <header>
        {page.meta.image && <img alt="" src={page.meta.image}></img>}
        <h1>{page.meta.title}</h1>
      </header>
      <ReactMarkdown source={page.content} />
    </>
  );
}

export default connect(
  
  // Get page content from prop of URL
  (state, props) => {
    let page = false;
    
    if (props.content) {
      page = state.pages.filter(p => p.meta.name === props.content);
    } else {
      page = state.pages.filter(p => p.meta.name === props.match.params.name);
    }

    return {
      page: page[0] ? page[0] : false
    };
  }
)( Page );
