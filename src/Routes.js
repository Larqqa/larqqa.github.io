import React from 'react';
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
    path: '/projects/:title',
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
    path: '/Blog/:title',
    exact: true,
    component: Blog,
    link: false
  },
  {
    name: 'Page',
    path: '/:title',
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
export const NavLinks = () => {
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
};

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
