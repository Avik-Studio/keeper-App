// src/components/UI/Button/Button.jsx
import React from 'react';

/**
 * Reusable Button component with multiple variants
 * @param {object} props - Component props
 * @param {string} props.variant - Button variant (primary, secondary, danger, ghost)
 * @param {string} props.size - Button size (sm, md, lg)
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {boolean} props.loading - Whether button is in loading state
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Button content
 * @param {React.ReactNode} props.icon - Optional icon element
 * @param {function} props.onClick - Click handler
 * @param {string} props.type - Button type (button, submit, reset)
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  children,
  icon,
  onClick,
  type = 'button',
  ...props
}) => {
  // Base button classes
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // Variant classes
  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 focus:ring-purple-500 shadow-lg hover:shadow-xl transform hover:scale-105',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-500 shadow-lg hover:shadow-xl',
    ghost: 'text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:ring-gray-500',
    success: 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 focus:ring-green-500 shadow-lg hover:shadow-xl',
    warning: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 focus:ring-yellow-500 shadow-lg hover:shadow-xl'
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  };

  // Icon spacing classes
  const iconClasses = children ? (icon ? 'mr-2' : '') : '';

  // Combine all classes
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {/* Loading Spinner */}
      {loading && (
        <svg
          className={`animate-spin h-4 w-4 ${children ? 'mr-2' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      
      {/* Icon */}
      {!loading && icon && (
        <span className={iconClasses}>
          {icon}
        </span>
      )}
      
      {/* Button Text */}
      {children}
    </button>
  );
};

export default Button;