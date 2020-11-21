import React from 'react';
import { graphql } from 'gatsby';
import '../styles/pages/about.scss';

import Layout from '../components/layout';
import SEO from '../components/seo';

const About = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="About" />
      <h2>I am Larqqa, harbinger of code, maker of commits.</h2>
      <p>I am enthusiastic about the web, and eager to learn more about it. I want to find out how it all works and i invite you all along on my journey to do so.</p>
      <p>On this blogfolio, you can find different kinds of blog posts about tech things i found interesting, hard to find, or helpful that i decided to share with the community. You can also find some of my projects that i am eager to share with everyone who visits my website.</p>
      <p>I live in southern Finland, where the average length of day during summer is 19 hours, and in winter is about 6 hours. Weather is usually cloudy or rainy and chilly, but sometimes we see this weird light anomaly some call "the sun". summers are actually pretty nice and the long days allow good time for staying outside late. We Finns like to talk about weather so i felt obliged to add a chapter about it here.</p>
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
