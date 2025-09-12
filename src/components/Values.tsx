import React, { useState, useEffect, useRef } from 'react';
import { Heart, Shield, Star } from 'lucide-react';

const Values = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);   //values

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
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

  const values = [
    {
      number: "01",
      icon: Heart,
      title: "Integrity",
      description: "Honesty, transparency, and accountability in all our dealings.",
      delay: 0
    },
    {
      number: "02",
      icon: Shield,
      title: "Safety",
      description: "Prioritizing customers, employees, and community well-being above all.",
      delay: 300
    },
    {
      number: "03",
      icon: Star,
      title: "Customer Satisfaction",
      description: "Delivering reliable solutions that build long-lasting trust and partnerships.",
      delay: 600
    }
  ];

  return (
    <section id="values" ref={sectionRef} className="py-20 bg-[#0A1F44] relative overflow-hidden">
      {/* Glowing Orange Accents */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#F97316] rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-40 h-40 bg-[#F97316] rounded-full blur-3xl opacity-15 animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 w-36 h-36 bg-[#F97316] rounded-full blur-3xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-poppins font-bold text-white mb-4 transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            Our Values
          </h2>
        </div>

        {/* Values Cards */}
        <div className="space-y-8">
          {values.map((value, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-8 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 transition-all duration-1000 transform ${
                isVisible 
                  ? 'translate-x-0 opacity-100' 
                  : index % 2 === 0 ? '-translate-x-8 opacity-0' : 'translate-x-8 opacity-0'
              }`}
              style={{ transitionDelay: `${value.delay}ms` }}
            >
              {/* Number and Icon */}
              <div className="flex-shrink-0 flex items-center gap-6">
                <div className="text-4xl font-poppins font-bold text-[#F97316]">
                  {value.number}
                </div>
                <div className="p-4 bg-[#F97316] rounded-full">
                  <value.icon size={32} className="text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-2xl font-poppins font-semibold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-300 font-roboto leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;