import React from 'react';

export const LoadingSpinner = ({ text = '로딩 중...' }: { text?: string }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="relative flex items-center justify-center mb-3">
      <span className="absolute animate-ping inline-flex h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 to-green-400 opacity-40"></span>
      <svg className="animate-spin h-10 w-10 text-blue-500 drop-shadow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
      </svg>
    </div>
    <div className="text-blue-700 font-extrabold text-lg tracking-tight drop-shadow text-center">{text}</div>
  </div>
);

export const MessageBanner = ({ type, message, onClose }: { type: 'success' | 'error', message: string, onClose?: () => void }) => (
  <div className={`w-full flex items-center justify-between gap-3 px-5 py-3 mb-4 rounded-xl font-semibold shadow-lg text-base
    ${type === 'success' ? 'bg-gradient-to-r from-green-50 to-green-100 text-green-800 border border-green-200' : 'bg-gradient-to-r from-red-50 to-red-100 text-red-700 border border-red-200'}`}
    style={{ boxShadow: '0 4px 16px 0 rgba(0,0,0,0.08)' }}
    role="alert"
    aria-live="polite"
  >
    <span className="text-xl mr-2">{type === 'success' ? '✅' : '⛔'}</span>
    <span className="flex-1 break-keep">{message}</span>
    {onClose && (
      <button onClick={onClose} className="ml-2 text-xl font-bold opacity-70 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 rounded" aria-label="닫기">&times;</button>
    )}
  </div>
);
