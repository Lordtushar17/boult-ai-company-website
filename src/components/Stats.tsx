import React, { useState, useEffect, useRef } from 'react';
import { Settings, Users, Award } from 'lucide-react';
import Counter from './Counter';

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);  //stats

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
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

  const stats = [
    {
      icon: Settings,
      value: 1415,
      label: "Systems Installed",
      delay: 0
    },
    {
      icon: Users,
      value: 45,
      label: "Happy Clients",
      delay: 200
    },
    {
      icon: Award,
      value: 30,
      label: "Patents & Design Registrations",
      delay: 400
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1F44] to-[#1a3a6b]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[#F97316] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#F97316] rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white rounded-full blur-3xl opacity-5"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center text-white transition-all duration-1000 transform ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${stat.delay}ms` }}
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-[#F97316] rounded-full">
                  <stat.icon size={48} />
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-poppins font-bold mb-2">
                <Counter target={stat.value} isVisible={isVisible} delay={stat.delay} />
              </div>
              <p className="text-lg font-roboto opacity-90">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;