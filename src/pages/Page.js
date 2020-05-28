import React from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { Redirect } from 'react-router-dom';
import Loader from '../components/Loader';

function Page({ page }) {
  if (page === 'waiting') return <Loader />;
  if (!page) return (<Redirect to="/404" />);
  
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

    // If Store not initialized, wait
    if (!state.pages.length) {
      return {
        page: 'waiting'
      };
    }
    
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
