import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Redirect, Link, Route } from 'react-router-dom';
import Page from './pages/Page';
import Projects from './pages/Projects';
import Posts from './pages/Posts';
import Categories from './pages/Categories';
import Post from './pages/Post';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

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
    name: 'Projects',
    path: '/projects/:options',
    exact: false,
    component: Projects,
    link: false
  },
  {
    name: 'Project',
    path: '/project/:name',
    exact: true,
    component: Post,
    link: false
  },
  {
    name: 'Blog',
    path: '/posts/',
    exact: true,
    component: Posts,
    link: true
  },
  {
    name: 'Blog',
    path: '/posts/:options',
    exact: false,
    component: Posts,
    link: false
  },
  {
    name: 'Blog post',
    path: '/post/:name',
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
    path: '/categories/:options',
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
  state => {
    if (!state.pages.length) {
      return {
        pages: 'waiting'
      };
    } else {
      return {
        pages: state.pages
      };
    }
  }
)(({ pages }) => {

  // Wait until store is fully initialized
  if (pages === 'waiting') return <p>Loading</p>;
  
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
          routes.push(p); // Else add to end
        }
      }
    }

    // Save nav list to state for rendering
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
      <Redirect to="/404" />
    </Switch>
  );
}

export default Routes;
