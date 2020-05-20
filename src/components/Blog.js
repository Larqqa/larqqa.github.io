import React from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

function Blog({ blog }) {
  return (
    <>
      {blog.map(a => <ReactMarkdown source={a.content}/>)}
    </>
  );
}

export default connect(
  state => {
    return {
      blog: state.blog
    };
  }
)( Blog );
