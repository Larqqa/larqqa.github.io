import React from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { Link, Redirect } from 'react-router-dom';
import { getLanguage } from '../helpers/misc';
import Loader from '../components/Loader';

function Post({ url, post, next, previous }) {
  if (post === 'waiting') return <Loader />;
  if (!post) return (<Redirect to="/404" />);
  
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

    // If Store not initialized, wait
    if (!state.pages.length) {
      return {
        post: 'waiting'
      };
    }
    
    const url = props.match.url.match('/(.*)/')[1];

    let post = {};
    let posts = [];

    function getPost(posts) {
      return posts.filter(b => b.meta.name === props.match.params.name)[0];
    }

    // Get post and state that has this current post
    posts = state.projects;
    post = getPost(posts);

    // If post was not in projects, try blogs
    if (!post) {
      posts = state.blog;
      post = getPost(posts);
    }

    // If still found nothing, return nothing as no post with this name is available
    if (!post) return {};
 
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
