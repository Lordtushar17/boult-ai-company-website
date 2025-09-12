import React, { useState, useEffect, useRef } from 'react';
import PageHero from '../components/PageHero';
import { MapPin, Clock, ChevronDown, ChevronUp, Users, Coffee, Award } from 'lucide-react';

const Career = () => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
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
    { name: 'Careers' }
  ];

  const jobOpenings = [
    {
      id: 1,
      title: "Senior Mechanical Engineer",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "5-8 years",
      description: "Lead the design and development of advanced testing equipment for automotive and defence applications. Collaborate with cross-functional teams to deliver innovative solutions.",
      requirements: [
        "Bachelor's/Master's degree in Mechanical Engineering",
        "5+ years of experience in product design and development",
        "Proficiency in CAD software (SolidWorks, AutoCAD)",
        "Experience with testing equipment design",
        "Strong problem-solving and analytical skills"
      ]
    },
    {
      id: 2,
      title: "Automation Engineer",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "3-5 years",
      description: "Design and implement automation solutions for testing rigs and manufacturing processes. Work with PLC programming and control systems.",
      requirements: [
        "Bachelor's degree in Electrical/Electronics Engineering",
        "Experience with PLC programming (Siemens, Allen Bradley)",
        "Knowledge of HMI/SCADA systems",
        "Understanding of industrial automation protocols",
        "Experience with servo drives and motion control"
      ]
    },
    {
      id: 3,
      title: "Quality Assurance Engineer",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "2-4 years",
      description: "Ensure product quality through comprehensive testing and validation processes. Develop quality control procedures and documentation.",
      requirements: [
        "Bachelor's degree in Engineering",
        "Experience in quality assurance and testing",
        "Knowledge of ISO standards and quality systems",
        "Strong attention to detail and documentation skills",
        "Experience with measurement and calibration equipment"
      ]
    },
    {
      id: 4,
      title: "Software Developer",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "2-5 years",
      description: "Develop software applications for data acquisition, analysis, and control systems. Work with embedded systems and real-time applications.",
      requirements: [
        "Bachelor's degree in Computer Science/Engineering",
        "Proficiency in C++, Python, or LabVIEW",
        "Experience with database management",
        "Knowledge of communication protocols",
        "Understanding of real-time systems"
      ]
    }
  ];

  const cultureHighlights = [
    {
      icon: Users,
      title: "Collaborative Environment",
      description: "Work with talented engineers and innovators in a supportive team atmosphere."
    },
    {
      icon: Award,
      title: "Growth Opportunities",
      description: "Continuous learning and career advancement opportunities with industry-leading projects."
    },
    {
      icon: Coffee,
      title: "Work-Life Balance",
      description: "Flexible working arrangements and comprehensive benefits package."
    }
  ];

  const toggleAccordion = (id: number) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <>
      <PageHero 
        title="Careers" 
        breadcrumbs={breadcrumbs}
        backgroundImage="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop"
      />

      {/* Work with Yantrashilpa Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-[#0A1F44] mb-6">
            Work with Yantrashilpa
          </h2>
          <p className="text-lg text-gray-700 font-roboto leading-relaxed max-w-3xl mx-auto mb-12">
            Join our team of innovative engineers and contribute to cutting-edge solutions that shape the future 
            of testing and measurement technologies. We offer exciting opportunities to work on challenging projects 
            with industry-leading expertise.
          </p>
          
          {/* Culture Highlights */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {cultureHighlights.map((highlight, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex p-4 bg-[#F97316] rounded-full mb-4">
                  <highlight.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-poppins font-semibold text-[#0A1F44] mb-3">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 font-roboto">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section ref={sectionRef} className="py-20 bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-poppins font-bold text-[#0A1F44] mb-4 transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              Current Openings
            </h2>
            <p className="text-gray-600 font-roboto">Explore exciting career opportunities with us</p>
          </div>

          <div className="space-y-6">
            {jobOpenings.map((job, index) => (
              <div
                key={job.id}
                className={`bg-white rounded-lg shadow-lg border border-gray-100 transition-all duration-1000 ${
                  isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Job Header */}
                <div 
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleAccordion(job.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-grow">
                      <h3 className="text-xl font-poppins font-semibold text-[#0A1F44] mb-2">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 font-roboto">
                        <div className="flex items-center gap-1">
                          <MapPin size={16} />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={16} />
                          <span>{job.type}</span>
                        </div>
                        <div>
                          <span className="bg-[#F97316] text-white px-2 py-1 rounded text-xs">
                            {job.experience}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      {openAccordion === job.id ? (
                        <ChevronUp size={24} className="text-[#F97316]" />
                      ) : (
                        <ChevronDown size={24} className="text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Job Details */}
                {openAccordion === job.id && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <div className="pt-6">
                      <p className="text-gray-700 font-roboto mb-6 leading-relaxed">
                        {job.description}
                      </p>
                      
                      <h4 className="font-poppins font-semibold text-[#0A1F44] mb-3">
                        Requirements:
                      </h4>
                      <ul className="space-y-2 mb-6">
                        {job.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-start gap-2 text-gray-700 font-roboto">
                            <span className="w-2 h-2 bg-[#F97316] rounded-full mt-2 flex-shrink-0"></span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <button className="bg-[#F97316] hover:bg-[#0A1F44] text-white px-6 py-3 rounded-lg font-roboto font-medium transition-colors duration-300">
                        Apply Now
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Life at Yantrashilpa Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-[#0A1F44] mb-4">
              Life at Yantrashilpa
            </h2>
            <p className="text-gray-600 font-roboto">Experience our vibrant workplace culture</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
                title: "Team Collaboration",
                description: "Working together on innovative projects"
              },
              {
                image: "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
                title: "Modern Workspace",
                description: "State-of-the-art facilities and equipment"
              },
              {
                image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
                title: "Learning & Development",
                description: "Continuous skill enhancement opportunities"
              }
            ].map((item, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-poppins font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="font-roboto text-sm opacity-90">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-[#F97316] hover:bg-[#0A1F44] text-white px-8 py-4 rounded-lg font-roboto font-medium transition-colors duration-300">
              Join Our Team
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Career;