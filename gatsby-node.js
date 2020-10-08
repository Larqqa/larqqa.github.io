const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

function kebabCase(string) {
  var result = string;

  // Convert camelCase capitals to kebab-case.
  result = result.replace(/([a-z][A-Z])/g, function (match) {
    return match.substr(0, 1) + '-' + match.substr(1, 1).toLowerCase();
  });

  // Convert non-camelCase capitals to lowercase.
  result = result.toLowerCase();

  // Convert non-alphanumeric characters to hyphens
  result = result.replace(/[^-a-z0-9]+/g, '-');

  // Remove hyphens from both ends
  result = result.replace(/^-+/, '').replace(/-+$/, '');

  return result;
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Define a template for blog post
  const singlePost = path.resolve('./src/templates/single-post.js');
  const listPosts = path.resolve('./src/templates/post-list.js');
  const tagPosts = path.resolve('./src/templates/post-tags.js');

  // Get all markdown blog posts sorted by date
  const allPosts = await graphql(
    `
      {
        posts: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          nodes {
            fields {
              slug
            }
            frontmatter {
              title
              tags
            }
          }
        },

        tagsGroup: allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
      }
    `
  );

  if (allPosts.errors) {
    reporter.panicOnBuild(
      'There was an error loading your blog posts',
      allPosts.errors
    );
    return;
  }

  // Create single pages for each post
  const blog = allPosts.data.posts.nodes;
  blog.forEach((post, index) => {
    const previous = index === blog.length - 1 ? null : blog[index + 1];
    const next = index === 0 ? null : blog[index - 1];

    createPage({
      path: post.fields.slug,
      component: singlePost,
      context: {
        slug: post.fields.slug,
        previous,
        next,
      },
    });
  });

  const postsPerPage = 2;
  let numPages = Math.ceil(blog.length / postsPerPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? '/blog' : `/blog/${i + 1}`,
      component: listPosts,
      context: {
        type: 'blog',
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1
      },
    });
  });

  const tags = allPosts.data.tagsGroup.group;

  let counts = {};
  blog.forEach(post => {
    post.frontmatter.tags.forEach(tag => {
      if (!counts[tag]) {
        counts[tag] = 1;
      } else {
        counts[tag]++;
      }
    });
  });

  console.log(counts);

  for (const tag in counts){
    const numPages = Math.ceil(counts[tag] / postsPerPage);

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/tags/${tag}` : `/tags/${tag}/${i + 1}`,
        component: tagPosts,
        context: {
          tag: tag,
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1
        },
      });
    });
  }
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' });
    const collection = getNode(node.parent).sourceInstanceName;

    createNodeField({
      node,
      name: 'collection',
      value: collection,
    });

    createNodeField({
      node,
      name: 'slug',
      value: `/${collection}${slug}`,
    });
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `);
};
