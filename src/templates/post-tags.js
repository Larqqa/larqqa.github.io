import React from 'react'
import { Link, graphql } from 'gatsby'
import '../styles/templates/taglist.scss';
import '../styles/templates/postlist.scss';

import Layout from "../components/layout"
import SEO from "../components/seo"
import Posts from '../components/Posts';
import Pagination from '../components/Pagination';

const TagList = ({ data, pageContext, location }) => {
  const siteTitle = data.site.siteMetadata?.title || 'Title';
  const { currentPage, numPages, tag } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? `/tags/${tag}` : `/tags/${tag}/${currentPage - 1}`;
  const nextPage = `/tags/${tag}/${currentPage + 1}`;
  const posts = data.allMarkdownRemark.nodes;

  return (
    <Layout location={location} title={siteTitle} className={`post-list ${tag}`}>
      <SEO title={tag}/>
      <h1>{tag}</h1>
      <Link to="/blog" itemProp="url">Back to all posts</Link>

      <Posts postData={posts} />
      <Pagination
        isFirst={isFirst}
        isLast={isLast}
        prevPage={prevPage}
        nextPage={nextPage}
        numPages={numPages}
        currentPage={currentPage}
        link={`/tags/${tag}/`}
      />

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