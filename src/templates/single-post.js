import React from "react";
import { Link, graphql } from "gatsby";
import '../styles/templates/singlepost.scss';

import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Tags from '../components/tags';

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark;
  const otherPosts = data.morePosts.nodes;
  const siteTitle = data.site.siteMetadata?.title || 'Title';
  const { previous, next, tag } = pageContext;
  const date = post.frontmatter.date;
  const update = post.frontmatter.update;

  console.log(update);
  // console.log(data.morePosts);
  // console.log(tag);

  return (
    <Layout location={location} title={siteTitle} className="single-post">
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <div className="post">
        <article
          className="blog-post"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header>
            <h1 itemProp="headline">{post.frontmatter.title}</h1>
            {date && <p className="date"><b>Posted on:</b> {date}</p>}
            {update && <p className="date update"><b>Updated on:</b> {update}</p>}
          </header>
          <section
            dangerouslySetInnerHTML={{ __html: post.html }}
            itemProp="articleBody"
          />
        </article>

        <hr />

        <footer>
          <Tags tags={tag} />

          <div className="related-posts">
            <h3>Similar posts</h3>
            {otherPosts.length
            ? otherPosts.map((post, i) =>
              <Link key={i} to={post.fields.slug}>{post.frontmatter.title}</Link>)
            : <p>No related posts</p>
            }
          </div>
        </footer>
        <hr />

        <nav className="blog-post-nav">
          <ul>
            <li>
              {previous && (
                <>
                  <span>Previous post: </span>
                  <Link to={previous.fields.slug} rel="prev">
                    {previous.frontmatter.title}
                  </Link>
                </>
              )}
            </li>
            <li>
              {next && (
                <>
                  <span>Next post: </span>
                  <Link to={next.fields.slug} rel="next">
                    {next.frontmatter.title}
                  </Link>
                </>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $tag: [String]) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        update(formatString: "MMMM DD, YYYY")
        description
      }
    }
    morePosts: allMarkdownRemark(
      filter: {
        frontmatter: { tags: { in: $tag } },
        fields: { slug: { ne: $slug } }
      }
      limit: 5
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
        }
      }
    }
  }
`
