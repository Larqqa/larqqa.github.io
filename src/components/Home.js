import React from 'react';
import Page from './Page';
import initDrawing from '../helpers/animation';

const Home = () => {
  initDrawing();
  
  return (
    <>
      <h1>Home</h1>
      <Page content="home" />
    </>
  );
};

export default Home;
