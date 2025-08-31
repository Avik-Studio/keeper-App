// src/components/UI/Alert/Alert.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { ALERT_TYPES, ANIMATION_DURATIONS } from '../../Utils/constants';

/**
 * Alert component for displaying notifications
 * @param {object} props - Component props
 * @param {Array} props.alerts - Array of alert objects
 * @param {function} props.onRemoveAlert - Function to remove alert
 */
const Alert = ({ alerts, onRemoveAlert }) => {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {alerts.map((alert) => (
        <AlertItem
          key={alert.id}
          alert={alert}
          onRemove={() => onRemoveAlert(alert.id)}
        />
      ))}
    </div>
  );
};

/**
 * Individual Alert Item Component
 * @param {object} props - Component props
 * @param {object} props.alert - Alert object
 * @param {function} props.onRemove - Function to remove this alert
 */
const AlertItem = ({ alert, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleRemove = useCallback(() => {
    setIsLeaving(true);
    setTimeout(() => {
      onRemove();
    }, ANIMATION_DURATIONS.FAST);
  }, [onRemove]);

  // Auto-remove after duration
  useEffect(() => {
    if (alert.duration && alert.duration > 0) {
      const timer = setTimeout(handleRemove, alert.duration);
      return () => clearTimeout(timer);
    }
  }, [alert.duration, handleRemove]);

  // Get alert styling based on type
  const getAlertStyles = () => {
    const baseClasses = "flex items-start space-x-3 p-4 rounded-lg shadow-lg border-l-4 backdrop-blur-sm min-w-80 max-w-md";
    
    switch (alert.type) {
      case ALERT_TYPES.SUCCESS:
        return `${baseClasses} bg-green-50/95 border-green-500 text-green-800`;
      case ALERT_TYPES.ERROR:
        return `${baseClasses} bg-red-50/95 border-red-500 text-red-800`;
      case ALERT_TYPES.WARNING:
        return `${baseClasses} bg-yellow-50/95 border-yellow-500 text-yellow-800`;
      case ALERT_TYPES.INFO:
      default:
        return `${baseClasses} bg-blue-50/95 border-blue-500 text-blue-800`;
    }
  };

  // Get icon based on alert type
  const getIcon = () => {
    const iconClasses = "h-5 w-5 flex-shrink-0 mt-0.5";
    
    switch (alert.type) {
      case ALERT_TYPES.SUCCESS:
        return <CheckCircle className={`${iconClasses} text-green-600`} />;
      case ALERT_TYPES.ERROR:
        return <XCircle className={`${iconClasses} text-red-600`} />;
      case ALERT_TYPES.WARNING:
        return <AlertCircle className={`${iconClasses} text-yellow-600`} />;
      case ALERT_TYPES.INFO:
      default:
        return <Info className={`${iconClasses} text-blue-600`} />;
    }
  };

  return (
    <div
      className={`transform transition-all duration-300 ${
        isVisible && !isLeaving
          ? 'translate-x-0 opacity-100 scale-100'
          : 'translate-x-full opacity-0 scale-95'
      }`}
    >
      <div className={getAlertStyles()}>
        {/* Alert Icon */}
        {getIcon()}
        
        {/* Alert Content */}
        <div className="flex-1">
          <p className="text-sm font-medium leading-relaxed">
            {alert.message}
          </p>
        </div>
        
        {/* Close Button */}
        <button
          onClick={handleRemove}
          className="flex-shrink-0 text-current opacity-70 hover:opacity-100 transition-opacity duration-200 p-1 rounded-full hover:bg-black/10"
          title="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Alert;