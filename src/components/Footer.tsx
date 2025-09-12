import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Phone, Clock, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const location = useLocation();  //footer

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Career', path: '/career' },
    { name: 'Contact', path: '/contact' }
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook' },
    { icon: Instagram, label: 'Instagram' },
    { icon: Twitter, label: 'Twitter' },
    { icon: Linkedin, label: 'LinkedIn' }
  ];

  return (
    <footer id="contact" className="bg-gradient-to-b from-[#0A1F44] to-black text-white">
      {/* Main Footer */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Left Column - Company Info */}
            <div className="space-y-6">
              {/* Logo */}
              <Link to="/" className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#F97316] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  Y
                </div>
                <span className="ml-3 text-white font-poppins font-semibold text-xl">
                  Yantrashilpa Technologies
                </span>
              </Link>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-[#F97316]" />
                  <span className="font-roboto">+91 9112211150</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-[#F97316]" />
                  <span className="font-roboto">support@yantrashilpa.com</span>
                </div>
              </div>
            </div>

            {/* Middle Column - Quick Links */}
            <div>
              <h3 className="text-xl font-poppins font-semibold mb-6">Quick Links</h3>
              <div className="space-y-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block text-gray-300 hover:text-[#F97316] font-roboto transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Column - Working Hours & Social */}
            <div>
              <h3 className="text-xl font-poppins font-semibold mb-6">Working Hours</h3>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-[#F97316]" />
                  <div className="font-roboto">
                    <div>Sunday – Saturday: 8:30 am – 5 pm</div>
                    <div className="text-gray-400 text-sm">Thursday: Closed</div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <h4 className="font-poppins font-medium mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <button
                    key={index}
                    className="group p-3 bg-white/10 rounded-full hover:bg-[#F97316] transition-all duration-300 transform hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon size={20} className="group-hover:text-white transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-roboto text-gray-400 text-center md:text-left">
              © 2025 Yantrashilpa Technologies Pvt Ltd. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <button className="text-gray-400 hover:text-[#F97316] transition-colors">
                Privacy Policy
              </button>
              <span className="text-gray-600">|</span>
              <button className="text-gray-400 hover:text-[#F97316] transition-colors">
                Terms & Conditions
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;