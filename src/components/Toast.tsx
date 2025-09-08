import React, { useEffect } from 'react';

export interface ToastProps {
  type: 'success' | 'error' | 'info';
  message: string;
  onClose?: () => void;
  duration?: number; // ms
}

export const Toast: React.FC<ToastProps> = ({ type, message, onClose, duration = 2500 }) => {
  useEffect(() => {
    if (!onClose) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      className={`fixed z-50 left-1/2 bottom-8 -translate-x-1/2 flex items-center gap-3 px-6 py-3 rounded-2xl shadow-2xl font-semibold text-base min-w-[220px] max-w-xs
        ${type === 'success' ? 'bg-gradient-to-r from-green-500 to-green-400 text-white' : type === 'error' ? 'bg-gradient-to-r from-red-500 to-red-400 text-white' : 'bg-gradient-to-r from-blue-500 to-blue-400 text-white'}
        animate-fadeinup`}
      role="status"
      aria-live="polite"
      style={{ boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)' }}
    >
      <span className="text-xl">
        {type === 'success' ? '✅' : type === 'error' ? '⛔' : 'ℹ️'}
      </span>
      <span className="flex-1 text-base break-keep">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-2 text-lg font-bold opacity-80 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
          aria-label="닫기"
        >
          &times;
        </button>
      )}
    </div>
  );
};

// Tailwind CSS용 fadeinup 애니메이션
// tailwind.config.js에 아래 추가 필요:
// theme: { extend: { keyframes: { fadeinup: { '0%': { opacity: 0, transform: 'translateY(40px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } } }, animation: { fadeinup: 'fadeinup 0.4s cubic-bezier(0.4,0,0.2,1) both' } } }
