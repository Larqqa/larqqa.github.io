import React from 'react';
import { connect } from 'react-redux';

function Project({ project }) {
  if (!project) return null;
  
  return (
    <h1>{project.meta.title}</h1>
  );
}

export default connect(
  
  // Get page content from prop of URL
  (state, props) => {
    let project = state.projects.filter(p => p.meta.name === props.match.params.name);
    return {
      project: project[0] ? project[0] : false
    };
  }
)( Project );
