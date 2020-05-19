import React, { useEffect }from 'react';
import Page from './Page';
import Engine from '../particles/engine';

const Home = () => {

  useEffect(() => {
    Engine({});
  });

  
  return (
    <>
      <h1>Home</h1>
      <Page content="home" />
    </>
  );
};

export default Home;
