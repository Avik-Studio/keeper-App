// src/utils/helpers.js

/**
 * Generate a random color class for notes
 * @returns {string} - Tailwind background color class
 */
export const getRandomColor = () => {
  const colors = [
    'bg-yellow-100',
    'bg-blue-100',
    'bg-green-100',
    'bg-pink-100',
    'bg-purple-100',
    'bg-indigo-100',
    'bg-red-100',
    'bg-gray-100',
    'bg-orange-100',
    'bg-teal-100'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @returns {string} - Formatted date string
 */
export const formatDate = (date = new Date()) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Generate unique ID
 * @returns {string} - Unique identifier
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated text
 */
export const truncateText = (text, maxLength = 150) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Validate note data
 * @param {object} note - Note object to validate
 * @returns {object} - Validation result
 */
export const validateNote = (note) => {
  const errors = [];
  
  if (!note.title && !note.content) {
    errors.push('Note must have either a title or content');
  }
  
  if (note.title && note.title.length > 200) {
    errors.push('Title must be less than 200 characters');
  }
  
  if (note.content && note.content.length > 5000) {
    errors.push('Content must be less than 5000 characters');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Search notes by term
 * @param {Array} notes - Array of notes
 * @param {string} searchTerm - Search term
 * @returns {Array} - Filtered notes
 */
export const searchNotes = (notes, searchTerm) => {
  if (!searchTerm || !searchTerm.trim()) return notes;
  
  const term = searchTerm.toLowerCase().trim();
  
  return notes.filter(note => 
    note.title.toLowerCase().includes(term) ||
    note.content.toLowerCase().includes(term)
  );
};

/**
 * Sort notes by different criteria
 * @param {Array} notes - Array of notes
 * @param {string} sortBy - Sort criteria ('date', 'title', 'updated')
 * @param {string} order - Sort order ('asc', 'desc')
 * @returns {Array} - Sorted notes
 */
export const sortNotes = (notes, sortBy = 'date', order = 'desc') => {
  const sortedNotes = [...notes];
  
  sortedNotes.sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'updated':
        const aDate = new Date(a.updatedAt || a.createdAt);
        const bDate = new Date(b.updatedAt || b.createdAt);
        comparison = aDate - bDate;
        break;
      case 'date':
      default:
        comparison = new Date(a.createdAt) - new Date(b.createdAt);
        break;
    }
    
    return order === 'asc' ? comparison : -comparison;
  });
  
  return sortedNotes;
};

/**
 * Debounce function for search
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise} - Promise that resolves when text is copied
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      return true;
    } catch (err) {
      return false;
    } finally {
      document.body.removeChild(textArea);
    }
  }
};