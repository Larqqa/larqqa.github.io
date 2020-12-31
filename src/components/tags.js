import React from 'react';
import { Link } from 'gatsby';
import { kebabCase } from '../../helpers';
import '../styles/components/tags.scss';

function Tags ({ tags }) {
  return (
    <div className="tags">
      <h3 className="heading">Categories:</h3>

      <ul>
        {tags.map(tag =>
          <li key={kebabCase(tag)}>
            <Link to={`/tags/${kebabCase(tag)}`} itemProp="url">
              <span itemProp="headline">{tag}</span>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
export default Tags;