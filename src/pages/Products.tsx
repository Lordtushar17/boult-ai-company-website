import React, { useState, useEffect, useRef } from 'react';
import PageHero from '../components/PageHero';
import { Settings, Shield, Wrench, Target, ChevronRight } from 'lucide-react';

const Products = () => {
  const [activeFilter, setActiveFilter] = useState('All');
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
    { name: 'Products' }
  ];

  const filters = ['All', 'Engine Testing', 'Automotive Safety', 'Defence', 'Custom Systems'];

  const products = [
    {
      id: 1,
      name: "Engine Dynamometer Test Rig",
      category: "Engine Testing",
      description: "Advanced engine testing system with real-time monitoring and data acquisition capabilities.",
      image: "https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      icon: Settings
    },
    {
      id: 2,
      name: "Automotive Safety Testing Rig",
      category: "Automotive Safety",
      description: "Comprehensive safety testing solution for passive and active automotive systems.",
      image: "https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      icon: Shield
    },
    {
      id: 3,
      name: "Defence Component Tester",
      category: "Defence",
      description: "Critical testing apparatus designed for military applications with precision accuracy.",
      image: "https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      icon: Target
    },
    {
      id: 4,
      name: "Custom Industrial Testing System",
      category: "Custom Systems",
      description: "Tailored engineering solutions for unique industrial testing requirements.",
      image: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      icon: Wrench
    },
    {
      id: 5,
      name: "Transmission Test Bench",
      category: "Engine Testing",
      description: "Specialized testing equipment for automotive transmission systems and components.",
      image: "https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      icon: Settings
    },
    {
      id: 6,
      name: "Crash Test Simulation Rig",
      category: "Automotive Safety",
      description: "Advanced simulation system for automotive crash testing and safety validation.",
      image: "https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      icon: Shield
    }
  ];

  const filteredProducts = activeFilter === 'All' 
    ? products 
    : products.filter(product => product.category === activeFilter);

  return (
    <>
      <PageHero 
        title="Our Products" 
        breadcrumbs={breadcrumbs}
        backgroundImage="https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop"
      />

      <section ref={sectionRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filter Tabs */}
          <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-full font-roboto font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-[#F97316] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-[#F97316] hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`group bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                  isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 p-2 bg-[#F97316] rounded-full">
                    <product.icon size={20} className="text-white" />
                  </div>
                </div>

                {/* Product Content */}
                <div className="p-6">
                  <div className="text-sm text-[#F97316] font-roboto font-medium mb-2">
                    {product.category}
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-[#0A1F44] mb-3">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 font-roboto text-sm leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <button className="group/btn flex items-center gap-2 text-[#F97316] hover:text-[#0A1F44] font-roboto font-medium transition-colors duration-300">
                    Learn More
                    <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Products Message */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 font-roboto text-lg">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Products;