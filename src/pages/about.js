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
      <h2>I am Larqqa, harbinger of code, maker of commits.</h2>
      <p>I am enthusiastic about the web, and eager to learn more about it. I want to find out how it all works and I invite you all along on my journey to do so.</p>
      <p>On this blogfolio, you can find different kinds of blog posts about tech things I found interesting, hard to find, or helpful that I want to share with the community. You can also find some of my projects that I am eager to share with everyone.</p>
      <h3>A little about me</h3>
      <p>I live in southern Finland, where the average length of day during summer is 19 hours, and in winter is about 6 hours.</p>
      <p>I have been working with code since 2015, when I studied at a University Of Applied Sciences where I was introduced to C# and PHP. I did my internship working with Wordpress websites and fell in love with web development. I like working with the front end side of web development, as I like to make visually interesting and appealing websites. I am learning more about the back end development and working on expanding my programming language catalogue as a whole. <a href="https://fullstackopen.com/" target="_blank" rel="noopener noreferrer">Full Stack Open 2019</a> was the starting place for my career and it has been a great introduction to fullstack development.</p>
      <p>I like problem solving and challenging myself, which are some of my main motivations in programming. Currently, I am most comfortable with JavaScript and PHP. React and Express are my go to tools, and I am currently working as the maintainer and developer of Wordpress websites.</p>
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
