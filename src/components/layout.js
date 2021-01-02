import React, { useEffect } from 'react';
import Header from './header';
import Footer from './footer';
import ThemeContext from '../context/ThemeContext';
import '../styles/dark.scss';

const Layout = ({ location, title, children, className }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  useEffect(() => {
    const loader = document.getElementById('___loader');
    if (!loader) return;

    loader.classList.add('hide');
    const step = () => {
      if (window.getComputedStyle(loader).opacity === '0') {
        loader.remove();
      } else {
        window.requestAnimationFrame(step);
      }
    };

    step();
  }, []);

  return (
    <ThemeContext.Consumer>
      {theme => (
        <>
          <div className={`global-wrapper ${theme.dark && 'dark'}`} data-is-root-path={isRootPath}>
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
