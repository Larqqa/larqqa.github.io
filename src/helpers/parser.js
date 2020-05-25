/**
 * Parser for extracting the header metadata from the markdown files 
 * 
 * @param {array} fileData - Array of objects containing file names & markdown content
 *
 * @return {Array} Array of objects containing parsed Meta header & markdown scontent
 */
const parser = (fileData, urlPath) => {
  return fileData.map(obj=> {
    
    // Extract & format the meta header
    let header = obj.content.match( /---\n(.*)\n---/s);

    // Sanitize filename for use as path
    const name = obj.name.replace('.md', '').replace(' ', '-').toLowerCase();
    
    if (header) {

      // Parse header to object notation
      header = `{ ${header[1]} }`;
      header = header.replace(/\n/g, ', ');

      // Parse  header into an object
      header = JSON.parse(header);
      header.date = new Date(header.date);

      // Set categories to none if there are none
      header.categories = header.categories ? header.categories : [ 'none' ];

      // Set a base url for type of post
      header.baseURL = urlPath;
      
      // Add file name to header
      header.name = name;
    } else {
      header = {
        name: name,
        baseURL: urlPath,
        categories: [ 'none' ],
      };
    }

    // Remove header from the content
    const parsedString = obj.content.replace(/---\n(.*)---\n/s, '');

    // Return both as object
    return {
      'meta': header ? header : false,
      'content': parsedString
    };
  });
};

export default parser;
