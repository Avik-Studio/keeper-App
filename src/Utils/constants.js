// src/utils/constants.js

// App Configuration
export const APP_CONFIG = {
  APP_NAME: 'Keeper App',
  APP_DESCRIPTION: 'Your digital memory companion',
  VERSION: '1.0.0',
  AUTHOR: 'Your Name'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  NOTES: 'keeper-notes',
  VIEW_MODE: 'keeper-view-mode',
  THEME: 'keeper-theme',
  USER_PREFERENCES: 'keeper-preferences'
};

// View Modes
export const VIEW_MODES = {
  GRID: 'grid',
  LIST: 'list'
};

// Alert Types
export const ALERT_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// Note Colors
export const NOTE_COLORS = [
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

// Animation Durations (in milliseconds)
export const ANIMATION_DURATIONS = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  ALERT: 3000
};

// Validation Rules
export const VALIDATION_RULES = {
  MAX_TITLE_LENGTH: 200,
  MAX_CONTENT_LENGTH: 5000,
  MIN_SEARCH_LENGTH: 1,
  DEBOUNCE_DELAY: 300
};

// Responsive Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536
};

// Keyboard Shortcuts
export const SHORTCUTS = {
  SAVE_NOTE: 'Ctrl+Enter',
  SEARCH: 'Ctrl+K',
  NEW_NOTE: 'Ctrl+N',
  ESCAPE: 'Escape'
};

// Default Messages
export const MESSAGES = {
  EMPTY_TITLE_PLACEHOLDER: 'Untitled Note',
  EMPTY_STATE_TITLE: 'No notes yet',
  EMPTY_STATE_DESCRIPTION: 'Create your first note to get started on your digital journey!',
  SEARCH_EMPTY_TITLE: 'No notes found',
  SEARCH_EMPTY_DESCRIPTION: 'No notes match your search',
  DELETE_CONFIRMATION: 'Are you sure you want to delete this note? This action cannot be undone.',
  SAVE_SUCCESS: 'Note saved successfully!',
  DELETE_SUCCESS: 'Note deleted successfully!',
  VALIDATION_ERROR: 'Please enter a title or content before adding a note!',
  COPY_SUCCESS: 'Note copied to clipboard!',
  COPY_ERROR: 'Failed to copy note to clipboard'
};

// API Endpoints (for future backend integration)
export const API_ENDPOINTS = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  NOTES: '/api/notes',
  USER: '/api/user',
  AUTH: '/api/auth'
};

// Feature Flags
export const FEATURE_FLAGS = {
  ENABLE_SEARCH: true,
  ENABLE_COLORS: true,
  ENABLE_EXPORT: true,
  ENABLE_THEMES: false,
  ENABLE_SYNC: false,
  ENABLE_TAGS: false
};

const CONSTANTS = {
  APP_CONFIG,
  STORAGE_KEYS,
  VIEW_MODES,
  ALERT_TYPES,
  NOTE_COLORS,
  ANIMATION_DURATIONS,
  VALIDATION_RULES,
  BREAKPOINTS,
  SHORTCUTS,
  MESSAGES,
  API_ENDPOINTS,
  FEATURE_FLAGS
};

export default CONSTANTS;