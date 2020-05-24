import React from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { Link, Redirect } from 'react-router-dom';
import { getLanguage } from '../helpers/misc';

function Project({ project, next, previous }) {
  if (!project) return null;
  
  return (
    <>
      <header>
        {project.meta.image && <img alt="" src={project.meta.image}></img>}
        <h1>{project.meta.title}</h1>
        <p>{project.meta.date.toLocaleDateString(getLanguage())}</p>
      </header>
      <div>
        <ReactMarkdown source={project.content} />
      </div>
      <div>
        {previous &&
         <Link to={`/project/${previous.meta.name}`}>
           Previous: {previous.meta.title}
         </Link>}

        {next &&
         <Link to={`/project/${next.meta.name}`}>
           Next: {next.meta.title}
         </Link>}
      </div>
    </>
  );
}

export default connect(
  
  // Get page content from prop of URL
  (state, props) => {
    const projects = state.projects;
    const project = projects.filter(p => p.meta.name === props.match.params.name)[0];

    let next;
    let previous;
    if (project) {
      for (let i = 0; i < projects.length; i++) {
        if (projects[i].meta.name === project.meta.name) {
          next = projects[i + 1];
          previous = projects[i - 1];
          break;
        }
      }
    }

    return {
      project: project,
      next: next,
      previous: previous
    };
  }
)( Project );
