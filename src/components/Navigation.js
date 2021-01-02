import React, { useRef } from 'react';
import { Link } from 'gatsby';
import { useStaticQuery, graphql } from 'gatsby';
import ThemeContext from '../context/ThemeContext';
import '../styles/components/navigation.scss';
import '../styles/partials/theme-toggler.scss';
import '../styles/partials/hamburger.scss';

function Hamburger ({ nav }) {
  const burgerEl = useRef(null);

  function toggleNav () {
    nav.current.classList.toggle('active');
    burgerEl.current.classList.toggle('active');
  }

  return (
    <button id="hamburger" onClick={toggleNav} ref={burgerEl}>
      <div id="top-wrap">
        <span id="top-bun">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <span id="cheese">
          <span></span>
        </span>
        <span id="patty"></span>
      </div>
      <span id="lettuce">
        <span></span>
        <span></span>
        <span></span>
      </span>
      <span id="bottom-bun"></span>
    </button>
  );
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