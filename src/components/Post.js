import React from 'react';
import { connect } from 'react-redux';

function Post({ post }) {
  if (!post) return null;
  
  return (
    <h1>{post.meta.title}</h1>
  );
}


export default connect(
  
  // Get page content from prop of URL
  (state, props) => {
    let post = state.blog.filter(b => b.meta.name === props.match.params.name);

    return {
      post: post[0] ? post[0] : false
    };
  }
)( Post );
