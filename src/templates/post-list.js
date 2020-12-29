import React from 'react';
import { graphql } from 'gatsby';
import '../styles/templates/postlist.scss';

import Layout from "../components/layout";
import SEO from "../components/seo";
import Posts from '../components/Posts';
import Tags from '../components/tags';
import Pagination from '../components/Pagination';

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
    <Layout location={location} title={siteTitle} className="post-list">
      <SEO title="Blog" />
      <h1>Posts</h1>

      <Tags tags={tags} />
      <Posts postData={posts} />
      <Pagination
        isFirst={isFirst}
        isLast={isLast}
        prevPage={prevPage}
        nextPage={nextPage}
        numPages={numPages}
        currentPage={currentPage}
        link="/blog/"
      />

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