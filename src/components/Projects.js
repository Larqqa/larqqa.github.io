import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLanguage } from '../helpers/misc';
import { sortByDate, sortByName } from '../helpers/sorts';

function Projects({ projects, link, children, sortable }) {
  const [ sorting, setSorting ] = useState('date');
  const [ order, setOrder ] = useState(true);
  const [ sortedProjects, setSortedProjects ] = useState([]);

  useEffect(() => {
    setSortedProjects(sortByDate(projects, order));
  }, [ projects, order ]);

  function sortNames() {
    if (sorting !== 'name') {
      setSorting('name');
      setSortedProjects(sortByName(projects, true));
      setOrder(true);
    } else {
      setSortedProjects(sortByName(projects, !order));
      setOrder(!order);
    }
  }

  function sortDates() {
    if (sorting !== 'date') {
      setSorting('date');
      setSortedProjects(sortByDate(projects, true));
      setOrder(true);
    } else {
      setSortedProjects(sortByDate(projects, !order));
      setOrder(!order);
    }
  }
  
  return (
    <div className={link}>
      {children}

      {sortable &&
        <>
          <button onClick={sortNames}>Sort by Name {order ? '↑' : '↓'}</button>
          <button onClick={sortDates}>Sort by date {order ? '↑' : '↓'}</button>
        </>
      }
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
