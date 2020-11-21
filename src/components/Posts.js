import React from 'react';
import { Link } from 'gatsby';

function Posts ({ postData }) {
  return (
    postData.map(post => {
      const title = post.frontmatter.title || post.fields.slug;
      return (
        <article
          key={post.fields.slug}
          className="post-list-item"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header>
            <h2><Link to={post.fields.slug} itemProp="url">{title}</Link></h2>
            <small>{post.frontmatter.date}</small>
          </header>
          <section>
            <p
              dangerouslySetInnerHTML={{
                __html: post.frontmatter.description || post.excerpt,
              }}
              itemProp="description"
            />
          </section>
        </article>
      );
    })
  );
}
export default Posts;