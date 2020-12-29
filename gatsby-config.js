module.exports = {
  siteMetadata: {
    title: 'Larqqa\'s blogfolio',
    author: {
      name: 'Larqqa',
      summary: 'Hello and welcome to my half blog half portfolio. This is a place where i share some of my favourite projects and some thoughts about developer stuff i have found to be helpful or interesting.',
      current: 'Currently employed as a web developer / web admin, working with Wordpress.',
    },
    description: 'valid and great description',

    /*siteUrl: 'https://gatsby-starter-blog-demo.netlify.app/',
    social: {
      twitter: 'kylemathews',
    },*/

    menuLinks:[
      {
        name:'Home',
        link:'/'
      },
      {
        name:'Blog',
        link:'/blog'
      },
      {
        name:'Projects',
        link:'/tags/projects'
      },
      {
        name:'About',
        link:'/about'
      },
      // {
      //   name:'Asteroids',
      //   link:'/Asteroids'
      // },
    ]
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem', // Create File nodes from files
      options: {
        path: `${__dirname}/content/posts`,
        name: 'blog',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/assets`,
        name: 'assets',
      },
    },
    {
      resolve: 'gatsby-transformer-remark', // Markdown parser
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images', // responsive images
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe', // Responsive iframes
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-prismjs', // code block syntax highlighting
          'gatsby-remark-copy-linked-files', // Copies linked images to root
          // 'gatsby-remark-smartypants', // Smart quotes
        ],
      },
    },
    'gatsby-transformer-sharp', // image processing
    'gatsby-plugin-sharp', // image processing
    'gatsby-plugin-feed', // RSS feed
    'gatsby-plugin-sass', // sass processing
    /*{
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Gatsby Starter Blog',
        short_name: 'GatsbyJS',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'content/assets/gatsby-icon.png',
      },
    },*/
    'gatsby-plugin-react-helmet',

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
};