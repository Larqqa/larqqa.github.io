import React, { useRef } from 'react';
import { Link } from 'gatsby';
import { useStaticQuery, graphql } from 'gatsby';
import '../styles/components/navigation.scss';

function Hamburger ({ nav }) {
  function toggleNav () {
    nav.current.classList.toggle('active');
  }

  return <button id="hamburger" onClick={toggleNav}></button>;
}

const Navigation = () => {
  const navEl = useRef(null);

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
      <Hamburger nav={navEl} />
      <nav id="top-nav" className="nav nav--top" ref={navEl}>
        {site.siteMetadata.menuLinks.map(link =>
          <Link key={link.name} to={link.link} activeClassName="active">
            {link.name}
          </Link>
        )}
      </nav>
    </>
  );
};

export default Navigation;