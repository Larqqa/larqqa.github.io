import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Redirect, Link, Route } from 'react-router-dom';
import Page from './components/Page';
import Projects from './components/Projects';
// import Project from './components/Project';
import Posts from './components/Posts';
import Categories from './components/Categories';
import Post from './components/Post';
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
    component: Post,
    link: false
  },
  {
    name: 'Blog',
    path: '/blog',
    exact: true,
    component: Posts,
    link: true
  },
  {
    name: 'Blog post',
    path: '/blog/:name',
    exact: true,
    component: Post,
    link: false
  },
  {
    name: 'Categories',
    path: '/categories',
    exact: true,
    component: Categories,
    link: true
  },
  {
    name: 'Categories',
    path: '/categories/:categories',
    exact: false,
    component: Categories,
    link: false
  },
  {
    name: '404 not found',
    path: '/404',
    component: NotFound,
    link: false
  },
  {
    name: 'Page',
    path: '/:name',
    exact: true,
    component: Page,
    link: false
  }
];

// Make links for use in navBar
export const NavLinks = connect(
  state => ({
    pages: state.pages
  })
)(({ pages }) => {
  const [ links, setLinks ] = useState([]);

  useEffect(() => {
    
    // Check if any pages are marked to be displayed in nav
    // If found, make a page into a Link useable object
    const pagesFilt = pages.filter(p => p.meta.nav === true).map(p => ({
      name: p.meta.title,
      path: `/${p.meta.name}`,
      exact: true,
      component: Page,
      link: true,
      index: p.meta.index
    }));

    // Add found pages to nav array
    if (pagesFilt.length) {
      for (let p of pagesFilt) {

        // If has specific index, add link to index
        if (p.index) {
          routes.splice(p.index, 0, p);
        } else {
          routes.push(p);
        }
      }
    }

    // Save nav list to state for use later
    setLinks([ ...routes ]);
  }, [ pages ]);

  return (
    <nav className="nav nav--primary">
      {links.map((link, i) =>
        link.link &&
        <Link
          key={i}
          className="nav__item"
          to={link.path}
        >{link.name}</Link>
      )}
    </nav>
  );
});

// Define Routing
function Routes() {
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
    </Switch>
  );
      // <Redirect to="/404" />
}

export default Routes;
