import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Tags from '../components/tags';
import '../styles/templates/singlepost.scss';

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark;
  const otherPosts = data.morePosts.nodes;
  const siteTitle = data.site.siteMetadata?.title || 'Title';
  const { previous, next, tag } = pageContext;
  const date = post.frontmatter.date;
  const update = post.frontmatter.update;

  const Article = () => {
    return (
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >

        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          {date && <small className="date"><b>Posted on:</b> {date}</small>}
          {update && <small className="date update"><b>Updated on:</b> {update}</small>}
        </header>

        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />

      </article>
    );
  }

  const Footer = () => {
    return(
      <footer>
        <Tags tags={tag} />

        <div className="related-posts">
          <h3>Similar posts:</h3>
          {otherPosts.length
            ? otherPosts.map((post, i) =>
              <Link key={i} to={post.fields.slug}>{post.frontmatter.title}</Link>)
            : <p>No related posts</p>
          }
        </div>

      </footer>
    );
  }

  const PostNav = () => {

    const PostLink = ({link, linkText, rel}) => {
      return (
        link && (
          <li>
            <span>{linkText} </span>
            <Link to={link.fields.slug} rel={rel} >
              {link.frontmatter.title}
            </Link>
          </li>
        )
      );
    }

    return(
      <nav className="blog-post-nav">
        <ul>
          <PostLink link={previous} linkText="Previous post:" rel="prev" />
          <PostLink link={next} linkText="Next post:" rel="next" />
        </ul>
      </nav>
    );
  }

  return (
    <Layout location={location} title={siteTitle} className="single-post">
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <div className="post">
        <Article />
        <hr />
        <Footer />
        <hr />
        <PostNav />
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
