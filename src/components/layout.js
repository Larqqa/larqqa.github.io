import React from 'react';
import Header from './header';
import Footer from './footer';

const Layout = ({ location, title, children, className }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  return (
    <>
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <Header title={title} isRootPath={isRootPath} />
        <main className={className}>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
