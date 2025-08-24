// src/components/Note/Note.jsx
import React, { useState } from 'react';
import { Trash2, Edit3, Save, X, Copy, Calendar, Clock } from 'lucide-react';
import { validateNote, formatDate, copyToClipboard } from '../../Utils/helpers';
import { MESSAGES, VIEW_MODES } from '../../Utils/constants';
import useAlert from '../../Hooks/useAlert';

/**
 * Note component for displaying and editing individual notes
 * @param {object} props - Component props
 * @param {object} props.note - Note object
 * @param {function} props.onDeleteNote - Delete note handler
 * @param {function} props.onEditNote - Edit note handler
 * @param {string} props.viewMode - Current view mode (grid/list)
 */
const Note = ({ note, onDeleteNote, onEditNote, viewMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);
  const { showError, showSuccess } = useAlert();

  /**
   * Handle saving edited note
   */
  const handleSaveEdit = () => {
    const noteData = { title: editTitle.trim(), content: editContent.trim() };
    const validation = validateNote(noteData);

    if (!validation.isValid) {
      showError(MESSAGES.VALIDATION_ERROR);
      return;
    }

    const updatedNote = {
      ...note,
      title: noteData.title || MESSAGES.EMPTY_TITLE_PLACEHOLDER,
      content: noteData.content,
      updatedAt: formatDate()
    };

    onEditNote(note.id, updatedNote);
    showSuccess('Note updated successfully!');
    setIsEditing(false);
  };

  /**
   * Handle canceling edit
   */
  const handleCancelEdit = () => {
    setEditTitle(note.title);
    setEditContent(note.content);
    setIsEditing(false);
  };

  /**
   * Handle note deletion with confirmation
   */
  const handleDelete = () => {
    const confirmed = window.confirm(MESSAGES.DELETE_CONFIRMATION);
    if (confirmed) {
      onDeleteNote(note.id);
      showSuccess(MESSAGES.DELETE_SUCCESS);
    }
  };

  /**
   * Handle copying note content to clipboard
   */
  const handleCopy = async () => {
    const noteText = `${note.title}\n\n${note.content}`;
    const success = await copyToClipboard(noteText);
    
    if (success) {
      showSuccess(MESSAGES.COPY_SUCCESS);
    } else {
      showError(MESSAGES.COPY_ERROR);
    }
  };

  /**
   * Handle keyboard shortcuts in edit mode
   * @param {KeyboardEvent} e - Keyboard event
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  // Render list view
  if (viewMode === VIEW_MODES.LIST) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-all duration-300 mb-4 group">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-3">
                {/* Edit Title Input */}
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full text-lg font-semibold bg-gray-50 rounded-lg px-3 py-2 border-0 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Note title..."
                  maxLength={200}
                />
                
                {/* Edit Content Textarea */}
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  onKeyDown={handleKeyPress}
                  rows="3"
                  className="w-full bg-gray-50 rounded-lg px-3 py-2 border-0 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  placeholder="Note content..."
                  maxLength={5000}
                />
                
                {/* Edit Actions */}
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={handleSaveEdit} 
                    className="text-green-600 hover:text-green-800 p-2 rounded-full hover:bg-green-50 transition-colors duration-200"
                    title="Save changes"
                  >
                    <Save className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={handleCancelEdit} 
                    className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors duration-200"
                    title="Cancel editing"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* Note Content */}
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {note.title}
                </h3>
                {note.content && (
                  <p className="text-gray-600 leading-relaxed mb-3 line-clamp-4">
                    {note.content}
                  </p>
                )}
                
                {/* Timestamps */}
                <div className="flex items-center space-x-4 text-xs text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>Created: {note.createdAt}</span>
                  </div>
                  {note.updatedAt && (
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>Updated: {note.updatedAt}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          {!isEditing && (
            <div className="flex items-center space-x-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={handleCopy}
                className="text-gray-400 hover:text-blue-500 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50"
                title="Copy note"
              >
                <Copy className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-green-500 transition-colors duration-200 p-2 rounded-full hover:bg-green-50"
                title="Edit note"
              >
                <Edit3 className="h-4 w-4" />
              </button>
              <button
                onClick={handleDelete}
                className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-2 rounded-full hover:bg-red-50"
                title="Delete note"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Render grid view (default)
  return (
    <div className={`${note.color || 'bg-white'} rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1`}>
      
      {/* Header with Title and Actions */}
      <div className="flex justify-between items-start mb-3">
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 text-lg font-semibold bg-white/80 rounded-lg px-3 py-1 mr-2 border-0 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Note title..."
            maxLength={200}
            autoFocus
          />
        ) : (
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 flex-1 mr-2">
            {note.title}
          </h3>
        )}
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {isEditing ? (
            <>
              <button
                onClick={handleSaveEdit}
                className="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-50 transition-colors duration-200"
                title="Save changes"
              >
                <Save className="h-4 w-4" />
              </button>
              <button
                onClick={handleCancelEdit}
                className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition-colors duration-200"
                title="Cancel editing"
              >
                <X className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleCopy}
                className="text-gray-400 hover:text-blue-500 transition-colors duration-200 p-1 rounded-full hover:bg-blue-50"
                title="Copy note"
              >
                <Copy className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-green-500 transition-colors duration-200 p-1 rounded-full hover:bg-green-50"
                title="Edit note"
              >
                <Edit3 className="h-4 w-4" />
              </button>
              <button
                onClick={handleDelete}
                className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1 rounded-full hover:bg-red-50"
                title="Delete note"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Content Section */}
      {isEditing ? (
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          onKeyDown={handleKeyPress}
          rows="4"
          className="w-full bg-white/80 rounded-lg px-3 py-2 mb-3 border-0 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          placeholder="Note content..."
          maxLength={5000}
        />
      ) : (
        note.content && (
          <p className="text-gray-600 mb-3 line-clamp-6 leading-relaxed">
            {note.content}
          </p>
        )
      )}
      
      {/* Footer with Timestamps */}
      {!isEditing && (
        <div className="text-xs text-gray-400 font-medium space-y-1">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>Created: {note.createdAt}</span>
          </div>
          {note.updatedAt && (
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>Updated: {note.updatedAt}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Note;