'use client';

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
  isOpen?: boolean;
}

const Modal = ({ children, onClose, isOpen = false }: ModalProps) => {
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!isOpen) return null

  if (!mounted) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg p-6 bg-white rounded-2xl shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
        >
          &times;
        </button>

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
