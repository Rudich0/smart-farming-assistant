import React, { useEffect } from 'react';

interface Props {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<Props> = ({ message, type, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const styles = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  };

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <div className={`${styles[type]} text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-3 min-w-[300px]`}>
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-white bg-opacity-20 rounded-full text-xl font-bold">
          {icons[type]}
        </div>
        <span className="flex-1 font-medium">{message}</span>
        <button 
          onClick={onClose} 
          className="flex-shrink-0 hover:bg-white hover:bg-opacity-20 rounded p-1 transition-colors"
        >
          <span className="text-lg">✕</span>
        </button>
      </div>
    </div>
  );
};