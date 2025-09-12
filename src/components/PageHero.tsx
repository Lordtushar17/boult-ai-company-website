import React from 'react';
import { ChevronRight } from 'lucide-react';

interface PageHeroProps {
  title: string;
  breadcrumbs: { name: string; path?: string }[];
  backgroundImage?: string;
}

const PageHero: React.FC<PageHeroProps> = ({ 
  title, 
  breadcrumbs, 
  backgroundImage = "https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop"
}) => {
  return (
    <section className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 31, 68, 0.8), rgba(10, 31, 68, 0.6)), url('${backgroundImage}')`
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-poppins font-bold mb-4">
          {title}
        </h1>
        
        {/* Breadcrumbs */}
        <nav className="flex items-center justify-center space-x-2 text-sm md:text-base opacity-90">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              <span className={index === breadcrumbs.length - 1 ? 'text-[#F97316]' : 'hover:text-[#F97316] transition-colors'}>
                {crumb.name}
              </span>
              {index < breadcrumbs.length - 1 && (
                <ChevronRight size={16} className="text-gray-300" />
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </section>
  );
};

export default PageHero;