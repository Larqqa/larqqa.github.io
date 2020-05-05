/**
 * Parser for extracting the header metadata from the markdown files 
 * 
 * @param {array} fileData - Array of objects containing file names & markdown content
 *
 * @return {Array} Array of objects containing parsed Meta header & markdown scontent
 */
const parser = (fileData) => {
  return fileData.map(obj=> {
    
    // Extract & format the meta header
    let header = obj.content.match( /---\n(.*)\n---/s);

    // Sanitize filename for use as path
    const name = obj.name.replace('.md', '').replace(' ', '-').toLowerCase();

    if (header) {
      header = `{ ${header[1]} }`;
      header = header.replace(/\n/g, ', ');
      header = JSON.parse(header);
      header.name = name;
    } else {
      header = { name: name };
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
