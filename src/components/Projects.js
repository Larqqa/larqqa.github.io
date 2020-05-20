import React from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

function Projects({ projects }) {
  console.log(projects);
  return (
    <>
      {projects.map(a => <ReactMarkdown source={a.content}/>)}
    </>
  );
}

export default connect(
  state => {
    return {
      projects: state.projects
    };
  }
)( Projects );
