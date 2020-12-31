import React, { useState } from 'react';
import Header from './header';
import Footer from './footer';
import '../styles/dark.scss';

const Layout = ({ location, title, children, className }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;
  const [ theme, setTheme ] = useState(false);

  const toggleTheme = () => {
    setTheme(!theme);
  };

  return (
    <>
      <div className={`global-wrapper ${theme && 'dark'}`} data-is-root-path={isRootPath}>
        <button onClick={()=>toggleTheme()}>
          {theme
            ? '☀️'
            : '🌔'
          }
        </button>
        <Header title={title} isRootPath={isRootPath} />
        <main className={className}>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
