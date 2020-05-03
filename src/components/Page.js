import React from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

const Page = ({ pages }) => {
  const excerpt = pages.filter(a => a.meta.title === 'excerpt')[0];
  
  return (
    <>
      <ReactMarkdown source={excerpt && excerpt.content} />
      {/*about.map(a => <ReactMarkdown source={a.content}/>)*/}
    </>
  );
};

export default connect(
  state => {
    return {
      pages: state.pages
    };
  }
)( Page );
