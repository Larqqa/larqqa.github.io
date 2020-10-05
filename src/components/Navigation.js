import React from 'react';
import { Link } from 'gatsby';
import { useStaticQuery, graphql } from 'gatsby';
import '../styles/components/navigation.scss';

function toggleNav () {
  const nav = document.getElementById('top-nav');
  nav.classList.toggle('active');
}

function Hamburger () {
  return (
    <button id="hamburger" onClick={toggleNav}></button>
  );
}

const Navigation = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            menuLinks {
              name
              link
            }
          }
        }
      }
    `
  );

  return (
    <>
      <Hamburger />
      <nav id="top-nav">
        {site.siteMetadata.menuLinks.map(link => {
          return (<Link to={link.link} activeClassName="active">{link.name}</Link>);
        }
        )}
      </nav>
    </>
  );
};

export default Navigation;