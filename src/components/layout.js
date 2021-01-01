import React from 'react';
import Header from './header';
import Footer from './footer';
import '../styles/dark.scss';
import ThemeContext from '../context/ThemeContext';

const Layout = ({ location, title, children, className }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  return (
    <ThemeContext.Consumer>
      {theme => (
        <>
          <div className={`global-wrapper ${theme.dark && 'dark'}`} data-is-root-path={isRootPath}>
            <button className={`theme-toggler ${!theme.dark && 'light'}`} onClick={() => theme.toggleDark()}>
              {theme.dark ? '🌔' : '☀️'}
            </button>
            <Header title={title} isRootPath={isRootPath} />
            <main className={className}>{children}</main>
          </div>
          <Footer />
        </>
      )}
    </ThemeContext.Consumer>
  );
};

export default Layout;
