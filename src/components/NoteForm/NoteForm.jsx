// src/components/NoteForm/NoteForm.jsx
import React, { useState, useRef } from 'react';
import { PlusCircle, X } from 'lucide-react';
import { getRandomColor, formatDate, generateId, validateNote } from '../../Utils/helpers';
import { MESSAGES, SHORTCUTS } from '../../Utils/constants';
import useAlert from '../../Hooks/useAlert';

/**
 * NoteForm component for creating new notes
 * @param {object} props - Component props
 * @param {function} props.onAddNote - Function to add new note
 */
const NoteForm = ({ onAddNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const titleInputRef = useRef(null);
  const { showError, showSuccess } = useAlert();

  /**
   * Handle form submission
   */
  const handleSubmit = () => {
    const noteData = { title: title.trim(), content: content.trim() };
    const validation = validateNote(noteData);

    if (!validation.isValid) {
      showError(MESSAGES.VALIDATION_ERROR);
      titleInputRef.current?.focus();
      return;
    }

    const newNote = {
      id: generateId(),
      title: noteData.title || MESSAGES.EMPTY_TITLE_PLACEHOLDER,
      content: noteData.content,
      createdAt: formatDate(),
      color: getRandomColor(),
      updatedAt: null
    };

    onAddNote(newNote);
    showSuccess(MESSAGES.SAVE_SUCCESS);
    
    // Reset form
    setTitle('');
    setContent('');
    setIsExpanded(false);
  };

  /**
   * Handle keyboard shortcuts
   * @param {KeyboardEvent} e - Keyboard event
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  /**
   * Handle form cancellation
   */
  const handleCancel = () => {
    setTitle('');
    setContent('');
    setIsExpanded(false);
  };

  /**
   * Handle input focus to expand form
   */
  const handleFocus = () => {
    setIsExpanded(true);
  };

  return (
    <div className="max-w-2xl mx-auto mb-8">
      <div className={`bg-white rounded-2xl shadow-xl border-0 transition-all duration-500 transform hover:scale-105 ${
        isExpanded ? 'shadow-2xl ring-2 ring-purple-500/20' : ''
      }`}>
        <div className="p-6 space-y-4">
          
          {/* Title Input */}
          <div className="relative">
            <input
              ref={titleInputRef}
              type="text"
              placeholder={isExpanded ? "Note title..." : "Take a note..."}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={handleFocus}
              onKeyDown={handleKeyPress}
              className="w-full px-4 py-3 text-lg font-medium bg-transparent border-0 focus:outline-none text-gray-800 placeholder-gray-500 transition-all duration-300"
              maxLength={200}
              autoComplete="off"
            />
            
            {/* Character counter for title */}
            {isExpanded && title && (
              <div className="absolute top-1 right-2 text-xs text-gray-400">
                {title.length}/200
              </div>
            )}
          </div>
          
          {/* Expanded Form Content */}
          {isExpanded && (
            <div className="animate-fadeIn space-y-4">
              
              {/* Content Textarea */}
              <div className="relative">
                <textarea
                  placeholder="Write your note here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onKeyDown={handleKeyPress}
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 resize-none text-gray-800 placeholder-gray-500"
                  maxLength={5000}
                />
                
                {/* Character counter for content */}
                {content && (
                  <div className="absolute bottom-2 right-3 text-xs text-gray-400">
                    {content.length}/5000
                  </div>
                )}
              </div>
              
              {/* Form Footer */}
              <div className="flex items-center justify-between pt-2">
                
                {/* Tip Text */}
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>💡 Tip: Press {SHORTCUTS.SAVE_NOTE} to save quickly</span>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center space-x-3">
                  
                  {/* Cancel Button */}
                  <button
                    onClick={handleCancel}
                    type="button"
                    className="px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors duration-200 flex items-center space-x-2 rounded-lg hover:bg-gray-100"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                  
                  {/* Add Button */}
                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2 rounded-xl hover:from-purple-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 font-medium flex items-center space-x-2 shadow-lg focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    <PlusCircle className="h-4 w-4" />
                    <span>Add Note</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Progress indicator */}
        {isExpanded && (title || content) && (
          <div className="h-1 bg-gray-100">
            <div 
              className="h-1 bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-300"
              style={{
                width: `${Math.min(((title.length + content.length) / 100) * 100, 100)}%`
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteForm;