/**
 * Parser for extracting the header metadata from the markdown files 
 */

const parser = (mdArr) => {
  return mdArr.map(string => {

    // Extract & format the meta header
    let header = string.match( /---\n(.*)\n---/s);
    if (header) {
      header = `{ ${header[1]} }`;
      header = header.replace(/\n/g, ', ');
      header = JSON.parse(header);
    }

    // Remove header from the content
    const parsedString = string.replace(/---\n(.*)---\n/s, '');

    // Return both as object
    return {
      'meta': header ? header : false,
      'content': parsedString
    };
  });
};

export default parser;
