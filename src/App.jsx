// src/App.jsx
import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';

// Component imports
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import NoteForm from './components/NoteForm/NoteForm';
import Note from './components/Note/Note';
import Stats from './components/Stats/Stats';
import Alert from './UI/Alert/Alert';

// Hook imports
import useLocalStorage from './Hooks/useLocalStorage';
import useAlert from './Hooks/useAlert';

// Utility imports
import { searchNotes, sortNotes, debounce } from './Utils/helpers';
import { STORAGE_KEYS, VIEW_MODES, MESSAGES } from './Utils/constants';

// Styles
import './App.css';

/**
 * Main App Component - Keeper App
 * Sophisticated note-taking application with advanced features
 */
const App = () => {
  // State Management
  const [notes, setNotes] = useLocalStorage(STORAGE_KEYS.NOTES, []);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useLocalStorage(STORAGE_KEYS.VIEW_MODE, VIEW_MODES.GRID);
  const [sortBy, _setSortBy] = useState('date');
  const [sortOrder, _setSortOrder] = useState('desc');
  const [isLoading, setIsLoading] = useState(false);

  // Alert Management
  const {
    alerts,
    showSuccess,
    showError,
    showInfo,
    removeAlert,
    _clearAlerts
  } = useAlert();

  // Debounced search to improve performance
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = debounce((term) => {
      setDebouncedSearchTerm(term);
    }, 300);

    handler(searchTerm);
  }, [searchTerm]);

  // Filter and sort notes
  const filteredNotes = searchNotes(notes, debouncedSearchTerm);
  const sortedNotes = sortNotes(filteredNotes, sortBy, sortOrder);

  /**
   * Add new note to the collection
   * @param {object} newNote - New note object
   */
  const addNote = (newNote) => {
    try {
      setIsLoading(true);
      setNotes(prevNotes => [newNote, ...prevNotes]);
      showSuccess(MESSAGES.SAVE_SUCCESS);
      
      // Show helpful tips for first-time users
      if (notes.length === 0) {
        setTimeout(() => {
          showInfo('💡 Tip: You can edit notes by clicking the edit icon, or search through them using the search bar!');
        }, 2000);
      }
    } catch (error) {
      showError('Failed to save note. Please try again.');
      console.error('Error adding note:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Delete note from collection
   * @param {string} noteId - ID of note to delete
   */
  const deleteNote = (noteId) => {
    try {
      setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
      showSuccess(MESSAGES.DELETE_SUCCESS);
    } catch (error) {
      showError('Failed to delete note. Please try again.');
      console.error('Error deleting note:', error);
    }
  };

  /**
   * Update existing note
   * @param {string} noteId - ID of note to update
   * @param {object} updatedNote - Updated note object
   */
  const editNote = (noteId, updatedNote) => {
    try {
      setNotes(prevNotes =>
        prevNotes.map(note => (note.id === noteId ? updatedNote : note))
      );
      showSuccess('Note updated successfully!');
    } catch (error) {
      showError('Failed to update note. Please try again.');
      console.error('Error updating note:', error);
    }
  };

  /**
   * Clear search and show all notes
   */
  const clearSearch = () => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
  };

  /**
   * Handle search input change
   * @param {string} value - Search input value
   */
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  /**
   * Handle view mode change
   * @param {string} mode - New view mode
   */
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    showInfo(`Switched to ${mode} view`);
  };

  // Show welcome message for first-time users
  useEffect(() => {
    if (notes.length === 0 && !searchTerm) {
      const hasSeenWelcome = localStorage.getItem('keeper-welcome-shown');
      if (!hasSeenWelcome) {
        setTimeout(() => {
          showInfo('🌟 Welcome to Keeper App! Start by creating your first note above.');
          localStorage.setItem('keeper-welcome-shown', 'true');
        }, 1000);
      }
    }
  }, [notes.length, searchTerm, showInfo]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Alert System */}
      <Alert alerts={alerts} onRemoveAlert={removeAlert} />

      {/* Header */}
      <Header 
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
      />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Note Creation Form */}
        <NoteForm onAddNote={addNote} />
        
        {/* Statistics and Search Info */}
        <Stats 
          totalNotes={sortedNotes.length} 
          searchTerm={debouncedSearchTerm}
          totalAllNotes={notes.length}
        />
        
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <span className="ml-2 text-gray-600">Saving note...</span>
          </div>
        )}
        
        {/* Notes Display */}
        {sortedNotes.length === 0 ? (
          <EmptyState 
            searchTerm={debouncedSearchTerm} 
            onClearSearch={clearSearch}
            totalNotes={notes.length}
          />
        ) : (
          <div className={
            viewMode === VIEW_MODES.GRID
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "max-w-4xl mx-auto space-y-4"
          }>
            {sortedNotes.map(note => (
              <Note
                key={note.id}
                note={note}
                onDeleteNote={deleteNote}
                onEditNote={editNote}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

/**
 * Empty State Component
 * @param {object} props - Component props
 * @param {string} props.searchTerm - Current search term
 * @param {function} props.onClearSearch - Clear search function
 * @param {number} props.totalNotes - Total number of notes
 */
const EmptyState = ({ searchTerm, onClearSearch, totalNotes }) => {
  const isSearching = searchTerm && searchTerm.trim().length > 0;
  
  return (
    <div className="text-center py-16">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto shadow-lg border border-gray-200">
        
        {/* Empty State Icon */}
        <div className="relative mb-6">
          <FileText className="h-20 w-20 text-gray-300 mx-auto" />
          {isSearching && (
            <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-2">
              <span className="text-xs">?</span>
            </div>
          )}
        </div>
        
        {/* Empty State Content */}
        {isSearching ? (
          <>
            <h3 className="text-xl font-medium text-gray-500 mb-3">
              {MESSAGES.SEARCH_EMPTY_TITLE}
            </h3>
            <p className="text-gray-400 mb-6">
              No notes match your search "<strong>{searchTerm}</strong>"
            </p>
            <div className="space-y-2">
              <button
                onClick={onClearSearch}
                className="text-purple-600 hover:text-purple-800 font-medium hover:underline"
              >
                Clear search
              </button>
              <div className="text-xs text-gray-400">
                or try different keywords
              </div>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-xl font-medium text-gray-500 mb-3">
              {MESSAGES.EMPTY_STATE_TITLE}
            </h3>
            <p className="text-gray-400 mb-6">
              {MESSAGES.EMPTY_STATE_DESCRIPTION}
            </p>
            <div className="text-sm text-gray-500">
              <div className="flex items-center justify-center space-x-4 mb-3">
                <span>✍️ Write thoughts</span>
                <span>📚 Save ideas</span>
                <span>🔍 Find easily</span>
              </div>
              <p className="text-xs">
                Click in the text box above to create your first note!
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;