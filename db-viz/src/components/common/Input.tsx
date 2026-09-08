'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-light text-gray-700 mb-1.5"
          style={{ fontFamily: 'var(--font-geist-sans)' }}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={`
            w-full px-3 sm:px-4 py-3 sm:py-2.5 rounded-lg sm:rounded-xl transition-all duration-200
            bg-white border border-gray-300
            text-sm sm:text-base text-gray-900 font-light
            placeholder:text-gray-400
            focus:ring-2 focus:ring-gray-500 focus:border-gray-500
            disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-50
            ${leftIcon ? 'pl-10 sm:pl-11' : ''}
            ${rightIcon ? 'pr-10 sm:pr-11' : ''}
            ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : ''}
            ${className}
          `}
          style={{ fontFamily: 'var(--font-geist-sans)', minHeight: '44px' }}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-gray-500">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-sm font-light text-red-500 flex items-center gap-1" style={{ fontFamily: 'var(--font-geist-sans)' }}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-sm font-light text-gray-500" style={{ fontFamily: 'var(--font-geist-sans)' }}>{helperText}</p>
      )}
    </div>
  );
}
