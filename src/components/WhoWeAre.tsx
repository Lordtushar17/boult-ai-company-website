import React, { useState, useEffect, useRef } from 'react';

const WhoWeAre = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  return (
    <section id="who-we-are" ref={sectionRef} className="py-20 bg-[#F4F4F4]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Team Photo */}
          <div className={`transition-all duration-1000 transform ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
          }`}>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Yantrashilpa Team"
                className="w-full rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-[#F97316] text-white px-6 py-3 rounded-lg font-poppins font-semibold">
                YANTRASHILPA TEAM
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className={`transition-all duration-1000 delay-300 transform ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
          }`}>
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-[#0A1F44] mb-6 relative">
              Who We Are
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#F97316] rounded"></span>
            </h2>
            
            <div className="space-y-6 text-gray-700 font-roboto leading-relaxed">
              <p>
                The strong design oriented organization known today as <span className="font-semibold text-[#0A1F44]">Yantrashilpa</span> evolved 
                from a solid technical and administrative support base. The origins of its Engine testing equipments 
                often trace back to the SPM's and test-rigs for ballistic applications, designed by founder in the late 90's.
              </p>
              
              <p>
                Since then Yantrashilpa is one of the leading companies with proven ability to deliver innovative 
                products that span traditional and next-generation requirements.
              </p>
              
              <p>
                Our customers recognize us for providing remarkably high quality technology and support with expertise 
                to match. Yantrashilpa's continuing impressive growth is a direct result of providing excellent products 
                at appropriate prices and prompt delivery in combination with technical support, service and localized inventory.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;