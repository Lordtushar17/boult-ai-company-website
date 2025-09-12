import React, { useState, useEffect } from 'react';
import { ChevronRight, Play } from 'lucide-react';

//hero

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 31, 68, 0.7), rgba(10, 31, 68, 0.5)), url('https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop')`
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <div className={`transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-6 leading-tight">
            Engineering Excellence with{' '}
            <span className="text-[#F97316]">Yantrashilpa</span>
          </h1>
          <p className="text-lg md:text-xl font-roboto mb-8 leading-relaxed opacity-90">
            Innovating the future with cutting-edge solutions and world-class expertise.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group bg-[#F97316] hover:bg-[#0A1F44] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105">
              Get Started
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group border-2 border-white text-white hover:bg-[#F97316] hover:border-[#F97316] px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2">
              <Play size={16} />
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;