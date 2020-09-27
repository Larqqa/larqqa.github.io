import React from 'react';
import { Link } from 'gatsby';

const Header = ({ isRootPath, title }) => {
  
  const RootPath = () => {
    if (isRootPath) {
      return (
        <h1 className="main-heading">
          <Link to="/">{title}</Link>
        </h1>
      );
    } else {
      return (
        <Link className="header-link-home" to="/">
          {title}
        </Link>
      );
    }
  };

  return (
    <header className="global-header">
      <RootPath />
    </header>
  );
};

export default Header;