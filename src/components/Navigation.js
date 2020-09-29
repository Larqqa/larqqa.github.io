import React from 'react';
import { Link } from 'gatsby';
import { useStaticQuery, graphql } from 'gatsby';

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
    <nav>
      {site.siteMetadata.menuLinks.map(
        link => <Link to={link.link}>{link.name}</Link>
      )}
    </nav>
  );
};

export default Navigation;