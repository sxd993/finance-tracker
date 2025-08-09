import React from "react";

export const Modal = ({ children, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-lg shadow-lg p-8 z-10 min-w-[300px] min-h-[150px] flex flex-col items-center">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold focus:outline-none"
                    onClick={onClose}
                    aria-label="Закрыть модалку"
                >
                    ×
                </button>
                {children}
            </div>
        </div>
    );
};