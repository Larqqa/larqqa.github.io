/**
 * Fetch all markdown files from path 
 */

// Get only the keys from require.context
const importAll = (r) => r.keys().map(r);

// Make a promise for fetching each file as text
const getText = (path) => {
  const posts = Promise.all(path.map(
    (file) => fetch(file)
      .then((res) => res.text())
  )).catch((err) => console.error(err));
      
  return posts;
};

// Get files from paths
const pagesPromise = getText(importAll(
  require.context('../markdown/pages', false, /\.md$/)
));

const projectsPromise = getText(importAll(
  require.context('../markdown/projects', false, /\.md$/)
));

const blogPromise = getText(importAll(
  require.context('../markdown/blog', false, /\.md$/)
));

// Export promises
export { pagesPromise, projectsPromise, blogPromise };
