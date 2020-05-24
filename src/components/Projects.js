import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SelectSorting from './SelectSorting';
import { getLanguage } from '../helpers/misc';
import { sortByDate } from '../helpers/sorts';

function Projects({ projects, link, children, sortable }) {
  const [ sortedProjects, setSortedProjects ] = useState([]);

  useEffect(() => {
    setSortedProjects(sortByDate(projects));
  }, [ projects ]);
  
  return (
    <div className={link}>
      {children}
      {sortable && <SelectSorting posts={sortedProjects} setPosts={setSortedProjects}/>}
      <ul>
        {sortedProjects.map((project, i) => {
          return (
            <li key={i}>
              <img alt="" src={project.meta.image}/>
              <Link to={`/${link}/${project.meta.name}`}>
                {project.meta.title}
              </Link>
              <p>{project.meta.date.toLocaleDateString(getLanguage())}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default connect(
  (state, props) => {
    if (!props.projects) {
      return {
        projects: state.projects,
        link: 'projects',
        children: (<h1>Projects</h1>),
        sortable: true
      };
    } else return {};
  }
)( Projects );
