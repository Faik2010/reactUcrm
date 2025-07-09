// Global Notification Provider
// Toast container ve global yapılandırma

import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Global Toast Provider Component
 * ToastContainer'ı ve global ayarları sağlar
 */
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        limit={5} // Maksimum 5 toast aynı anda
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
        progressClassName="custom-toast-progress"
      />
    </>
  );
};

/**
 * Custom Toast Styles
 * Tailwind CSS ile uyumlu custom styles
 */
export const injectToastStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    /* Custom Toast Styles */
    .custom-toast {
      font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      border-radius: 0.5rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .custom-toast-body {
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
    }

    .custom-toast-progress {
      height: 3px;
    }

    /* Success Toast */
    .Toastify__toast--success {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
    }

    .Toastify__toast--success .Toastify__progress-bar {
      background: rgba(255, 255, 255, 0.7);
    }

    /* Error Toast */
    .Toastify__toast--error {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      color: white;
    }

    .Toastify__toast--error .Toastify__progress-bar {
      background: rgba(255, 255, 255, 0.7);
    }

    /* Warning Toast */
    .Toastify__toast--warning {
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      color: white;
    }

    .Toastify__toast--warning .Toastify__progress-bar {
      background: rgba(255, 255, 255, 0.7);
    }

    /* Info Toast */
    .Toastify__toast--info {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      color: white;
    }

    .Toastify__toast--info .Toastify__progress-bar {
      background: rgba(255, 255, 255, 0.7);
    }

    /* Default Toast */
    .Toastify__toast--default {
      background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
      color: white;
    }

    /* Close Button */
    .Toastify__close-button {
      color: rgba(255, 255, 255, 0.8);
      opacity: 1;
    }

    .Toastify__close-button:hover {
      color: white;
      opacity: 1;
    }

    /* Dark Theme Support */
    @media (prefers-color-scheme: dark) {
      .Toastify__toast-container {
        --toastify-color-light: #374151;
        --toastify-color-dark: #1f2937;
        --toastify-color-info: #3b82f6;
        --toastify-color-success: #10b981;
        --toastify-color-warning: #f59e0b;
        --toastify-color-error: #ef4444;
        --toastify-color-transparent: rgba(255, 255, 255, 0.7);
        --toastify-icon-color-info: var(--toastify-color-info);
        --toastify-icon-color-success: var(--toastify-color-success);
        --toastify-icon-color-warning: var(--toastify-color-warning);
        --toastify-icon-color-error: var(--toastify-color-error);
        --toastify-toast-width: 320px;
        --toastify-toast-background: #374151;
        --toastify-toast-min-height: 64px;
        --toastify-toast-max-height: 800px;
        --toastify-font-family: 'Inter', sans-serif;
        --toastify-z-index: 9999;
      }
    }

    /* Responsive Design */
    @media only screen and (max-width: 480px) {
      .Toastify__toast-container {
        width: 100vw;
        padding: 0;
        left: 0;
        margin: 0;
      }
      
      .Toastify__toast-container--top-left,
      .Toastify__toast-container--top-center,
      .Toastify__toast-container--top-right {
        top: 1rem;
      }
      
      .Toastify__toast-container--bottom-left,
      .Toastify__toast-container--bottom-center,
      .Toastify__toast-container--bottom-right {
        bottom: 1rem;
      }
      
      .custom-toast {
        margin: 0 1rem 0.5rem 1rem;
        border-radius: 0.375rem;
      }
    }

    /* Animation Improvements */
    .Toastify__slide-enter--top-right,
    .Toastify__slide-enter--top-left {
      animation-name: Toastify__slideInRight;
    }

    .Toastify__slide-enter--bottom-right,
    .Toastify__slide-enter--bottom-left {
      animation-name: Toastify__slideInRight;
    }

    .Toastify__slide-exit--top-right,
    .Toastify__slide-exit--top-left {
      animation-name: Toastify__slideOutRight;
    }

    .Toastify__slide-exit--bottom-right,
    .Toastify__slide-exit--bottom-left {
      animation-name: Toastify__slideOutRight;
    }

    /* Custom Animation Keyframes */
    @keyframes Toastify__slideInRight {
      from {
        transform: translate3d(110%, 0, 0);
        opacity: 0;
      }
      to {
        transform: translate3d(0, 0, 0);
        opacity: 1;
      }
    }

    @keyframes Toastify__slideOutRight {
      from {
        transform: translate3d(0, 0, 0);
        opacity: 1;
      }
      to {
        transform: translate3d(110%, 0, 0);
        opacity: 0;
      }
    }

    /* Custom Loading Animation for SweetAlert Integration */
    .swal2-loading .swal2-styled.swal2-confirm {
      border-color: transparent !important;
    }

    /* SweetAlert Custom Styling */
    .swal2-popup {
      border-radius: 0.75rem !important;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
    }

    .swal2-title {
      color: #1f2937 !important;
      font-weight: 600 !important;
    }

    .swal2-content {
      color: #6b7280 !important;
    }

    .swal2-styled.swal2-confirm {
      background-color: #3b82f6 !important;
      border: none !important;
      border-radius: 0.5rem !important;
      font-weight: 500 !important;
      padding: 0.5rem 1rem !important;
      font-size: 0.875rem !important;
    }

    .swal2-styled.swal2-cancel {
      background-color: #6b7280 !important;
      border: none !important;
      border-radius: 0.5rem !important;
      font-weight: 500 !important;
      padding: 0.5rem 1rem !important;
      font-size: 0.875rem !important;
    }

    .swal2-styled.swal2-confirm:focus,
    .swal2-styled.swal2-cancel:focus {
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
    }

    /* Dark mode support for SweetAlert */
    @media (prefers-color-scheme: dark) {
      .swal2-popup {
        background-color: #374151 !important;
      }

      .swal2-title {
        color: #f9fafb !important;
      }

      .swal2-content {
        color: #d1d5db !important;
      }
    }
  `;
  
  document.head.appendChild(style);
};

/**
 * Initialize Notification System
 * Styles'ları inject eder ve provider'ı hazırlar
 */
export const initializeNotificationSystem = () => {
  // Custom styles'ları inject et
  injectToastStyles();
  
  // Debug log
  if (process.env.NODE_ENV === 'development') {
    console.log('🔔 Notification system initialized with custom styles');
  }
};

export default NotificationProvider; 