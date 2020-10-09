import React from 'react'
import { Link, graphql } from 'gatsby'
import '../styles/templates/taglist.scss';

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const TagList = ({ data, pageContext, location }) => {
  const siteTitle = data.site.siteMetadata?.title || 'Title';
  const { currentPage, numPages, tag } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? `/tags/${tag}` : `/tags/${tag}/${currentPage - 1}`;
  const nextPage = `/tags/${tag}/${currentPage + 1}`;
  const posts = data.allMarkdownRemark.nodes;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <h1>{tag}</h1>
      <Link to="/blog" itemProp="url">
        <span itemProp="headline">Back to all posts</span>
      </Link>
      {posts.map(post => {
        const title = post.frontmatter.title || post.fields.slug
        return (
          <article
            key={post.fields.slug}
            className="post-list-item"
            itemScope
            itemType="http://schema.org/Article"
          >
            <header>
              <h2>
                <Link to={post.fields.slug} itemProp="url">
                  <span itemProp="headline">{title}</span>
                </Link>
              </h2>
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
        )
      })}
      {!isFirst && (
        <Link to={prevPage} rel="prev">
          ← Previous Page
        </Link>
      )}
      {Array.from({ length: numPages }, (_, i) => (
        <Link key={`pagination-number${i + 1}`} to={`/tags/${tag}/${i === 0 ? "" : i + 1}`}>
          {i + 1}
        </Link>
      ))}
      {!isLast && (
        <Link to={nextPage} rel="next">
          Next Page →
        </Link>
      )}
    </Layout>
  )
}

export default TagList;

export const pageQuery = graphql`
  query tagPageQuery($skip: Int!, $limit: Int!, $tag: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { tags: { in: [$tag] } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`;