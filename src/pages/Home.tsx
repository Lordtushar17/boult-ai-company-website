import React from 'react';
import Hero from '../components/Hero';
import WhoWeAre from '../components/WhoWeAre';
import Stats from '../components/Stats';
import Services from '../components/Services';
import Values from '../components/Values';
import InLimelight from '../components/InLimelight';

const Home = () => {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <Stats />
      <Services />
      <Values />
      <InLimelight />
    </>
  );
};

export default Home;