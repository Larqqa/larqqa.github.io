import React from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

function Page({ page }) {
  return (<ReactMarkdown source={page && page.content} />);
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
      page: page[0] ? page[0] : []
    };
  }
)( Page );
