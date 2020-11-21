import React from 'react';
import { Link } from 'gatsby';

import { kebabCase } from '../../helpers';

function Tags ({ tags }) {
  return (
    <div className="tags">
      <h2>Tags</h2>
      <ul>
        {tags.map(tag => {
          return (
            <li key={kebabCase(tag)}>
              <Link to={`/tags/${kebabCase(tag)}`} itemProp="url">
                <span itemProp="headline">{tag}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default Tags;