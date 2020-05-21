import React from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { Link, Redirect } from 'react-router-dom';
import { getLanguage } from '../helpers/misc';


function Post({ url, post, next, previous }) {
  if (!post) return null;
  
  return (
    <article>
      <header>
        {post.meta.image && <img alt="" src={post.meta.image} />}
        <h1>{post.meta.title}</h1>
        <p>{post.meta.date.toLocaleDateString(getLanguage())}</p>
      </header>
      <div>
        <ReactMarkdown source={post.content} />
      </div>
      <div>
        {previous &&
         <Link to={`/${url}/${previous.meta.name}`}>
           Previous: {previous.meta.title}
         </Link>}

        {next &&
         <Link to={`/${url}/${next.meta.name}`}>
           Next: {next.meta.title}
         </Link>}
      </div>
    </article>
  );
}


export default connect(
  
  // Get page content from prop of URL
  (state, props) => {
    const url = props.match.url.match('/(.*)/')[1];
    const posts = state[url];
    const post = posts.filter(b => b.meta.name === props.match.params.name)[0];

    let next;
    let previous;
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].meta.name === post.meta.name) {
        next = posts[i + 1];
        previous = posts[i - 1];
        break;
      }
    }

    return {
      url: url,
      post: post,
      next: next,
      previous: previous
    };
  }
)( Post );
