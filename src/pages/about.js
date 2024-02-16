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
      <p>I am enthusiastic about software development and eager to learn more about it. On this blogfolio, you can find some blog posts about things I have found interesting, hard to find, or generally helpful, that I want to share with the community. You can also find some of my <a href="https://github.com/Larqqa" target="_blank" rel="noopener noreferrer">projects</a> that I am eager to share.</p>
      <p>I currently work as a software developer at <a href="https://www.solita.fi/" target="_blank">Solita</a>. I'm working within a team supporting a Optimizely CMS based stack of websites where we use .NET and Vue.</p>

      <h3>A little about me</h3>
      <p>I live in <a href="https://en.wikipedia.org/wiki/Southern_Finland_Province" target="_blank" rel="noopener noreferrer">southern Finland</a>, where the average length of day during summer is about 19 hours and in winter about 6 hours. The average temperatures range from 30C in summer to -30C in winter.</p>
      <p>I have been interested in programming since 2015, when I studied at the Lahti University Of Applied Sciences. During my studies, I was introduced to C# and PHP. I did my internship working with Wordpress websites and fell in love with web development. I started pursuing a career in web development in 2019. <a href="https://fullstackopen.com/" target="_blank" rel="noopener noreferrer">Full Stack Open 2019</a> was the true starting point for my career and it has been a great catalyst and introduction to fullstack development. I have since worked at two companies. My first job was with maintaining Wordpress websites. I've since moved on to become a software consultant. I especially like working with the front end side of web development, as I like making visually interesting, functional and appealing websites. I am constantly learning more about back end development and working on expanding my programming language catalogue as a whole.</p>
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
