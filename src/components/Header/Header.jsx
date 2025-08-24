// src/components/Header/Header.jsx
import React from 'react';
import { FileText, Search, Grid, List } from 'lucide-react';
import { APP_CONFIG, VIEW_MODES } from '../../Utils/constants';

/**
 * Header component with app title, search, and view controls
 * @param {object} props - Component props
 * @param {string} props.searchTerm - Current search term
 * @param {function} props.onSearchChange - Search change handler
 * @param {string} props.viewMode - Current view mode (grid/list)
 * @param {function} props.onViewModeChange - View mode change handler
 */
const Header = ({ 
  searchTerm, 
  onSearchChange, 
  viewMode, 
  onViewModeChange 
}) => {
  return (
    <header className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 shadow-2xl sticky top-0 z-50 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
          
          {/* Logo and Title Section */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <FileText className="h-10 w-10 text-white drop-shadow-lg" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-wide drop-shadow-lg">
                {APP_CONFIG.APP_NAME}
              </h1>
              <p className="text-purple-100 text-sm hidden lg:block">
                {APP_CONFIG.APP_DESCRIPTION}
              </p>
            </div>
          </div>

          {/* Search and Controls Section */}
          <div className="flex items-center space-x-4 w-full lg:w-auto">
            
            {/* Search Input */}
            <div className="relative flex-1 lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search your notes..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border-0 focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all duration-300 shadow-lg placeholder-gray-500"
                autoComplete="off"
              />
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-white/20 rounded-full p-1">
              <button
                onClick={() => onViewModeChange(VIEW_MODES.GRID)}
                className={`p-2 rounded-full transition-all duration-300 ${
                  viewMode === VIEW_MODES.GRID 
                    ? 'bg-white text-purple-600 shadow-lg transform scale-110' 
                    : 'text-white hover:bg-white/20 hover:scale-105'
                }`}
                title="Grid View"
                aria-label="Switch to grid view"
              >
                <Grid className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => onViewModeChange(VIEW_MODES.LIST)}
                className={`p-2 rounded-full transition-all duration-300 ${
                  viewMode === VIEW_MODES.LIST 
                    ? 'bg-white text-purple-600 shadow-lg transform scale-110' 
                    : 'text-white hover:bg-white/20 hover:scale-105'
                }`}
                title="List View"
                aria-label="Switch to list view"
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Gradient Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500"></div>
    </header>
  );
};

export default Header;