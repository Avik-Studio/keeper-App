// src/hooks/useAlert.js
import { useState, useCallback } from 'react';

/**
 * Custom hook for managing alert notifications
 * @returns {object} - Alert state and control functions
 */
const useAlert = () => {
  const [alerts, setAlerts] = useState([]);

  // Show alert function
  const showAlert = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    const newAlert = {
      id,
      message,
      type, // 'success', 'error', 'warning', 'info'
      duration
    };

    setAlerts(prev => [...prev, newAlert]);

    // Auto-remove alert after duration
    setTimeout(() => {
      removeAlert(id);
    }, duration);

    return id;
  }, []);

  // Remove specific alert
  const removeAlert = useCallback((id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  }, []);

  // Clear all alerts
  const clearAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  // Convenience methods for different alert types
  const showSuccess = useCallback((message, duration) => {
    return showAlert(message, 'success', duration);
  }, [showAlert]);

  const showError = useCallback((message, duration) => {
    return showAlert(message, 'error', duration);
  }, [showAlert]);

  const showWarning = useCallback((message, duration) => {
    return showAlert(message, 'warning', duration);
  }, [showAlert]);

  const showInfo = useCallback((message, duration) => {
    return showAlert(message, 'info', duration);
  }, [showAlert]);

  return {
    alerts,
    showAlert,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    removeAlert,
    clearAlerts
  };
};

export default useAlert;