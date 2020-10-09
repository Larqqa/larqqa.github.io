import React from "react";
import { Link, graphql } from "gatsby";
import '../styles/templates/singlepost.scss';

import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark;
  const otherPosts = data.morePosts.nodes;
  const siteTitle = data.site.siteMetadata?.title || 'Title';
  const { previous, next, tag } = pageContext;

  console.log(data.morePosts);
  console.log(tag);

  return (
    <Layout location={location} title={siteTitle}>
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
          <ul>
            {tag.map((tag, i) => <li key={i}>{tag}</li>)}
          </ul>
          <p>{post.frontmatter.date}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav className="blog-post-nav">
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
      </div>
      <div className="post-nav">
        <h2>More posts</h2>
        {otherPosts.length
        ? otherPosts.map((post, i) =>
          <Link key={i} to={post.fields.slug}>{post.frontmatter.title}</Link>)
        : <p>No related posts</p>
        }
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
        description
      }
    }
    morePosts: allMarkdownRemark(
      filter: {
        frontmatter: { tags: { in: $tag } },
        fields: { slug: { ne: $slug } }
      }
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
