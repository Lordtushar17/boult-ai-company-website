import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WhoWeAre from './components/WhoWeAre';
import Stats from './components/Stats';
import Services from './components/Services';
import Values from './components/Values';
import InLimelight from './components/InLimelight';
import Footer from './components/Footer';



function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Header />
      <main>
        <Hero />
        <WhoWeAre />
        <Stats />
        <Services />
        <Values />
        <InLimelight />
      </main>
      <Footer />
    </div>
  );
}

export default App;