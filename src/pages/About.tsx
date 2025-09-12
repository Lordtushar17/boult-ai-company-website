import React, { useState, useEffect, useRef } from 'react';
import PageHero from '../components/PageHero';
import { Target, Eye, Calendar, Users } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'About Us' }
  ];

  const timelineEvents = [
    {
      year: "Late 90's",
      title: "Foundation",
      description: "Started with SPM's and test-rigs for ballistic applications"
    },
    {
      year: "2000s",
      title: "Engine Testing Focus",
      description: "Evolved into specialized engine testing equipment manufacturing"
    },
    {
      year: "2010s",
      title: "Market Leadership",
      description: "Became one of the leading companies in innovative testing solutions"
    },
    {
      year: "Present",
      title: "Continued Growth",
      description: "Delivering next-generation requirements with proven expertise"
    }
  ];

  return (
    <>
      <PageHero 
        title="About Us" 
        breadcrumbs={breadcrumbs}
        backgroundImage="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop"
      />

      {/* Who We Are Section */}
      <section className="py-20 bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Team Photo */}
            <div className="transition-all duration-1000 transform translate-x-0 opacity-100">
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
            <div className="transition-all duration-1000 delay-300 transform translate-x-0 opacity-100">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-[#0A1F44] mb-6 relative">
                Who We Are
                <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#F97316] rounded"></span>
              </h2>
              
              <div className="space-y-6 text-gray-700 font-roboto leading-relaxed">
                <p>
                  The strong design oriented organization known today as <span className="font-semibold text-[#0A1F44]">Yantrashilpa</span> evolved 
                  from a solid technical and administrative support base. The origins of its Engine testing equipments 
                  often trace back to the SPM's and test-rigs for ballistic applications, designed by founder in the late 90\'s.
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

      {/* Mission & Vision Section */}
      <section ref={sectionRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className={`transition-all duration-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <div className="text-center mb-8">
                <div className="inline-flex p-4 bg-[#F97316] rounded-full mb-4">
                  <Target size={48} className="text-white" />
                </div>
                <h3 className="text-2xl font-poppins font-bold text-[#0A1F44] mb-4">Our Mission</h3>
              </div>
              <p className="text-gray-700 font-roboto leading-relaxed text-center">
                To deliver innovative, reliable, and world-class engineering solutions that exceed customer expectations 
                while maintaining the highest standards of quality, safety, and integrity in everything we do.
              </p>
            </div>

            {/* Vision */}
            <div className={`transition-all duration-1000 delay-300 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <div className="text-center mb-8">
                <div className="inline-flex p-4 bg-[#0A1F44] rounded-full mb-4">
                  <Eye size={48} className="text-white" />
                </div>
                <h3 className="text-2xl font-poppins font-bold text-[#0A1F44] mb-4">Our Vision</h3>
              </div>
              <p className="text-gray-700 font-roboto leading-relaxed text-center">
                To be the global leader in engineering excellence, pioneering cutting-edge technologies that shape 
                the future of testing and measurement solutions across industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-[#0A1F44] mb-4">
              Our Journey
            </h2>
            <p className="text-gray-600 font-roboto">From humble beginnings to industry leadership</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#F97316] hidden md:block"></div>

            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Content */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <div className="text-[#F97316] font-poppins font-bold text-lg mb-2">{event.year}</div>
                      <h3 className="text-xl font-poppins font-semibold text-[#0A1F44] mb-3">{event.title}</h3>
                      <p className="text-gray-600 font-roboto">{event.description}</p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="hidden md:flex w-2/12 justify-center">
                    <div className="w-4 h-4 bg-[#F97316] rounded-full border-4 border-white shadow-lg"></div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;