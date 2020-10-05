import React from "react";
import { Link, graphql } from "gatsby";
import '../styles/pages/index.scss';

import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || 'Title';
  const blog = data.blog.nodes;
  const projects = data.projects.nodes;

  const Posts = ({ postData, link }) => {
    return (
      <div className={`post-list ${link.name.toLowerCase()}`}>
        <h2 className="heading"><Link to={link.link}>{link.name}</Link></h2>
        {postData.map(post => {
          const title = post.frontmatter.title || post.fields.slug;

          return (
            <article key={post.fields.slug}>
              <header>
                <h2><Link to={post.fields.slug} itemProp="url">{title}</Link></h2>
                <p>{post.frontmatter.date}</p>
              </header>
              <section>
                <p dangerouslySetInnerHTML={{
                    __html: post.frontmatter.description || post.excerpt,
                  }}
                  itemProp="description"
                />
              </section>
            </article>
          );
        })}
      </div>
    );
  };

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      <div className="posts">
        <Posts postData={blog} link={ {name: 'Blog', link: '/blog'} } />
        <Posts postData={projects} link={ {name: 'Projects', link: '/portfolio'} } />
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
      limit: 5
      filter: { fields: { collection: { eq: "blog" } }}
      sort: { fields: [frontmatter___date], order: DESC }
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
      limit: 5
      filter: { fields: { collection: { eq: "portfolio" } }}
      sort: { fields: [frontmatter___date], order: DESC }
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
