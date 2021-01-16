import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import '../styles/pages/about.scss';

const About = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="About" />
      <h2>I am Larqqa</h2>
      <p>I am enthusiastic about the software development, and eager to learn more about it. On this blogfolio, you can find different kinds of blog posts about things I have found interesting, hard to find, or generally helpful, that I want to share with the community. You can also find some of my <a href="https://github.com/Larqqa" target="_blank" rel="noopener noreferrer">projects</a> that I am eager to share.</p>
      <h3>A little about me</h3>
      <p>I live in <a href="https://en.wikipedia.org/wiki/Southern_Finland_Province" target="_blank" rel="noopener noreferrer">southern Finland</a>, where the average length of day during summer is 19 hours, and in winter is about 6 hours. The average temperature varies from 30C to -30C.</p>
      <p>I have been interested in programming since 2015, when I studied at a University Of Applied Sciences. During my studies, I was introduced to C# and PHP. I did my internship working with Wordpress websites and fell in love with web development. I started pursuing a career in web development in 2019. <a href="https://fullstackopen.com/" target="_blank" rel="noopener noreferrer">Full Stack Open 2019</a> was the true starting point for my career and it has been a great catalyst and introduction to fullstack development. I especially like working with the front end side of web development, as I like making visually interesting, functional and appealing websites. I am learning more about back end development and working on expanding my programming language catalogue as a whole. </p>
      <p>I like problem solving and challenging myself, which are some of my main motivations in programming. Currently, I'm most comfortable with JavaScript and PHP. React and Express are my go to tools, and I am currently working as the maintainer and developer of Wordpress websites.</p>
    </Layout>
  );
};

export default About;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
