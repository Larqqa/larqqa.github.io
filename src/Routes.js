import React from 'react';
import { connect } from 'react-redux';
import { Switch, Redirect, Link, Route } from 'react-router-dom';
import Page from './components/Page';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Home from './components/Home';
import NotFound from './components/NotFound';

// Routes are defined in this array for automated rendering
const routes = [
  {
    name: 'Home',
    path: '/',
    exact: true,
    component: Home,
    link: true
  },
  {
    name: 'Projects',
    path: '/projects',
    exact: true,
    component: Projects,
    link: true
  },
  {
    name: 'Project',
    path: '/projects/:name',
    exact: true,
    component: Projects,
    link: false
  },
  {
    name: 'Blog',
    path: '/Blog',
    exact: true,
    component: Blog,
    link: true
  },
  {
    name: 'Blog post',
    path: '/Blog/:name',
    exact: true,
    component: Blog,
    link: false
  },
  {
    name: 'Page',
    path: '/:name',
    exact: true,
    component: Page,
    link: false
  },
  {
    name: '404 not found',
    path: '/404',
    component: NotFound,
    link: false
  }
];

// Make links for use in navBar
export const NavLinks = connect(
  state => ({
    pages: state.pages
  })
)(({ pages }) => {

  // Check if any pages are marked to be displayed in nav
  // If found, make a page into a Link useable object
  const pagesFilt = pages.filter(p => p.meta.nav === true).map(p => ({
    name: p.meta.name,
    path: `/${p.meta.name}`,
    exact: true,
    component: Page,
    link: true,
    index: p.meta.index
  }));

  // Add found pages to nav array
  if (pagesFilt.length) {
    pagesFilt.map(p => {

      // If has specific index, add link there
      if (p.index) {
        routes.splice(p.index, 0, p);
      } else {
        routes.push(p);
      }
    });
  }
  
  return (
    <nav className="nav nav--primary">
      {routes.map((route, i) =>
        route.link &&
        <Link
          key={i}
          className="nav__item"
          to={route.path}
        >{route.name}</Link>
      )}
    </nav>
  );
});

// Define Routing
const Routes = () => {
  return (
    <Switch>
      {routes.map((route, i) =>
        <Route
          key={i}
          exact={route.exact}
          path={route.path}
          component={route.component}
        />
      )}
      {/*<Redirect to="/404" />*/}
    </Switch>
  );
};

export default Routes;
