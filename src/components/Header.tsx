import React, { useState, useEffect } from 'react';
import { Mail, Phone, Key, Menu, X } from 'lucide-react';

//header 

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { name: 'Home', id: 'hero' },
    { name: 'About Us', id: 'who-we-are' },
    { name: 'Products', id: 'services' },
    { name: 'Gallery', id: 'limelight' },
    { name: 'Career', id: 'values' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#0A1F44] text-white py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Mail size={14} />
              <span>support@yantrashilpa.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span>+91 9112211150</span>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-[#F97316] hover:bg-orange-600 px-3 py-1 rounded transition-colors">
            <Key size={14} />
            <span>Admin Login</span>
          </button>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#0A1F44] rounded-full flex items-center justify-center text-white font-bold text-xl">
                Y
              </div>
              <span className="ml-2 text-[#0A1F44] font-poppins font-semibold text-lg">
                Yantrashilpa
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-700 hover:text-[#F97316] font-roboto font-medium transition-colors duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F97316] group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200">
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:text-[#F97316] hover:bg-gray-50 transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;