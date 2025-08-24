// src/components/Footer/Footer.jsx
import React from 'react';
import { FileText, Heart, Code } from 'lucide-react';
import { APP_CONFIG } from '../../Utils/constants';

/**
 * Footer component with app branding and credits
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          
          {/* Logo and App Name */}
          <div className="flex items-center justify-center space-x-2 mb-4">
            <FileText className="h-6 w-6 text-purple-400" />
            <span className="text-lg font-semibold">{APP_CONFIG.APP_NAME}</span>
          </div>
          
          {/* Main Footer Text */}
          <div className="flex items-center justify-center space-x-2 mb-2">
            <p className="text-gray-300 text-sm">
              © {currentYear} {APP_CONFIG.APP_NAME}. Built with
            </p>
            <Heart className="h-4 w-4 text-red-400 animate-pulse" />
            <p className="text-gray-300 text-sm">
              using React JS & Tailwind CSS
            </p>
          </div>
          
          {/* Subtitle */}
          <p className="text-gray-400 text-xs mb-4">
            Your thoughts, organized beautifully.
          </p>
          
          {/* Tech Stack */}
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Code className="h-3 w-3" />
              <span>React 18</span>
            </div>
            <span>•</span>
            <span>Tailwind CSS</span>
            <span>•</span>
            <span>Lucide Icons</span>
          </div>
          
          {/* Version */}
          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-xs text-gray-500">
              Version {APP_CONFIG.VERSION}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;