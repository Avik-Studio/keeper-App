// src/components/Stats/Stats.jsx
import React from 'react';
import { FileText, Search, TrendingUp } from 'lucide-react';

/**
 * Stats component showing note statistics and search info
 * @param {object} props - Component props
 * @param {number} props.totalNotes - Total number of filtered notes
 * @param {string} props.searchTerm - Current search term
 * @param {number} props.totalAllNotes - Total number of all notes (optional)
 */
const Stats = ({ totalNotes, searchTerm, totalAllNotes }) => {
  const isFiltered = searchTerm && searchTerm.trim().length > 0;
  
  return (
    <div className="flex justify-center mb-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center space-x-6 text-sm">
          
          {/* Total Notes Count */}
          <div className="flex items-center space-x-2 text-gray-600">
            <div className="p-2 bg-purple-100 rounded-full">
              <FileText className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-800">
                {totalNotes} {totalNotes === 1 ? 'Note' : 'Notes'}
              </div>
              <div className="text-xs text-gray-500">
                {isFiltered && totalAllNotes ? `of ${totalAllNotes} total` : 'in collection'}
              </div>
            </div>
          </div>
          
          {/* Search Info */}
          {isFiltered && (
            <>
              <div className="h-8 w-px bg-gray-300" />
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Search className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">
                    Search Results
                  </div>
                  <div className="text-xs text-gray-500 max-w-32 truncate">
                    "{searchTerm}"
                  </div>
                </div>
              </div>
            </>
          )}
          
          {/* Performance Indicator */}
          {totalNotes > 0 && (
            <>
              <div className="h-8 w-px bg-gray-300" />
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="p-2 bg-green-100 rounded-full">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">
                    {totalNotes > 10 ? 'Highly' : totalNotes > 5 ? 'Moderately' : 'Getting'} Active
                  </div>
                  <div className="text-xs text-gray-500">
                    Keep it up!
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Progress Bar for Collection Size */}
        {totalNotes > 0 && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Collection Progress</span>
              <span>{Math.min(totalNotes, 50)}/50</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((totalNotes / 50) * 100, 100)}%` }}
              />
            </div>
            <div className="text-xs text-gray-400 mt-1 text-center">
              {totalNotes >= 50 ? '🎉 Master note-taker!' : 
               totalNotes >= 25 ? '⭐ Great collection!' :
               totalNotes >= 10 ? '📚 Growing nicely!' :
               '🌱 Just getting started'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;