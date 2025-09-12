import React, { useState, useEffect, useRef } from 'react';
import { Cog, Shield, Wrench, Target } from 'lucide-react';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);  //services

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const services = [
    {
      icon: Cog,
      title: "International Standards",
      description: "State-of-the-art equipment adhering to international engine testing standards.",
      delay: 0
    },
    {
      icon: Shield,
      title: "Automotive Safety Testing",
      description: "Fully autonomous active & passive automotive safety testing rigs.",
      delay: 200
    },
    {
      icon: Wrench,
      title: "Customised Systems",
      description: "Customised systems for atypical user requirements.",
      delay: 400
    },
    {
      icon: Target,
      title: "Defence Components",
      description: "Innovative & robust testing apparatus for critical defence components.",
      delay: 600
    }
  ];

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #0A1F44 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-poppins font-bold text-[#0A1F44] mb-4 relative inline-block transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            We Provide You
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#F97316] rounded"></span>
          </h2>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${service.delay}ms` }}
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-[#F97316] to-[#ff8a47] rounded-full group-hover:scale-110 transition-transform duration-300">
                  <service.icon size={32} className="text-white" />
                </div>
              </div>
              <h3 className="text-lg font-poppins font-semibold text-[#0A1F44] mb-3 text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 font-roboto text-sm leading-relaxed text-center">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;