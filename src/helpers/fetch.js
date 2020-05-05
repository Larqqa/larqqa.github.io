/**
 * Fetch all markdown files from path 
 */

/**
 * Get file name and path from require.context
 *
 * @param {Object} r - require.context object of file data
 *
 * @return {Object} file name and path
 */
const importAll = (r) => {

  // Get file names
  const fileName = r.keys().map(r => {
    return r.replace('./', '');
  });

  // Get file paths
  const filePath = r.keys().map(r);
  
  // Combine corresponding name & path
  return fileName.map((file, i) => {
    return {
      name: file,
      content: filePath[i]
    };
  });
};

/**
 * Make a promise for fetching each file content
 *
 * @param {array} path - Array of file objects containing names & paths  
 *
 * @return {Object} file name and fetched content 
 */
const getText = (path) => {
  const posts = Promise.all(path.map(

    // Fetch & await file content from path
    async (file) => {
      file.content = await fetch(file.content).then((res) => res.text());
      return file;
    })).catch((err) => console.error(err));
  return posts;
};

const pagesPromise = getText(importAll(
  require.context('../markdown/pages', true, /\.md$/)
));

const projectsPromise = getText(importAll(
  require.context('../markdown/projects', false, /\.md$/)
));

const blogPromise = getText(importAll(
  require.context('../markdown/blog', false, /\.md$/)
));

// Export promises
export { pagesPromise, projectsPromise, blogPromise };
