import React, { useRef } from 'react';
import { Link } from 'gatsby';
import { useStaticQuery, graphql } from 'gatsby';
import ThemeContext from '../context/ThemeContext';
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
    <ThemeContext.Consumer>
      {theme => (
        <>
          <Hamburger nav={navEl} />
          <nav id="top-nav" className="nav nav--top" ref={navEl}>
            {site.siteMetadata.menuLinks.map(link =>
              <Link key={link.name} to={link.link} activeClassName="active">
                {link.name}
              </Link>
            )}
            <button className={`theme-toggler ${!theme.dark && 'light'}`} onClick={() => theme.toggleDark()}>
              {theme.dark ? '🌔' : '☀️'}
            </button>
          </nav>
        </>
      )}
    </ThemeContext.Consumer>
  );
};

export default Navigation;