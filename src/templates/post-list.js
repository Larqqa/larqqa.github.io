import React from 'react'
import { Link, graphql } from 'gatsby'
import '../styles/templates/postlist.scss';
import { kebabCase } from '../../helpers';

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogList = ({ data, pageContext, location }) => {
  const siteTitle = data.site.siteMetadata?.title || 'Title';
  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? '/blog' : `/blog/${currentPage - 1}`;
  const nextPage = `/blog/${currentPage + 1}`;
  const posts = data.allMarkdownRemark.nodes;
  const tags = data.tags.group.map(tag => tag.fieldValue);

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <h1>Posts</h1>

      <h2>tags</h2>
      <ul>
      {tags.map((tag, i) => {
        return (
          <li key={i}>
            <Link to={`/tags/${kebabCase(tag)}`} itemProp="url">
              <span itemProp="headline">{tag}</span>
            </Link>
          </li>
        );
      })}
      </ul>

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
        <Link className={(currentPage - 1) === i ? 'active' : ''} key={`pagination-number${i + 1}`} to={`/blog/${i === 0 ? "" : i + 1}`}>
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

export default BlogList;

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { tags: { nin: ["projects"] } } }
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
          tags
        }
      }
    }
    tags: allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
      }
    }
  }
`;