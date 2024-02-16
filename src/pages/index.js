import React from 'react';
import { Link, graphql } from 'gatsby';
import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Posts from '../components/Posts';
import '../styles/pages/index.scss';

const BlogIndex = ({ data, location }) => {

  const siteTitle = data.site.siteMetadata?.title || 'Title';
  const blog = data.blog.nodes;
  const projects = data.projects.nodes;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" />
      <Bio />
      <div className="posts">

        <div className="post-list blog">
          <h2 className="heading"><Link to="/blog">Blog</Link></h2>
          <Posts postData={blog} />
        </div>

        <div className="post-list projects">
          <h2 className="heading"><Link to="/tags/projects">Projects</Link></h2>
          <Posts postData={projects} />
        </div>

      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
query {
  site {
    siteMetadata {
      title
    }
  }
  blog: allMarkdownRemark(
    limit: 3
    filter: {isFuture: {eq: false}, frontmatter: {tags: {nin: ["Projects"]}}}
    sort: {frontmatter: {date: DESC}}
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
  projects: allMarkdownRemark(
    limit: 3
    filter: {frontmatter: {tags: {in: ["Projects"]}}}
    sort: {frontmatter: {date: DESC}}
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
`
